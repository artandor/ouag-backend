import ContainerLayout from "../../layouts/container";
import Head from "next/head"
import LoginForm from "../../components/user/LoginForm";
import router from "next/router";
import Image from "next/image"

function LoginPage() {
    return (
        <ContainerLayout>
            <Head>
                <title>Login</title>
            </Head>
            <div>
                <div className="col-12 text-center">
                    <Image src="/img/big-logo.png" width={200} height={163}/>
                </div>
                <LoginForm/>
                <button className='btn btn-light col-12' onClick={() => router.push('/users/register')}>Register
                </button>
            </div>
        </ContainerLayout>
    )
}

export default LoginPage
