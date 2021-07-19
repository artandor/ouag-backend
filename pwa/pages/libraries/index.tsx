import {List} from "../../components/library/List";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";
import ContainerLayout from "../../layouts/container";

export default function LibrariesPage() {
    const {t} = useTranslation('libraries');
    let [libraries, setLibraries] = useState({})

    useEffect(() => {
        fetch("/libraries")
            .then((librariesData) => {
                setLibraries(librariesData)
            })
            .catch(() => null);
    }, [])

    return (
        <>
            <div>
                <Head>
                    <title>{t("librariesPage.title")}</title>
                </Head>
            </div>
            <ContainerLayout>
                <List libraries={libraries["hydra:member"]}/>
            </ContainerLayout>
        </>
    );
}

