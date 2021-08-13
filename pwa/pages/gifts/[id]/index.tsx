import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import {createRef, useEffect, useState} from "react";
import router from "next/router";
import ContainerLayout from "../../../layouts/ContainerLayout";
import PlanningList from "../../../components/planning/PlanningList";
import MediaContentLayout from "../../../components/media_object/MediaContentLayout";
import {Planning} from "../../../types/Planning";

export default function GiftShowPage() {
    const [gift, setGift] = useState({})
    const [plannings, setPlannings] = useState({})
    const [libraries, setLibraries] = useState({})

    const [selectedLibrary, setSelectedLibrary] = useState({})
    const [selectedLibraryMedia, setSelectedLibraryMedia] = useState({})

    const [selectedPlanning, setSelectedPlanning] = useState(null)
    const [selectedMedia, setSelectedMedia] = useState(null)


    useEffect(() => {
        fetch(router.asPath)
            .then((giftData) => {
                setGift(giftData)
            })
            .catch((err) => console.error(err));
        fetch(router.asPath + '/plannings')
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
    }, [])

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
                {/*<GiftShow gift={gift}/>*/}
                <h1>Planification</h1>
                {plannings['hydra:totalItems'] > 0 && gift &&
                <PlanningList plannings={plannings['hydra:member']} gift={gift} selectedPlanning={selectedPlanning}
                              selectPlanning={setSelectedPlanning}/>}
                <div className="my-4">
                    <ul className="list-group list-group-horizontal horizontal-scroll">
                        {libraries['hydra:member'] && libraries['hydra:member'].map((library) =>
                            <li className={`list-group-item ${library === selectedLibrary && "active"}`}
                                onClick={() => setSelectedLibrary(library)}
                                key={library['@id']}>{library['name']}</li>)}
                    </ul>
                </div>
                {selectedLibraryMedia['hydra:member'] && selectedLibraryMedia['hydra:member'].length > 0 &&
                <div className="card-group row mt-4">
                    {selectedLibraryMedia['hydra:member'] && selectedLibraryMedia['hydra:member'].map((media) => (
                        <div className="col-6 col-lg-3 mb-3" key={media['@id']} onClick={() => setSelectedMedia(media)}>
                            <div className={`card h-100 ${media === selectedMedia && "border-primary"}`}>
                                <div style={{maxHeight: "15vh", overflow: "hidden"}} className="card-body">
                                    {media ? <MediaContentLayout media={media} nsfw={media.nsfw} autoplay={false}
                                                                 thumbnail={true}/> :
                                        <p className="text-center mt-4">No media planned for this day</p>}
                                </div>
                                {media.title && <div
                                    className={`card-footer ${media === selectedMedia ? "bg-primary text-white" : "text-muted"}`}>
                                    <h5 className="text-center">{media.title}</h5>
                                </div>}
                            </div>
                        </div>
                    ))}
                </div>}
            </ContainerLayout>
        </div>
    );
};
