import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from "next/router";
import AuthProvider from "../../../utils/AuthProvider";
import ouagLogo from '../../../public/img/big-logo.png'

export default function NavbarContent() {
    const {t} = useTranslation('shared');
    const router = useRouter()
    let [isConnected, setConnected] = useState(false);

    useEffect(() => {
        AuthProvider.checkAuth()
            .then(() => {
                    setConnected(true)
                }
            ).catch(() => {
            setConnected(false)
        })
    }, [])

    return (
        <>
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand" href="#">
                        <Image src={ouagLogo} alt="" width="30" height="24"
                               className="d-inline-block align-text-top"/>{" "}
                        Once Upon A Gift
                    </a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {isConnected ? <li className="nav-item">
                            <Link href={"/gifts/received"}>
                                <a className={`nav-link${router.pathname == '/gifts/received' ? " active" : ""}`}>{t('receiveGiftLink')}</a>
                            </Link>
                        </li> : null}
                        {isConnected ? <li className="nav-item">
                            <Link href={"/gifts"}>
                                <a className={`nav-link${router.pathname == '/gifts' ? " active" : ""}`}>{t('createGiftLink')}</a>
                            </Link>
                        </li> : null}
                    </ul>
                    <div className="navbar-nav text-center">
                        {isConnected ?
                            <div className="dropdown navbar-nav">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="bi bi-person-circle"/>{" "}
                                    {t('accountLink')}
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">

                                    <li><Link href={"/users/profile"}><a
                                        className="dropdown-item">{t('profileLink')}</a></Link></li>
                                    <li>
                                        <a className={'dropdown-item'} href="#"
                                           onClick={() => AuthProvider.logout().then(value => router.push('/users/login'))}>{t('logoutButton')}</a>
                                    </li>
                                </ul>
                            </div>
                            :
                            <Link href={"/users/login"}>
                                <a className={'nav-link'}>{t('loginOrRegisterButton')}</a>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
