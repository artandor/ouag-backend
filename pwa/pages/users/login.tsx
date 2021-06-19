import ContainerLayout from "../../layouts/container";
import Head from "next/head"
import LoginForm from "../../components/user/LoginForm";
import router from "next/router";

function LoginPage() {
    return (
        <ContainerLayout>
            <Head>
                <title>Login</title>
            </Head>
            <div>
                <LoginForm/>
                <button className={'btn btn-light'} onClick={() => router.push('/users/register')}>Register</button>
            </div>
        </ContainerLayout>
    )
}

export default LoginPage
