import ContainerLayout from "../../../layouts/ContainerLayout";
import {GiftList} from "../../../components/gift/GiftList";
import {fetch} from "../../../utils/dataAccess";
import {getUserIdFromJwt} from "../../../utils/common";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";
import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import GiftClaimForm from "../../../components/gift/GiftClaimForm";
import {Gift} from "../../../types/Gift";
import NotificationsSubscriber from "../../../components/common/NotificationSubscriber";
import AuthProvider from "../../../utils/AuthProvider";

export default function ReceivedGiftPage() {
    const {t} = useTranslation('gifts');
    const [collection, setCollection] = useState([])
    const [showClaimModal, setShowClaimModal] = useState(false)


    useEffect(() => {
        AuthProvider.checkAuth()
            .then(() => {
                try {
                    fetch(`/gifts?receivers[]=${getUserIdFromJwt()}&state=published&order[startAt]`)
                        .then((collectionData) => {
                            setCollection(collectionData)
                        })
                        .catch(() => null);
                } catch (e) {
                    console.log(e)
                }
            });
    }, [])

    function addGiftToCollection(gift: Gift) {
        collection["hydra:member"].push(gift)
        setCollection(prevCollection => {
            return {...prevCollection, ...collection}
        })
        setShowClaimModal(false)
    }

    return (
        <div>
            <div>
                <Head>
                    <title>{t('receivedTitle')}</title>
                </Head>
            </div>
            <ContainerLayout>
                <h1>{t('receivedTitle')}</h1>
                <Button variant="primary" className="mb-2" onClick={() => {
                    setShowClaimModal(true)
                }}>
                    <i className="bi bi-gift"></i> {t('claimGiftButton')}
                </Button>

                <NotificationsSubscriber/>

                <Modal show={showClaimModal} onHide={() => setShowClaimModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('claimGiftButton')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <GiftClaimForm addGift={addGiftToCollection}/>
                    </Modal.Body>
                </Modal>
                <GiftList gifts={collection["hydra:member"]}/>
            </ContainerLayout>
        </div>
    )
}
