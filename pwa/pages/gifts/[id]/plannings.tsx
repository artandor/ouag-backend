import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import Link from "next/link"
import {createRef, useEffect, useState} from "react";
import {useRouter} from 'next/router'
import ContainerLayout from "../../../layouts/ContainerLayout";
import PlanningList from "../../../components/planning/PlanningList";
import {Planning} from "../../../types/Planning";
import LibraryInlineList from "../../../components/library/LibraryInlineList";
import MediaCardList from "../../../components/media_object/MediaCardList";
import useTranslation from "next-translate/useTranslation";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import MediaObjectForm from "../../../components/media_object/MediaObjectForm";

export default function GiftShowPage() {
    const {t} = useTranslation('gifts')
    const router = useRouter()
    const [gift, setGift] = useState({})
    const [plannings, setPlannings] = useState({})
    const [libraries, setLibraries] = useState({})

    const [selectedLibrary, setSelectedLibrary] = useState({})
    const [selectedLibraryMedia, setSelectedLibraryMedia] = useState({})

    const [selectedPlanning, setSelectedPlanning] = useState(null)
    const [selectedMedia, setSelectedMedia] = useState(null)

    const [showAddMediaObjectModal, setShowAddMediaObjectModal] = useState(false);
    const [newMediaObjectIsText, setNewMediaObjectIsText] = useState(false);

    const handleClose = () => setShowAddMediaObjectModal(false);
    const handleShow = (isText: boolean) => {
        setNewMediaObjectIsText(isText)
        setShowAddMediaObjectModal(true);
    };


    useEffect(() => {
        fetch(router.asPath.replace('/plannings', ''))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch((err) => console.error(err));
        fetch(router.asPath)
            .then((planningData) => {
                planningData['hydra:member'] = planningData['hydra:member'].map((planning: Planning) => {
                    planning['ref'] = createRef()
                    return planning
                });
                setPlannings(planningData)
            })
            .catch((err) => console.error(err));
        fetch('/libraries')
            .then((libraryData) => {
                setLibraries(libraryData)
            })
            .catch((err) => console.error(err));
    }, [router])

    useEffect(() => {
        selectedLibrary['@id'] && fetch(selectedLibrary['@id'] + '/media_objects')
            .then((response) => setSelectedLibraryMedia(response))
    }, [selectedLibrary])

    useEffect(() => {
        if (selectedPlanning && selectedMedia) {
            selectedPlanning['media'] = selectedMedia['@id']
            const nextPosition = plannings['hydra:totalItems'] - 1 >= selectedPlanning['position'] + 1
                ? selectedPlanning['position'] + 1 : selectedPlanning['position'];
            plannings['hydra:member'][nextPosition]['ref'].current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
            delete selectedPlanning['ref'];
            fetch(selectedPlanning['@id'], {method: 'PUT', body: JSON.stringify(selectedPlanning)})
                .then((response) => {
                    response['ref'] = createRef()
                    plannings['hydra:member'][selectedPlanning['position']] = response;

                    setPlannings((prevPlannings) => {
                        return {...prevPlannings, ...plannings}
                    })
                    setSelectedMedia(null)
                    setSelectedPlanning(plannings['hydra:member'][nextPosition])
                })
                .catch((e) => console.error(e))
        }
    }, [selectedPlanning, selectedMedia])


    return (
        <div>
            <div>
                <Head>
                    <title>{gift["name"]}</title>
                </Head>
            </div>
            <ContainerLayout>
                <h1>{t('planningsTitle')}</h1>
                <button className="btn btn-primary" onClick={router.back}><i
                    className="bi bi-arrow-left"></i> {t('shared:backButton')}
                </button>
                <Link href={router.asPath.replace('/plannings', '/invites')}>
                    <a className="btn btn-success float-end">{t('invitesTitle')} <i
                        className="bi bi-arrow-right"></i></a>
                </Link>
                {plannings['hydra:totalItems'] > 0 && gift &&
                <PlanningList plannings={plannings['hydra:member']} gift={gift} selectedPlanning={selectedPlanning}
                              selectPlanning={setSelectedPlanning}/>}
                <div className="my-4 row">
                    <div className={'col-9'}>
                        {libraries && libraries['hydra:member'] &&
                        <LibraryInlineList libraries={libraries['hydra:member']}
                                           selectedLibrary={selectedLibrary}
                                           setSelectedLibrary={setSelectedLibrary}/>
                        }
                    </div>


                    <div className={'col-3 text-end'}>
                        {selectedLibrary['@id'] &&
                        <ButtonGroup aria-label="Basic example">
                            <Button variant="primary" onClick={() => handleShow(false)}>
                                <i className="bi bi-camera"/> Add a media
                            </Button>
                            <Button variant="secondary" onClick={() => handleShow(true)}>
                                <i className="bi bi-card-text"/> Add a text
                            </Button>
                        </ButtonGroup>
                        }
                    </div>

                    <Modal show={showAddMediaObjectModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{newMediaObjectIsText ? t('form.mediaObject.modalTitleText') : t('form.mediaObject.modalTitleMedia')}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <MediaObjectForm libraryIri={selectedLibrary['@id']}
                                             addMediaObject={(media) => {
                                                 selectedLibraryMedia['hydra:member'].push(media)
                                                 setSelectedLibraryMedia(prevMediaList => {
                                                     return {...prevMediaList, ...selectedLibraryMedia};
                                                 })
                                                 setShowAddMediaObjectModal(false)
                                             }}
                                             isText={newMediaObjectIsText}
                            />
                        </Modal.Body>
                    </Modal>
                </div>
                {selectedLibraryMedia['hydra:member'] && selectedLibraryMedia['hydra:member'].length > 0 &&
                <MediaCardList mediaObjects={selectedLibraryMedia['hydra:member']} selectedMedia={selectedMedia}
                               setSelectedMedia={setSelectedMedia}/>
                }
            </ContainerLayout>
        </div>
    );
};
