import {GiftShow} from "../../../components/gift/GiftShow";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import router from "next/router";
import ContainerLayout from "../../../layouts/ContainerLayout";

export default function GiftShowPage() {
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
                <GiftShow gift={gift}/>
            </ContainerLayout>
        </div>
    );
};
