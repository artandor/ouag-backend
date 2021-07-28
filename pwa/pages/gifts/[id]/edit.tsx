import {GiftForm} from "../../../components/gift/GiftForm";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import ContainerLayout from "../../../layouts/ContainerLayout";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";
import router from "next/router";

export default function GiftEditPage() {
    const {t} = useTranslation('users');
    let [gift, setGift] = useState()

    useEffect(() => {
        fetch(router.asPath.replace("/edit", ""))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [])
    return (
        <div>
            <div>
                <Head>
                    <title>{gift && `${t('shared:edit')} ${gift["name"]}`}</title>
                </Head>
            </div>
            <ContainerLayout>
                {gift ? <GiftForm gift={gift}/> : null}
            </ContainerLayout>
        </div>
    );
};
