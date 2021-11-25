import {useEffect, useState} from "react";
import ContainerLayout from "../../layouts/ContainerLayout";
import useTranslation from 'next-translate/useTranslation'
import {ENTRYPOINT} from "../../config/entrypoint";
import {useRouter} from "next/router"
import Link from "next/link"

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
                }
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

    return (

        <ContainerLayout>
            <div className="row">
                <div className="col-12 col-md-6 m-auto mt-4 vh-100 align-middle">
                    <div className={'card text-center' + (user['email'] ? ' border-success' : ' border-danger')}>
                        <i className={'bi' + (user['email'] ? ' bi-check text-success' : ' bi-x text-danger')}
                           style={{fontSize: "10rem"}}/>
                        <div className="card-body">
                            <p className="card-text">{user['email'] ? t('verifyPage.success') : t('verifyPage.fail')}</p>
                            {user['email'] &&
                            <p><Link href="/users/login"><a>{t('loginPage.callToAction')}</a></Link></p>}
                        </div>
                        <div className="card-footer">
                            {t('verifyPage.contact')}<br/><a
                            href="mailto:support@once-upon-a-gift.com">support@once-upon-a-gift.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}

export default VerifyPage;
