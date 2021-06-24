import authProvider from "../../utils/authProvider";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
    const {t} = useTranslation('shared');
    let [isConnected, setConnected] = useState(false);

    useEffect(() => {
        authProvider.checkAuth().then(() => {
                setConnected(true)
            }
        ).catch(() => {
            setConnected(false)
        })
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand" href="#">
                        <Image src="/img/big-logo.png" alt="" width="30" height="24"
                               className="d-inline-block align-text-top"/>
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
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                    </ul>
                    {isConnected ?
                        <button className={'btn btn-link nav-link'}
                                onClick={() => authProvider.logout().then(r => setConnected(false))}>{t('logoutButton')}</button>
                        :
                        <Link href={"/users/login"}>
                            <a className={'nav-link'}>{t('loginButton')}</a>
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}
