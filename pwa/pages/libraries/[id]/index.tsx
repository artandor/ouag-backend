import {NextComponentType, NextPageContext} from "next";
import {Show} from "../../../components/library/Show";
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
                    <title>{`Show Library ${library["@id"]}`}</title>
                </Head>
            </div>
            <Show library={library}/>
        </div>
    );
};

Page.getInitialProps = async ({asPath}: NextPageContext) => {
    const library = await fetch(asPath);

    return {library};
};

export default Page;
