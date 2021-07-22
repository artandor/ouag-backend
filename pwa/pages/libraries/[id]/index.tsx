import {Show} from "../../../components/library/Show";
import Head from "next/head";
import {fetch as fetchData} from "../../../utils/dataAccess";
import ContainerLayout from "../../../layouts/container";
import {useEffect, useState} from "react";
import router from "next/router";
import {Library} from "../../../types/Library";

export default function LibraryShowPage() {
    let [library, setLibrary] = useState({})

    useEffect(() => {
        fetchData(router.asPath)
            .then((libraryData) => {
                setLibrary(libraryData);
            })
            .catch(() => null);
    }, [])

    function deleteCollaborator(library: Library) {
        setLibrary(prevLibrary => {
            return {...prevLibrary, ...library};
        })
    }

    return (
        <div>
            <Head>
                <title>{library["name"]}</title>
            </Head>
            <ContainerLayout>
                {library["sharedWith"] && <Show library={library} deleteCollaborator={deleteCollaborator}/>}
            </ContainerLayout>
        </div>
    );
}
