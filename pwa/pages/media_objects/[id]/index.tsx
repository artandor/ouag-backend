import {NextComponentType, NextPageContext} from "next";
import {Show} from "../../../components/mediaobject/Show";
import {MediaObject} from "../../../types/MediaObject";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import ContainerLayout from "../../../layouts/container";

interface Props {
    mediaobject: MediaObject;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
                                                                    mediaobject,
                                                                }) => {
    return (
        <ContainerLayout>
            <div>
                <div>
                    <Head>
                        <title>{`Show MediaObject ${mediaobject["@id"]}`}</title>
                    </Head>
                </div>
                <Show mediaobject={mediaobject}/>
            </div>
        </ContainerLayout>
    );
};

Page.getInitialProps = async ({asPath}: NextPageContext) => {
    const mediaobject = await fetch(asPath);

    return {mediaobject};
};

export default Page;
