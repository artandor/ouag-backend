import {NextComponentType, NextPageContext} from "next";
import {Form} from "../../components/gift/Form";
import Head from "next/head";
import ContainerLayout from "../../layouts/container";

const Page: NextComponentType<NextPageContext> = () => (
    <div>
        <div>
            <Head>
                <title>Create Gift </title>
            </Head>
        </div>
        <ContainerLayout>
            <Form/>
        </ContainerLayout>
    </div>
);

export default Page;
