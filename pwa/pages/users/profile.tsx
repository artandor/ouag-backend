import {NextComponentType, NextPageContext} from "next";
import {User} from "../../types/User";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import {Show} from "../../components/user/Show";
import {useState} from "react";
import {Form} from "../../components/user/Form";
import ContainerLayout from "../../layouts/container";

interface Props {
    user: User;
}

const Page: NextComponentType<NextPageContext, Props, Props> = ({user}) => {
    let [editMode, setEditMode] = useState(false);
    return (
        <ContainerLayout>
            <div>
                <div>
                    <Head>
                        <title>My Account</title>
                    </Head>
                </div>
                {editMode ? <Form user={user} editMode={setEditMode}/> : <Show user={user} editMode={setEditMode}/>}
            </div>
        </ContainerLayout>
    );
};

Page.getInitialProps = async () => {
    const user = await fetch("/users/me");

    return {user};
};

export default Page;
