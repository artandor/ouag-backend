import {Form} from "../../../components/library/Form";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import router from "next/router";
import {useEffect, useState} from "react";
import ContainerLayout from "../../../layouts/container";

export default function LibraryEditPage() {
    let [library, setLibrary] = useState()

    useEffect(() => {
        fetch(router.asPath.replace("/edit", ""))
            .then((libData) => {
                setLibrary(libData)
            })
            .catch(() => null);
    }, [])
    return (
        <div>
            <div>
                <Head>
                    <title>{library && `Edit Library ${library["@id"]}`}</title>
                </Head>
            </div>
            <ContainerLayout>
                {library ? <Form library={library}/> : null}
            </ContainerLayout>
        </div>
    );
};
