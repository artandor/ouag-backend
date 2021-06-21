import type {AppProps} from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <title>Notus NextJS by Creative Tim</title>
                <script async defer data-domain="app.once-upon-a-gift.com"
                        src="https://analytics.nicolasmylle.fr/js/plausible.outbound-links.js"></script>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
