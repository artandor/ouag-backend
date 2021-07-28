import ContainerLayout from "../../../layouts/ContainerLayout";
import {GiftList} from "../../../components/gift/GiftList";
import {fetch} from "../../../utils/dataAccess";
import {getUserIdFromJwt} from "../../../utils/common";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";
import Head from 'next/head'

export default function ReceivedGiftPage() {
    const {t} = useTranslation('gifts');
    let [collection, setCollection] = useState({})

    useEffect(() => {
        fetch(`/gifts?receivers[]=${getUserIdFromJwt()}&state=published&order[startAt]`)
            .then((collectionData) => {
                setCollection(collectionData)
            })
            .catch(() => null);
    }, [])

    return (
        <div>
            <div>
                <Head>
                    <title>{t('receivedTitle')}</title>
                </Head>
            </div>
            <ContainerLayout>
                <h1>{t('receivedTitle')}</h1>
                <GiftList gifts={collection["hydra:member"]} receiverMode={true}/>
            </ContainerLayout>
        </div>
    )
}
