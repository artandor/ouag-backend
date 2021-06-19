import authProvider from "../utils/authProvider";
import {useEffect, useState} from "react";
import Head from 'next/head'
import router from "next/router";

export default function HomePage() {
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
        <div>
            <Head>
                <title>Once Upon A Gift</title>
            </Head>
            {isConnected ?
                <button className={'btn btn-primary'}
                        onClick={() => authProvider.logout().then(r => setConnected(false))}>Logout</button>
                : <button className={'btn btn-primary'} onClick={() => router.push('/users/login')}>Login</button>}
        </div>
    )
}
