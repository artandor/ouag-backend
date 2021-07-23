import {GiftList} from "../../components/gift/GiftList";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import ContainerLayout from "../../layouts/container";
import {getUserIdFromJwt} from "../../utils/common";
import {useRouter} from "next/router";

export default function GiftListPage() {
    const {t} = useTranslation('gifts');
    let [collection, setCollection] = useState({})
    const router = useRouter();

    useEffect(() => {
        try {
            fetch(`/gifts?owner=${getUserIdFromJwt()}`)
                .then((collectionData) => {
                    setCollection(collectionData)
                })
                .catch((e) => {
                    console.error(e);
                    router.push('/users/login')
                });
        } catch (e) {
            console.error(e);
            router.push('/users/login')
        }
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
