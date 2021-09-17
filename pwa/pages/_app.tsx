import type {AppProps} from "next/app";
import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/global.css"
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta name='viewport'
                      content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'/>


                <title>Once Upon A Gift</title>
                <script async defer data-domain="app.once-upon-a-gift.com"
                        src="https://analytics.nicolasmylle.fr/js/plausible.outbound-links.js"/>
            </Head>
            <Component {...pageProps} />
            <script async src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
                    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
                    crossOrigin="anonymous"/>
        </>
    );
}

export default MyApp;
