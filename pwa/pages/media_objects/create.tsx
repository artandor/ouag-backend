import {NextComponentType, NextPageContext} from "next";
import {Form} from "../../components/mediaobject/Form";
import Head from "next/head";

const Page: NextComponentType<NextPageContext> = () => (
    <div>
        <div>
            <Head>
                <title>Create MediaObject </title>
            </Head>
        </div>
        <Form/>
    </div>
);

export default Page;
