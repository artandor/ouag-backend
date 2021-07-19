import {NextComponentType, NextPageContext} from "next";
import {List} from "../../components/mediaobject/List";
import {PagedCollection} from "../../types/Collection";
import {MediaObject} from "../../types/MediaObject";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";

interface Props {
    collection: PagedCollection<MediaObject>;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({
                                                                    collection,
                                                                }) => (
    <div>
        <div>
            <Head>
                <title>MediaObject List</title>
            </Head>
        </div>
        <List media_objects={collection["hydra:member"]}/>
    </div>
);

Page.getInitialProps = async () => {
    const collection = await fetch("/media_objects");

    return {collection};
};

export default Page;
