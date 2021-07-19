import {Show} from "../../../components/library/Show";
import Head from "next/head";
import {fetch as fetchData} from "../../../utils/dataAccess";
import ContainerLayout from "../../../layouts/container";
import {useEffect, useState} from "react";
import router from "next/router";

export default function LibraryShowPage() {
    let [library, setLibrary] = useState({})

    useEffect(() => {
        fetchData(router.asPath)
            .then((libraryData) => {
                console.log(libraryData);
                setLibrary(libraryData);
            })
            .catch(() => null);
    }, [])


    return (
        <div>
            {library == {} ? "pas ok" :
                <>
                    <Head>
                        <title>{library["name"]}</title>
                    </Head>
                    <ContainerLayout>
                        <Show library={library}/>
                    </ContainerLayout>
                </>}
        </div>
    );
}
