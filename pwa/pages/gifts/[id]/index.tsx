import {NextComponentType, NextPageContext} from "next";
import {Show} from "../../../components/gift/Show";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import ContainerLayout from "../../../layouts/container";

const Page: NextComponentType<NextPageContext> = () => {
    const {t} = useTranslation('users');
    let [gift, setGift] = useState({})

    useEffect(() => {
        fetch(router.asPath)
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [])
    return (
        <div>
            <div>
                <Head>
                    <title>{gift["name"]}</title>
                </Head>
            </div>
            <ContainerLayout>
                <Show gift={gift}/>
            </ContainerLayout>
        </div>
    );
};

export default Page;
