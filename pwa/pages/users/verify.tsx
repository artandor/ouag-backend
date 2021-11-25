import Head from "next/head";
import {Show} from "../../components/user/Show";
import {useEffect, useState} from "react";
import {Form} from "../../components/user/Form";
import ContainerLayout from "../../layouts/ContainerLayout";
import useTranslation from 'next-translate/useTranslation'
import {ENTRYPOINT} from "../../config/entrypoint";
import {useRouter} from "next/router"

function VerifyPage() {
    const {t} = useTranslation('users');
    let [user, setUser] = useState({})
    const router = useRouter()

    useEffect(() => {
        fetch(ENTRYPOINT + window.location.pathname + window.location.search)
            .then((data) => data.json())
            .then((json) => {
                if (json['@context'] === "/contexts/User" && json["@id"]) {
                    setUser(json);
                    router.push('/users/login')
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    return (
        <ContainerLayout>
            <div>
                <div>
                    <Head>
                        <title>{t('profilePage.title')}</title>
                    </Head>
                </div>
                {user && user['email'] ? t('verifyPage.success') : t('verifyPage.fail')}
            </div>
        </ContainerLayout>
    );
}

export default VerifyPage;
