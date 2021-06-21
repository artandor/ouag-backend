import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import {Show} from "../../components/user/Show";
import {useEffect, useState} from "react";
import {Form} from "../../components/user/Form";
import ContainerLayout from "../../layouts/container";

function ProfilePage() {
    let [editMode, setEditMode] = useState(false);
    let [user, setUser] = useState({})

    useEffect(() => {
        fetch("/users/me")
            .then((userData) => {
                setUser(userData)
            })
            .catch(() => null);
    }, [])

    return (
        <ContainerLayout>
            <div>
                <div>
                    <Head>
                        <title>My Account</title>
                    </Head>
                </div>
                {!user ? "Loading" : editMode ? <Form user={user} setUser={setUser} setEditMode={setEditMode}/> :
                    <Show user={user} setEditMode={setEditMode}/>}
            </div>
        </ContainerLayout>
    );
}

export default ProfilePage;
