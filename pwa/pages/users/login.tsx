import ContainerLayout from "../../layouts/ContainerLayout";
import Head from "next/head"
import LoginForm from "../../components/user/LoginForm";
import router from "next/router";
import Image from "next/image"
import useTranslation from 'next-translate/useTranslation'

function LoginPage() {
    const {t} = useTranslation('users');
    return (
        <ContainerLayout>
            <Head>
                <title>{t('loginPage.title')}</title>
            </Head>
            <div>
                <div className="col-12 text-center">
                    <Image alt={"Logo"} src="/img/big-logo.png" width={200} height={163}/>
                </div>
                <LoginForm/>
                <button className='btn btn-light col-12'
                        onClick={() => router.push('/users/register')}>{t('shared:registerButton')}
                </button>
            </div>
        </ContainerLayout>
    )
}

export default LoginPage
