import ContainerLayout from "../../layouts/container";
import Head from 'next/head'
import {Form} from "../../components/user/Form";
import useTranslation from 'next-translate/useTranslation'

function RegisterPage() {
    const {t} = useTranslation('users');
    return (
        <ContainerLayout>
            <Head>
                <title>{t('registerPage.title')}</title>
            </Head>
            <Form/>
        </ContainerLayout>
    )
}

export default RegisterPage;
