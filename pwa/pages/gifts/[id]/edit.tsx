import {NextComponentType, NextPageContext} from "next";
import {Form} from "../../../components/gift/Form";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import ContainerLayout from "../../../layouts/container";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";
import router from "next/router";

const Page: NextComponentType<NextPageContext> = () => {
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
                    <title>{gift && `Edit ${gift["name"]}`}</title>
                </Head>
            </div>
            <ContainerLayout>
                {gift ? <Form gift={gift}/> : null}
            </ContainerLayout>
        </div>
    );
};


export default Page;
