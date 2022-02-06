import {useEffect, useState} from "react";
import ContainerLayout from "../../layouts/ContainerLayout";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router"
import Link from "next/link"
import {ENTRYPOINT} from "../../config/entrypoint";
import {PasswordResetForm} from "../../components/user/PasswordResetForm";

function ForgotPasswordPage() {
    const {t} = useTranslation('users');
    let [user, setUser] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (window.location.search.length <= 0) {
            fetch(ENTRYPOINT + "/forgot_password/", {
                method: "POST", body: JSON.stringify({
                    'email': 'user@example.com'
                })
            })
                .then((data) => data.json())
                .then((json) => {
                    console.log(json)
                    if (json['@context'] === "/contexts/User" && json["@id"]) {
                        setUser(json);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })
        }
    }, [])

    return (

        <ContainerLayout>
            <div className="row">
                <h1>Reset your password</h1>
                <PasswordResetForm/>
            </div>
        </ContainerLayout>
    );
}

export default ForgotPasswordPage;
