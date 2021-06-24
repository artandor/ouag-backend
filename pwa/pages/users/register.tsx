import ContainerLayout from "../../layouts/container";
import Head from 'next/head'
import {Form} from "../../components/user/Form";

function RegisterPage() {
    return (
        <ContainerLayout>
            <Head>
                <title>Register</title>
            </Head>
            <Form/>
        </ContainerLayout>
    )
}

export default RegisterPage;
