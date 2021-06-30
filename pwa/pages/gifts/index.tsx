import {NextComponentType, NextPageContext} from "next";
import {GiftList} from "../../components/gift/GiftList";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import ContainerLayout from "../../layouts/container";

const Page: NextComponentType<NextPageContext> = () => {
    const {t} = useTranslation('gifts');
    let [collection, setCollection] = useState({})

    useEffect(() => {
        fetch("/gifts")
            .then((collectionData) => {
                setCollection(collectionData)
            })
            .catch(() => null);
    }, [])

    return (
        <div>
            <div>
                <Head>
                    <title>Gift List</title>
                </Head>
            </div>
            <ContainerLayout>
                <GiftList gifts={collection["hydra:member"]}/>
            </ContainerLayout>
        </div>
    );
};

export default Page;
