import {NextComponentType, NextPageContext} from "next";
import {List} from "../../components/library/List";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";
import ContainerLayout from "../../layouts/container";

const LibraryPage: NextComponentType<NextPageContext> = ({}) => {
    const {t} = useTranslation('libraries');
    let [libraries, setLibraries] = useState({})

    useEffect(() => {
        fetch("/libraries")
            .then((libraries) => {
                setLibraries(libraries)
            })
            .catch(() => null);
    }, [])
    return (
        <ContainerLayout>
            <div>
                <Head>
                    <title>{t("librariesPage.title")}</title>
                </Head>
            </div>
            <List libraries={libraries["hydra:member"]}/>
        </ContainerLayout>
    );
};


export default LibraryPage;
