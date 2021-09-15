import Document, {Head, Html, Main, NextScript} from 'next/document'

const APP_NAME = 'Once Upon A Gift'
const APP_DESCRIPTION = 'The easiest way to bring back your greatest memories to you friends and family.'

class MyDocument extends Document {
    render() {
        return (
            <Html lang='en' dir='ltr'>
                <Head>
                    <meta name='application-name' content={APP_NAME}/>
                    <meta name='apple-mobile-web-app-capable' content='yes'/>
                    <meta name='apple-mobile-web-app-status-bar-style' content='default'/>
                    <meta name='apple-mobile-web-app-title' content={APP_NAME}/>
                    <meta name='description' content={APP_DESCRIPTION}/>
                    <meta name='format-detection' content='telephone=no'/>
                    <meta name='mobile-web-app-capable' content='yes'/>
                    <meta name='theme-color' content='#FFFFFF'/>

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                    <link rel="shortcut icon" type="image/jpg" href="/favicon.ico"/>
                    <link rel='manifest' href='/manifest.json'/>

                    {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
                    {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default MyDocument
