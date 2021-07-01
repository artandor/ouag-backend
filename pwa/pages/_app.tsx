import type {AppProps} from "next/app";
import "bootswatch/dist/journal/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/global.css"
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />

                <link rel="apple-touch-icon" sizes="180x180" href={"/apple-touch-icon.png"}/>
                <link rel="icon" type="image/png" sizes="32x32" href={"/favicon-32x32.png"}/>
                <link rel="icon" type="image/png" sizes="16x16" href={"/favicon-16x16.png"}/>

                <title>Once Upon A Gift</title>
                <script async defer data-domain="app.once-upon-a-gift.com"
                        src="https://analytics.nicolasmylle.fr/js/plausible.outbound-links.js"></script>
            </Head>
            <Component {...pageProps} />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
                    integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
                    crossOrigin="anonymous"></script>
        </>
    );
}

export default MyApp;
