import {NextComponentType, NextPageContext} from "next";
import {Form} from "../../../components/mediaobject/Form";
import {MediaObject} from "../../../types/MediaObject";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
    mediaobject: MediaObject;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
                                                                    mediaobject,
                                                                }) => {
    return (
        <div>
            <div>
                <Head>
                    <title>
                        {mediaobject && `Edit MediaObject ${mediaobject["@id"]}`}
                    </title>
                </Head>
            </div>
            <Form mediaobject={mediaobject}/>
        </div>
    );
};

Page.getInitialProps = async ({asPath}: NextPageContext) => {
    const mediaobject = await fetch(asPath.replace("/edit", ""));

    return {mediaobject};
};

export default Page;
