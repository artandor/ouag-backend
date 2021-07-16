import {GiftList} from "../../components/gift/GiftList";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import ContainerLayout from "../../layouts/container";
import {getUserIdFromJwt} from "../../utils/common";

export default function GiftListPage() {
    const {t} = useTranslation('gifts');
    let [collection, setCollection] = useState({})

    useEffect(() => {
        fetch(`/gifts?owner=${getUserIdFromJwt()}`)
            .then((collectionData) => {
                setCollection(collectionData)
            })
            .catch(() => null);
    }, [])

    return (
        <div>
            <div>
                <Head>
                    <title>{t('listTitle')}</title>
                </Head>
            </div>
            <ContainerLayout>
                <GiftList gifts={collection["hydra:member"]}/>
            </ContainerLayout>
        </div>
    );
}
