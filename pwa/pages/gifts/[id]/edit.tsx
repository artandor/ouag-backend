import {NextComponentType, NextPageContext} from "next";
import {Form} from "../../../components/gift/Form";
import {Gift} from "../../../types/Gift";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import ContainerLayout from "../../../layouts/container";

interface Props {
    gift: Gift;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({gift}) => {
    return (
        <div>
            <div>
                <Head>
                    <title>{gift && `Edit Gift ${gift["@id"]}`}</title>
                </Head>
            </div>
            <ContainerLayout>
                <Form gift={gift}/>
            </ContainerLayout>
        </div>
    );
};

Page.getInitialProps = async ({asPath}: NextPageContext) => {
    const gift = await fetch(asPath.replace("/edit", ""));

    return {gift};
};

export default Page;
