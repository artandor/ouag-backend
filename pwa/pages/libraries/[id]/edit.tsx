import {NextComponentType, NextPageContext} from "next";
import {Form} from "../../../components/library/Form";
import {Library} from "../../../types/Library";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";

interface Props {
    library: Library;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
                                                                    library,
                                                                }) => {
    return (
        <div>
            <div>
                <Head>
                    <title>{library && `Edit Library ${library["@id"]}`}</title>
                </Head>
            </div>
            <Form library={library}/>
        </div>
    );
};

Page.getInitialProps = async ({asPath}: NextPageContext) => {
    const library = await fetch(asPath.replace("/edit", ""));

    return {library};
};

export default Page;
