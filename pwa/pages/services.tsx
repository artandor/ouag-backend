import Head from "next/head";
import Link from "next/link";

const Welcome = () => (
    <>
        <Head>
            <title>Welcome to API Platform!</title>
        </Head>

        <div className="welcome">
            <header className="welcome__top">
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://api-platform.com"
                >
                    <Logo/>
                </a>
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://les-tilleuls.coop"
                >
                    <Flag/>
                </a>
            </header>
            <section className="welcome__main">
                <div className="main__aside">
                    <div className="aside__circle"/>
                    <WebbyWelcome/>
                </div>
                <div className="main__content">
                    <h1>
                        Welcome to <strong>API Platform</strong>!
                    </h1>
                    <div className="main__before-starting">
                        <p>
                            This container will host your{" "}
                            <a href="https://nextjs.org/">
                                <b>Next.js</b>
                            </a>{" "}
                            application. Learn how to create your first API and
                            generate a PWA:
                        </p>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://api-platform.com/docs/"
                            className="main__button"
                        >
                            Get started
                            <Arrow/>
                        </a>
                    </div>
                    <div className="main__other">
                        <h2>Available services:</h2>
                        <div className="other__bloc">
                            <div className="other__circle">
                                <Api/>
                            </div>
                            <div className="other__content">
                                <h3>
                                    <a href="/docs">API</a>
                                </h3>
                            </div>
                        </div>
                        <div className="other__bloc">
                            <div className="other__circle">
                                <Admin/>
                            </div>
                            <div className="other__content">
                                <h3>
                                    <Link href="/admin">
                                        <a>Admin</a>
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        <div className="other__bloc">
                            <div className="other__circle">
                                <Mercure/>
                            </div>
                            <div className="other__content">
                                <h3>
                                    <a href="/.well-known/mercure/ui/">
                                        Mercure Debugger
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="welcome__help">
                <h2>Need help?</h2>
                <HelpButton
                    url="https://stackoverflow.com/questions/tagged/api-platform.com"
                    Image={Sto}
                    title="Ask your questions on Stack Overflow!"
                />
                <HelpButton
                    url="https://api-platform.com/support"
                    Image={Slack}
                    title="Chat with the community on Slack!"
                />
            </div>

            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto+Slab:300,700");

                body {
                    margin: 0;
                }

                .welcome {
                    height: 100vh;
                    width: 100vw;
                    text-align: center;
                    color: #1d1e1c;
                    font-family: "Open Sans", sans-serif;
                    font-size: 14px;
                    overflow: auto;
                    background-color: #ececec;
                }

                .welcome a {
                    text-decoration: none;
                    color: #38a9b4;
                    font-weight: bold;
                }

                .welcome h1 {
                    font-family: "Roboto Slab", serif;
                    font-weight: 300;
                    font-size: 36px;
                    margin: 0 0 10px;
                    line-height: 30px;
                }

                .welcome h1 strong {
                    font-weight: 700;
                    color: #38a9b4;
                }

                .welcome h2 {
                    text-transform: uppercase;
                    font-size: 18px;
                    font-weight: bold;
                    margin: 25px 0 5px;
                }

                .welcome h3 {
                    text-transform: uppercase;
                    font-weight: 500;
                    color: #38a9b4;
                    font-size: 16px;
                    margin: 0 0 5px;
                    display: block;
                }

                /***** TOP *****/

                .welcome__top {
                    background-color: #67cece;
                    padding-bottom: 40px;
                }

                .welcome__flag {
                    transform: rotate(30deg);
                    position: fixed;
                    right: -190px;
                    top: 65px;
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
                    z-index: 5;
                }

                /***** MAIN *****/

                .welcome__main {
                    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14),
                    0 1px 18px 0 rgba(0, 0, 0, 0.12),
                    0 3px 5px -1px rgba(0, 0, 0, 0.3);
                    width: 80%;
                    max-width: 1100px;
                    margin-left: auto;
                    margin-right: auto;
                    transform: translateY(-50px);
                    background-color: white;
                    display: flex;
                }

                .main__aside {
                    background-color: #afe5e5;
                    width: 30%;
                    position: relative;
                    overflow: hidden;
                }

                .aside__circle,
                .main__aside svg {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                .aside__circle {
                    background-color: white;
                    border-radius: 50%;
                    width: 90%;
                    height: 0;
                    padding-bottom: 90%;
                }

                .aside__circle:after {
                    content: "";
                    width: 4px;
                    left: calc(50% - 5px);
                    top: -50%;
                    position: absolute;
                    height: 100%;
                    background-color: #1d1e1c;
                }

                .main__aside svg {
                    width: 100%;
                }

                .main__content {
                    padding: 30px;
                    text-align: left;
                    flex: auto;
                }

                .other__bloc {
                    display: inline-flex;
                    align-items: center;
                    border: 4px solid #afe5e5;
                    padding: 10px 20px;
                    margin: 10px 0;
                    height: 170px;
                    box-sizing: border-box;
                    text-align: left;
                    width: 40%;
                }

                .other__bloc:not(:last-of-type) {
                    margin-right: 10px;
                }

                .other__bloc h3:not(:first-child) {
                    margin-top: 15px;
                    padding-top: 5px;
                }

                .other__circle {
                    width: 110px;
                    height: 110px;
                    background-color: #afe5e5;
                    border-radius: 50%;
                    margin-right: 20px;
                }

                .other__circle svg {
                    width: 110px;
                }

                .buttons__group {
                    display: inline-flex;
                    vertical-align: center;
                }

                .buttons__group .buttons__or {
                    width: 4px;
                    position: relative;
                    text-align: center;
                }

                .buttons__group .buttons__or:before {
                    content: "or";
                    font-size: 12px;
                    color: #aaa;
                    line-height: 18px;
                    position: absolute;
                    border-radius: 50%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: white;
                    width: 18px;
                    height: 18px;
                }

                .buttons__group .other__button:first-child {
                    border-radius: 5px 0 0 5px;
                    padding-right: 15px;
                }

                .buttons__group .other__button:last-child {
                    border-radius: 0 5px 5px 0;
                    padding-left: 15px;
                }

                a.other__button {
                    background-color: #e0e1e2;
                    font-size: 11px;
                    color: #686e63;
                    cursor: pointer;
                    padding: 5px 10px;
                    display: inline-block;
                    transition: all ease 0.2s;
                    text-transform: uppercase;
                }

                .other__button:hover {
                    background-color: #afe5e5;
                    color: #339ba5;
                }

                .main__button {
                    display: inline-block;
                    padding: 10px 50px 10px 10px;
                    border: 3px solid #339ba5;
                    font-size: 22px;
                    color: #339ba5;
                    text-transform: uppercase;
                    margin: 15px 0;
                    overflow: hidden;
                    transition: all ease 0.3s;
                    cursor: pointer;
                    position: relative;
                }

                .main__button svg {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    transition: transform ease 0.2s;
                }

                .main__button:hover {
                    background-color: #afe5e5;
                }

                .main__button:hover svg {
                    transform: translateY(-50%) rotate(35deg);
                }

                /***** HELP *****/

                .welcome__help {
                    background-color: white;
                    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
                    padding: 10px;
                    position: fixed;
                    right: -5px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 5px;
                    text-align: center;
                }

                .welcome__help h2 {
                    color: #aaa;
                    font-size: 12px;
                    margin: 10px 0;
                }

                .help__circle {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border: 2px solid #ccc;
                    display: block;
                    margin: 10px auto;
                    transition: all ease 0.2s;
                    position: relative;
                }

                .help__circle svg {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                .help__circle:hover {
                    border-color: #67cece;
                    background-color: #afe5e5;
                }

                /***** MEDIAS *****/

                @media (max-width: 1200px) {
                    .main__aside,
                    .welcome__help {
                        display: none;
                    }

                    .main__content {
                        width: 100%;
                        text-align: center;
                        padding: 20px;
                    }
                }

                @media (max-width: 600px) {
                    .welcome__main {
                        width: calc(100% - 40px);
                    }

                    .welcome h1 {
                        display: none;
                    }

                    .welcome__flag,
                    .main__other {
                        display: none;
                    }

                    .main__content {
                        padding: 10px;
                    }
                }
            `}</style>
        </div>
    </>
);
export default Welcome;

const Admin = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        viewBox="0 0 646 646"
    >
        <style jsx>
            {`
                .adminst0 {
                    fill: #273942;
                }

                .adminst1 {
                    fill: #b7cdd8;
                }

                .adminst2 {
                    fill: #e2e2f7;
                }

                .adminst3 {
                    fill: #52677a;
                }

                .adminst4 {
                    fill: #354f5c;
                }

                .adminst5 {
                    fill: #ce521f;
                }

                .adminst6 {
                    fill: #ebebeb;
                }

                .adminst7 {
                    fill: #8e96a3;
                }

                .adminst8 {
                    fill: #3d4d5c;
                }

                .adminst9 {
                    fill: #3e9697;
                }

                .adminst10 {
                    fill: #68b7ce;
                }

                .adminst11 {
                    fill: #e8e8e8;
                }

                .adminst12 {
                    fill: #ffffff;
                }

                .adminst13 {
                    fill: #828282;
                }

                .adminst14 {
                    fill: #cccccc;
                }

                .adminst15 {
                    fill: #606060;
                }

                .adminst16 {
                    fill: #c6c6c6;
                }

                .adminst17 {
                    opacity: 0.15;
                }

                .adminst18 {
                    fill: #1d1e1c;
                }

                .adminst19 {
                    fill: #ffd700;
                }

                .adminst20 {
                    fill: #ff9700;
                }

                .adminst21 {
                    fill: #ffffe8;
                }

                .adminst22 {
                    fill: #f2dab8;
                }

                .adminst23 {
                    fill: #d44d41;
                }

                .adminst24 {
                    opacity: 0.3;
                }

                .adminst25 {
                    opacity: 0.3;
                    fill: #ffffff;
                }

                .adminst26 {
                    fill: #f01c01;
                }

                .adminst27 {
                    fill: #dbdad9;
                }

                .adminst28 {
                    opacity: 0.4;
                    fill: #ffffff;
                }

                .adminst29 {
                    opacity: 0.2;
                }

                .adminst30 {
                    opacity: 0.2;
                    fill: #020202;
                }

                .adminst31 {
                    fill: #f3554b;
                }

                .adminst32 {
                    fill: #bf2c28;
                }

                .adminst33 {
                    fill: #1f6a7b;
                }

                .adminst34 {
                    fill: #0594af;
                }

                .adminst35 {
                    fill: #38a9b4;
                }

                .adminst36 {
                    opacity: 0.2;
                    fill: #1d1e1c;
                }

                .adminst37 {
                    opacity: 0.64;
                    fill: #a6d9ed;
                }

                .adminst38 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #f0f0f0;
                }

                .adminst39 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #e1dddd;
                }

                .adminst40 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #ffffff;
                }

                .adminst41 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #af3737;
                }

                .adminst42 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #990000;
                }

                .adminst43 {
                    fill: #990000;
                }

                .adminst44 {
                    fill: #510000;
                }

                .adminst45 {
                    opacity: 0.5;
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #8e2525;
                }

                .adminst46 {
                    fill: #2ba2b2;
                }

                .adminst47 {
                    fill: #34aac0;
                }

                .adminst48 {
                    fill: #f69f00;
                }

                .adminst49 {
                    fill: #f59e00;
                }

                .adminst50 {
                    opacity: 0.1;
                }

                .adminst51 {
                    fill: #ed9406;
                }

                .adminst52 {
                    fill: #c6006d;
                }

                .adminst53 {
                    fill: #a50263;
                }

                .adminst54 {
                    fill: #6ac700;
                }

                .adminst55 {
                    fill: #5b9904;
                }

                .adminst56 {
                    fill: #070707;
                }
            `}
        </style>
        <path
            className="adminst0"
            d="M77.9 459.8c0 0-1.2 11.5 33.3 11.5 34.5 0 438.5 0.7 438.5 0.7s23.1 0.7 29.3-11.3L77.9 459.8z"
        />
        <path
            className="adminst1"
            d="M579 457.5c-2 4.3-7.8 6.5-13.8 6.5l-473.7-0.7c-6 0-12.1-3-13.7-6.7l33.2-66.2c3.8-5.8 3.3-8.5 10.2-8.5h416.2c3.3 0 7.6 2.4 10.5 8.5L579 457.5z"
        />
        <path
            className="adminst2"
            d="M335.3 140.7c0 1.6-1.3 2.9-2.8 2.9h-5.7c-1.6 0-2.8-1.3-2.8-2.9l0 0c0-1.6 1.3-2.9 2.8-2.9h5.7C334.1 137.8 335.3 139.1 335.3 140.7L335.3 140.7z"
        />
        <polygon
            className="adminst3"
            points="255.9 435.6 259.2 424.8 232.5 424.8 227.9 435.6 "
        />
        <polygon
            className="adminst3"
            points="262 421.1 265 411.8 239.2 411.8 235.1 421.1 "
        />
        <polygon
            className="adminst3"
            points="265.8 408.6 268.8 399.2 243.9 399.2 239.9 408.6 "
        />
        <polygon
            className="adminst3"
            points="228.4 408.6 232.2 399.2 209.1 399.2 204.3 408.6 "
        />
        <polygon
            className="adminst3"
            points="216.1 435.6 220.5 424.8 195.7 424.8 190.1 435.6 "
        />
        <polygon
            className="adminst3"
            points="223 421.1 226.9 411.8 202.9 411.8 198.1 421.1 "
        />
        <polygon
            className="adminst3"
            points="298.8 408.6 301 399.2 279.9 399.2 276.8 408.6 "
        />
        <polygon
            className="adminst3"
            points="193.2 408.6 197.9 399.2 173.1 399.2 167.5 408.6 "
        />
        <polygon
            className="adminst3"
            points="184.5 424.8 158.8 424.8 151.4 435.6 179.2 435.6 "
        />
        <polygon
            className="adminst3"
            points="186.3 421.3 191.6 412 166.5 412 160.7 421.3 "
        />
        <polygon
            className="adminst3"
            points="297 421.1 299 411.8 274.9 411.8 272.7 421.1 "
        />
        <polygon
            className="adminst3"
            points="155.3 412 132.9 412 124.6 420.6 149.4 420.6 "
        />
        <polygon
            className="adminst3"
            points="146 424.5 122.7 424.5 113.4 434.9 139 434.9 "
        />
        <polygon
            className="adminst3"
            points="157.9 408 163.2 399.2 141.7 399.2 135.4 408 "
        />
        <polygon
            className="adminst3"
            points="474.1 435.6 501.9 435.6 494.7 424.8 468.1 424.8 "
        />
        <polygon
            className="adminst3"
            points="460.7 411.8 465.9 421.1 492.7 421.1 486.3 411.8 "
        />
        <polygon
            className="adminst3"
            points="485.6 408.6 479.4 399.2 454.7 399.2 459.9 408.6 "
        />
        <polygon
            className="adminst3"
            points="413.1 421.1 408.5 411.8 385.7 411.8 389.4 421.1 "
        />
        <polygon
            className="adminst3"
            points="419.9 435.6 413.9 424.8 390.4 424.8 394.6 435.6 "
        />
        <polygon
            className="adminst3"
            points="445.7 408.6 441.7 399.2 417.6 399.2 422.8 408.6 "
        />
        <polygon
            className="adminst3"
            points="453.7 421.1 448.2 411.8 423.9 411.8 428.4 421.1 "
        />
        <polygon
            className="adminst3"
            points="434.3 435.6 460.6 435.6 454.3 424.8 429.2 424.8 "
        />
        <polygon
            className="adminst3"
            points="408.1 408.6 402.2 399.2 378.8 399.2 383.7 408.6 "
        />
        <polygon
            className="adminst3"
            points="509.3 424.8 516.2 435.6 545.5 435.6 537.3 424.8 "
        />
        <polygon
            className="adminst3"
            points="526.7 408.6 519.5 399.2 493.5 399.2 499.5 408.6 "
        />
        <polygon
            className="adminst3"
            points="507.2 421.1 535.3 421.1 528.1 411.8 501.1 411.8 "
        />
        <polygon
            className="adminst3"
            points="372.5 408.6 368.6 399.2 343.9 399.2 346.7 408.6 "
        />
        <polygon
            className="adminst3"
            points="376.1 421.1 372.2 411.8 346.5 411.8 349.4 421.1 "
        />
        <polygon
            className="adminst3"
            points="334.9 408.6 333.9 399.2 311 399.2 310.1 408.6 "
        />
        <polygon
            className="adminst3"
            points="336 421.1 334.4 411.8 310.1 411.8 308.9 421.1 "
        />
        <polygon
            className="adminst3"
            points="376.9 424.8 349.2 424.8 324.2 424.8 324 424.8 298.2 424.8 297.8 424.8 270.6 424.8 268.1 435.6 297 435.6 297.4 435.6 324.5 435.6 324.6 435.6 350.8 435.6 380.4 435.6 "
        />
        <path
            className="adminst0"
            d="M269.9 453.7l-1.4 0.7c-4.2 3.9-0.5 5 10.4 5h86.6c10.9 0 14.9-1.5 10.2-5l-1.4-0.7H269.9z"
        />
        <path
            className="adminst4"
            d="M364.5 446.7c-2.9-1.7-4.9-2.6-11.1-2.6l-63-0.1c-6.2 0-7.8 1-10.7 2.6l-9.8 6.9h104.3L364.5 446.7z"
        />
        <path
            className="adminst5"
            d="M122.9 274.2L122.9 274.2c-0.8-0.3-1.2-1.2-0.9-2l1.3-3.4 2.9 1.1 -1.3 3.4C124.6 274 123.7 274.5 122.9 274.2z"
        />
        <path
            className="adminst5"
            d="M139.2 280.2L139.2 280.2c-0.8-0.3-1.2-1.2-0.9-2 0 0 1.2-3.2 1.3-3.4 0.1-0.2 2.9 1.1 2.9 1.1l-1.3 3.4C140.9 280 140 280.5 139.2 280.2z"
        />
        <path
            className="adminst6"
            d="M122.6 273.5L122.6 273.5c-0.8-0.3-1.2-1.2-0.9-2l1.4-3.8c0.3-0.8 1.2-1.2 2-0.9l0 0c0.8 0.3 1.2 1.2 0.9 2l-1.4 3.8C124.3 273.4 123.4 273.8 122.6 273.5z"
        />
        <path
            className="adminst6"
            d="M138.8 279.5L138.8 279.5c-0.8-0.3-1.2-1.2-0.9-2l1.4-3.8c0.3-0.8 1.2-1.2 2-0.9v0c0.8 0.3 1.2 1.2 0.9 2l-1.4 3.8C140.5 279.3 139.6 279.8 138.8 279.5z"
        />
        <rect
            x="117.2"
            y={311}
            transform="matrix(0.9384 0.3456 -0.3456 0.9384 116.1504 -22.8967)"
            className="adminst7"
            width="10.2"
            height="6.6"
        />
        <rect
            x="121.6"
            y={300}
            transform="matrix(0.9384 0.3456 -0.3456 0.9384 112.6343 -25.0805)"
            className="adminst7"
            width="10.2"
            height="6.6"
        />
        <rect
            x="114.2"
            y="102.3"
            className="adminst8"
            width="424.9"
            height="268.5"
        />
        <rect
            x="130.5"
            y={117}
            className="adminst9"
            width="392.1"
            height="232.6"
        />
        <rect
            x="142.9"
            y="370.9"
            className="adminst3"
            width="63.1"
            height="11.1"
        />
        <rect
            x="446.5"
            y="370.7"
            className="adminst3"
            width="63.1"
            height="11.3"
        />
        <rect
            x="128.3"
            y="116.9"
            className="adminst10"
            width="394.2"
            height="25.3"
        />
        <rect
            x="128.3"
            y="142.2"
            className="adminst11"
            width="394.2"
            height="210.4"
        />
        <rect
            x="138.7"
            y="124.9"
            className="adminst12"
            width="94.1"
            height="9.6"
        />
        <rect
            x="128.3"
            y="142.2"
            className="adminst12"
            width="86.5"
            height="210.4"
        />
        <rect
            x="132.3"
            y="152.8"
            className="adminst13"
            width="12.6"
            height={7}
        />
        <rect
            x="149.5"
            y="152.8"
            className="adminst13"
            width="57.2"
            height={7}
        />
        <rect
            x="132.3"
            y="169.7"
            className="adminst13"
            width="12.6"
            height={7}
        />
        <rect
            x="149.5"
            y="169.7"
            className="adminst13"
            width="50.6"
            height={7}
        />
        <rect
            x="132.3"
            y="187.6"
            className="adminst13"
            width="12.6"
            height={7}
        />
        <rect
            x="149.5"
            y="187.6"
            className="adminst13"
            width="53.2"
            height={7}
        />
        <rect
            x="132.3"
            y="205.5"
            className="adminst13"
            width="12.6"
            height={7}
        />
        <rect
            x="149.5"
            y="205.5"
            className="adminst13"
            width="50.6"
            height={7}
        />
        <rect
            x="132.3"
            y="222.6"
            className="adminst13"
            width="12.6"
            height={7}
        />
        <rect
            x="149.5"
            y="222.6"
            className="adminst13"
            width="38.7"
            height={7}
        />
        <rect
            x="132.3"
            y="239.5"
            className="adminst13"
            width="12.6"
            height={7}
        />
        <rect
            x="149.5"
            y="239.5"
            className="adminst13"
            width="53.2"
            height={7}
        />
        <rect
            x="224.5"
            y="153.4"
            className="adminst12"
            width="288.9"
            height="165.9"
        />
        <path
            className="adminst14"
            d="M513.7 319.5H224.2V153.2h289.4V319.5zM224.7 319.1h288.4V153.5H224.7V319.1z"
        />
        <rect
            x="224.7"
            y="319.7"
            className="adminst11"
            width="288.9"
            height="25.1"
        />
        <path
            className="adminst14"
            d="M513.9 345H224.5v-25.5h289.4V345zM225 344.6h288.4v-24.7H225V344.6z"
        />
        <rect
            x="235.5"
            y="161.1"
            className="adminst15"
            width="75.5"
            height="8.6"
        />
        <rect
            x="469.4"
            y={162}
            className="adminst10"
            width="35.4"
            height="8.6"
        />
        <rect
            x="426.5"
            y="161.8"
            className="adminst10"
            width="35.4"
            height="8.6"
        />
        <rect
            x={385}
            y="161.8"
            className="adminst10"
            width="35.4"
            height="8.6"
        />
        <rect
            x="224.5"
            y="319.2"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y="301.7"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y="283.7"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y="266.2"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y="249.6"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y="232.1"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y="216.5"
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="224.5"
            y={199}
            className="adminst16"
            width="288.9"
            height="0.2"
        />
        <rect
            x="229.6"
            y="205.2"
            className="adminst13"
            width="61.4"
            height="6.1"
        />
        <rect
            x="331.3"
            y="205.2"
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect
            x="426.6"
            y="205.2"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="229.6"
            y={222}
            className="adminst13"
            width="74.4"
            height="6.1"
        />
        <rect
            x="331.3"
            y={222}
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect x="426.6" y={222} className="adminst13" width={10} height="6.1"/>
        <rect
            x="229.6"
            y="237.9"
            className="adminst13"
            width="52.8"
            height="6.1"
        />
        <rect
            x="331.3"
            y="237.9"
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect
            x="426.6"
            y="237.9"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="229.6"
            y="255.1"
            className="adminst13"
            width="74.4"
            height="6.1"
        />
        <rect
            x="331.3"
            y="255.1"
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect
            x="426.6"
            y="255.1"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="229.6"
            y="271.8"
            className="adminst13"
            width="61.4"
            height="6.1"
        />
        <rect
            x="331.3"
            y="271.8"
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect
            x="426.6"
            y="271.8"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="229.6"
            y="289.6"
            className="adminst13"
            width="69.7"
            height="6.1"
        />
        <rect
            x="331.3"
            y="289.6"
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect
            x="426.6"
            y="289.6"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="229.6"
            y="307.7"
            className="adminst13"
            width="74.4"
            height="6.1"
        />
        <rect
            x="331.3"
            y="307.7"
            className="adminst13"
            width="36.9"
            height="6.1"
        />
        <rect
            x="426.6"
            y="307.7"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="403.1"
            y="205.2"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect x="403.1" y={222} className="adminst13" width={10} height="6.1"/>
        <rect
            x="403.1"
            y="237.9"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="403.1"
            y="255.1"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="403.1"
            y="271.8"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="403.1"
            y="289.6"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="403.1"
            y="307.7"
            className="adminst13"
            width={10}
            height="6.1"
        />
        <rect
            x="490.9"
            y="205.2"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y="205.2"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="490.9"
            y={222}
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y={222}
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="490.9"
            y="237.9"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y="237.9"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="490.9"
            y="255.1"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y="255.1"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="490.9"
            y="271.8"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y="271.8"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="490.9"
            y="289.6"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y="289.6"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="490.9"
            y="307.7"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <rect
            x="467.1"
            y="307.7"
            className="adminst10"
            width="13.5"
            height="6.1"
        />
        <circle className="adminst10" cx="349.7" cy="332.5" r={6}/>
        <circle className="adminst12" cx="365.5" cy="332.5" r={6}/>
        <path
            className="adminst14"
            d="M365.5 338.8c-3.5 0-6.3-2.8-6.3-6.3 0-3.5 2.8-6.3 6.3-6.3 3.5 0 6.3 2.8 6.3 6.3C371.8 336 369 338.8 365.5 338.8zM365.5 326.7c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8S368.7 326.7 365.5 326.7z"
        />
        <circle className="adminst12" cx="380.7" cy="332.5" r={6}/>
        <path
            className="adminst14"
            d="M380.7 338.8c-3.5 0-6.3-2.8-6.3-6.3 0-3.5 2.8-6.3 6.3-6.3 3.5 0 6.3 2.8 6.3 6.3C387 336 384.2 338.8 380.7 338.8zM380.7 326.7c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8S383.9 326.7 380.7 326.7z"
        />
        <circle className="adminst12" cx="395.6" cy="332.8" r={6}/>
        <path
            className="adminst14"
            d="M395.6 339c-3.5 0-6.3-2.8-6.3-6.3 0-3.5 2.8-6.3 6.3-6.3 3.5 0 6.3 2.8 6.3 6.3C401.9 336.2 399.1 339 395.6 339zM395.6 327c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8S398.8 327 395.6 327z"
        />
        <path
            className="adminst12"
            d="M363.4 359.2c-0.7 24.6-17.4 43.9-38.4 43.6 -21-0.3-37.4-20.5-36.7-45.1 0.7-24.6 14.1-37.7 35.1-37.4S364.1 334.6 363.4 359.2z"
        />
        <path
            d="M322.3 318c-10.9-0.2-21.3 4.7-29.2 13.5 -7.9 8.8-8.2 14-8.5 26.6 -0.4 12.6 3.5 24.5 10.9 33.5 7.4 9.1 17.5 14.2 28.4 14.4 4.7 0.1 9.1-0.8 13.3-2.4 15.8-6.1 27.2-23.1 27.8-43.9C365.7 333.4 344.2 318.3 322.3 318zM324 400.6c-19.5-0.3-34.8-19.3-34.2-42.4 0.3-11.2 0.1-15.1 7.1-22.9 4-4.5 8.7-7.8 13.8-9.8 3.7-1.4 7.5-2.1 11.4-2.1 9.3 0.1 17.9 4.7 24.1 12.7 6.3 8.1 13.8 12.1 13.4 23.4C359 382.8 343.3 400.8 324 400.6z"/>
        <path
            className="adminst18"
            d="M323.3 371.7c4.1 10.6 1.7 20.3-5.4 21.6 -7.1 1.3-16.1-6.2-20.2-16.8 -4.1-10.6-1.7-20.3 5.4-21.6C310.2 353.6 319.2 361.1 323.3 371.7z"
        />
        <path
            className="adminst12"
            d="M318.4 378.7c1.2 2.9-0.3 5.8-3.4 6.4 -3.1 0.6-6.6-1.2-7.8-4.1 -1.2-2.9 0.3-5.8 3.4-6.4C313.7 374 317.2 375.8 318.4 378.7z"
        />
        <path
            className="adminst12"
            d="M397.1 364c-0.6 20.7-15.8 37.2-33.9 37 -18.1-0.3-32.3-17.2-31.7-37.9 0.6-20.7 13.1-33.1 31.2-32.9C380.8 330.5 397.7 343.3 397.1 364z"
        />
        <path
            d="M361.7 327.8c-9.5-0.1-18.6 4-25.5 11.6 -6.9 7.5-8.2 13.4-8.5 24.1 -0.3 10.7 3.1 20.9 9.5 28.6 6.5 7.8 15.3 12.1 24.8 12.3 4.1 0.1 8.1-0.7 11.9-2.1 13.9-5.4 24.3-20.2 24.8-37.7C399.3 342.2 381.2 328 361.7 327.8zM393.2 364.4c-0.4 15.1-9.2 27.8-21.1 32.4 -3.1 1.2-6.5 1.8-10 1.8 -8-0.1-15.4-3.8-20.9-10.4 -5.6-6.6-8.5-15.4-8.2-24.6 0.4-15.1 6.6-23.7 18.4-28.2 3.1-1.2 6.5-1.8 10-1.8 8 0.1 17.1 3.3 22.6 9.9C389.6 350 393.5 355.1 393.2 364.4z"/>
        <path
            className="adminst18"
            d="M363 375.5c4 8.7 2.1 16.9-4.2 18.4 -6.3 1.4-14.8-4.5-18.8-13.2 -4-8.7-2.1-16.9 4.2-18.4C350.6 360.9 359 366.8 363 375.5z"
        />
        <path
            className="adminst12"
            d="M357.9 380.7c1.1 2.5-0.2 5-2.9 5.6s-5.7-1-6.8-3.6c-1.1-2.5 0.2-5 2.9-5.6C353.8 376.6 356.8 378.2 357.9 380.7z"
        />
        <polygon
            className="adminst18"
            points="266.2 510.1 261.1 510.2 224.6 395.1 269.4 412.3 266.1 415.7 230.8 403.9 "
        />
        <polygon
            className="adminst18"
            points="249.6 546.7 247.5 555 197.6 396.7 273.6 426.7 269.2 430.4 204.6 404.4 "
        />
        <polygon
            className="adminst18"
            points="305.3 568.7 226.5 447 292.8 452.3 294.8 457.1 237.3 452.8 312.2 568.5 "
        />
        <polyline
            className="adminst18"
            points="319.1 413.8 321.8 489.2 316.1 488.5 311.9 409 "
        />
        <path
            className="adminst18"
            d="M315.8 487.8c0 0-6.6-11.3-13.5-3.9 -6.9 7.4-2.6 17.3-2.6 17.3s2.3 3.1 10.1 3.3c7.8 0.2 9.6-0.2 11-2.6 1.4-2.4 1-13.3 1-13.3L315.8 487.8z"
        />
        <path
            className="adminst18"
            d="M247.6 554c2 3-13.8-15.7-23-7.2 -11.2 10.3-4.3 24.1-4.3 24.1s3.8 3.3 16.4 3.1c16.5-0.3 15.2-4.6 16.2-8.8 1.8-7.1-4.5-21.9-4.5-21.9L247.6 554z"
        />
        <path
            className="adminst18"
            d="M261.1 507.8c0 0-3.2-10.5-10.6-3.7 -4.4 4.1-4.6 9-4 12.3 0.5 2.6 2.5 4.7 5.1 5.3 1.6 0.3 3.9 0.7 6.9 0.5 10.9-0.7 9.3-4.1 9.3-5.7 0-9.2-3.5-14.8-3.5-14.8L261.1 507.8z"
        />
        <path
            className="adminst18"
            d="M305.2 567.9c0 0-9.9-16.4-21.3-6.1 -11.4 10.3-2.7 23.2-2.7 23.2s3.9 4 16.8 3.8c16.9-0.3 18.2-8.9 16.9-13.2 -4.5-14.8-7.1-8-7-8.3L305.2 567.9z"
        />
        <polygon
            className="adminst18"
            points="415 507.4 421 507.3 438 402.1 369 440.3 370.6 449.1 430.4 412.9 "
        />
        <polygon
            className="adminst18"
            points="413.8 541.9 419 547.3 447.3 469.9 366.9 450.3 361.6 457.7 437.8 474.4 "
        />
        <polygon
            className="adminst18"
            points="344.6 569.8 355.3 483.5 321.2 458.1 319.4 464.8 348.4 488.8 338.6 569.8 "
        />
        <polyline
            className="adminst18"
            points="358.5 418.8 358.6 491.3 364.3 493.4 365.6 413.7 "
        />
        <path
            className="adminst18"
            d="M364.6 492.6c0 0 5.3-11.5 12.4-4.4s3.3 17.2 3.3 17.2 -2.2 3.2-10 3.6 -9.6 0.2-11.1-2.2c-1.5-2.4-0.2-20.2-0.2-20.2L364.6 492.6z"
        />
        <path
            className="adminst18"
            d="M419.7 546.3c0 0 9.3-18.8 20.9-8.9 6.5 5.6 7.3 12.5 6.8 17.5 -0.5 4.5-3.8 8.2-8.2 9.2 -2.4 0.5-5.6 1-9.7 1 -16.5 0.3-16.2-5.8-17.5-10 -2.1-7.1 2.2-14.2 2.2-14.2L419.7 546.3z"
        />
        <path
            className="adminst18"
            d="M420.9 505.8c0 0 5.4-13.4 13.1-6.8 4.3 3.7 4.9 8.3 4.5 11.6 -0.3 3-2.5 5.4-5.4 6.1 -1.6 0.4-3.7 0.6-6.4 0.7 -10.9 0.2-11.4-2.5-12.3-5.3 -1.4-4.7 3-16.7 3-16.7L420.9 505.8z"
        />
        <path
            className="adminst18"
            d="M345.5 564.5c0 0 8.4-15.9 20.2-6 11.8 9.9 5.3 23.9 5.3 23.9s-3.7 4.2-16.7 4.4c-16.9 0.3-17.9-8.1-17.4-12.5 2.4-18.5 5.6-14 5.6-14L345.5 564.5z"
        />
        <path
            className="adminst35"
            d="M366.6 345.4c41.6 30.2 40 53.4 13 90.6 -21.3 29.3-55.4 38.7-89.1 14.2s-29.3-55.3-8-84.7C303.9 336.2 332.9 320.9 366.6 345.4z"
        />
        <path
            className="adminst18"
            d="M381.9 438.8c-11.3 15.5-25.7 25.3-41.7 28.4 -17.1 3.3-35.1-1.5-52-13.8 -31.6-22.9-34.7-53.7-9-89.2 26-35.9 57.5-43.2 88.6-20.6 16.8 12.2 31.8 27.3 33.7 45.2C403.3 405.1 393.1 423.4 381.9 438.8zM284.9 368.3c-23.7 32.6-21.4 59.6 7 80.2 30.1 21.9 62.5 16.6 84.5-13.8 28-38.6 25.4-58.9-12-86.1C329 323 301.6 345.2 284.9 368.3z"
        />
        <rect
            x="314.7"
            y="426.8"
            transform="matrix(-0.5582 0.8297 -0.8297 -0.5582 854.7977 417.378)"
            className="adminst56"
            width="3.2"
            height={19}
        />
        <rect
            x="314.7"
            y="426.8"
            transform="matrix(0.3593 0.9332 -0.9332 0.3593 609.7914 -15.6263)"
            className="adminst56"
            width="3.2"
            height={19}
        />
    </svg>
);

const Api = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={100}
        height={100}
        viewBox="0 0 646 646"
    >
        <style jsx>
            {`
                .apist0 {
                    fill: #273942;
                }

                .apist1 {
                    fill: #b7cdd8;
                }

                .apist2 {
                    fill: #e2e2f7;
                }

                .apist3 {
                    fill: #52677a;
                }

                .apist4 {
                    fill: #354f5c;
                }

                .apist5 {
                    fill: #ce521f;
                }

                .apist6 {
                    fill: #ebebeb;
                }

                .apist7 {
                    fill: #8e96a3;
                }

                .apist8 {
                    fill: #3d4d5c;
                }

                .apist9 {
                    fill: #3e9697;
                }

                .apist10 {
                    fill: #68b7ce;
                }

                .apist11 {
                    fill: #e8e8e8;
                }

                .apist12 {
                    fill: #ffffff;
                }

                .apist13 {
                    fill: #828282;
                }

                .apist14 {
                    fill: #cccccc;
                }

                .apist15 {
                    fill: #606060;
                }

                .apist16 {
                    fill: #c6c6c6;
                }

                .apist17 {
                    opacity: 0.15;
                }

                .apist18 {
                    fill: #1d1e1c;
                }

                .apist19 {
                    fill: #ffd700;
                }

                .apist20 {
                    fill: #ff9700;
                }

                .apist21 {
                    fill: #ffffe8;
                }

                .apist22 {
                    fill: #f2dab8;
                }

                .apist23 {
                    fill: #d44d41;
                }

                .apist24 {
                    opacity: 0.3;
                }

                .apist25 {
                    opacity: 0.3;
                    fill: #ffffff;
                }

                .apist26 {
                    fill: #f01c01;
                }

                .apist27 {
                    fill: #dbdad9;
                }

                .apist28 {
                    opacity: 0.4;
                    fill: #ffffff;
                }

                .apist29 {
                    opacity: 0.2;
                }

                .apist30 {
                    opacity: 0.2;
                    fill: #020202;
                }

                .apist31 {
                    fill: #f3554b;
                }

                .apist32 {
                    fill: #bf2c28;
                }

                .apist33 {
                    fill: #1f6a7b;
                }

                .apist34 {
                    fill: #0594af;
                }

                .apist35 {
                    fill: #38a9b4;
                }

                .apist36 {
                    opacity: 0.2;
                    fill: #1d1e1c;
                }

                .apist37 {
                    opacity: 0.64;
                    fill: #a6d9ed;
                }

                .apist38 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #f0f0f0;
                }

                .apist39 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #e1dddd;
                }

                .apist40 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #ffffff;
                }

                .apist41 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #af3737;
                }

                .apist42 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #990000;
                }

                .apist43 {
                    fill: #990000;
                }

                .apist44 {
                    fill: #510000;
                }

                .apist45 {
                    opacity: 0.5;
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #8e2525;
                }

                .apist46 {
                    fill: #2ba2b2;
                }

                .apist47 {
                    fill: #34aac0;
                }

                .apist48 {
                    fill: #f69f00;
                }

                .apist49 {
                    fill: #f59e00;
                }

                .apist50 {
                    opacity: 0.1;
                }

                .apist51 {
                    fill: #ed9406;
                }

                .apist52 {
                    fill: #c6006d;
                }

                .apist53 {
                    fill: #a50263;
                }

                .apist54 {
                    fill: #6ac700;
                }

                .apist55 {
                    fill: #5b9904;
                }

                .apist56 {
                    fill: #070707;
                }
            `}
        </style>
        <ellipse className="apist17" cx={349} cy="531.8" rx="65.6" ry="25.2"/>
        <polyline
            className="apist18"
            points="258.9 104.3 202.1 24.7 196.6 27.3 257 110.5 "
        />
        <path
            className="apist18"
            d="M200.5 31.9c0 0-13.3-11.2-4.5-20.9s18.5-2.3 18.5-2.3 2.7 3.8 1.3 15.6c-1.8 15.3-6.7 14.9-10.1 14.6"
        />
        <polygon
            className="apist18"
            points="318.9 219.3 317.5 223.6 238.2 211.9 281.3 171.1 287.3 174.3 247.7 208.9 "
        />
        <path
            className="apist18"
            d="M316.4 223.2c0 0-10.9 0.8-7.9 7.8 1.7 3.9 4.9 5.4 7.3 5.9 2.2 0.5 4.4-0.5 5.6-2.5 0.6-1.1 1.3-2.5 2-4.5 2.6-7.7 0.8-8.8-1-10 -3.1-2.1-12.6-1.7-12.6-1.7L316.4 223.2z"
        />
        <polygon
            className="apist18"
            points="350.4 153.9 353.3 151.6 324.5 95 304.1 138.5 308 142.1 324.6 102.9 "
        />
        <path
            className="apist18"
            d="M352.8 150.9c0 0-2.1-8.4 4-8 3.4 0.2 5.3 2.2 6.3 3.9 0.9 1.5 0.7 3.5-0.5 4.9 -0.7 0.8-1.6 1.7-2.9 2.7 -5.3 4.1-6.5 3-7.9 1.9 -2.3-1.8-4.5-9.1-4.5-9.1L352.8 150.9z"
        />
        <polygon
            className="apist18"
            points="337.3 138.6 339 136.3 294.1 91.9 292.1 131.7 296.7 134.2 297 98.6 "
        />
        <path
            className="apist18"
            d="M338.3 135.8c0 0-4.8-6.9 0.6-7.4 3-0.3 5.4 1.2 6.8 2.5 1.3 1.2 1.8 2.9 1.3 4.2 -0.3 0.7-0.8 1.6-1.5 2.7 -3.1 4.2-4.5 3.4-6.1 2.7 -2.6-1.2-7.1-7.1-7.1-7.1L338.3 135.8z"
        />
        <path
            className="apist19"
            d="M316.8 507c10.4-23.8-3.1-66.9-3.1-66.9l-46.8-32.7 -46.8-32.7c0 0-45 2.1-63.8 20.1 -18.8 18-41.4 68.1-41.4 68.1l27.2-13.4c0 0-37.1 40.1-36.4 101.5 0.6 61.4-0.5 88-0.5 88s24.6-10.2 82.5-30.7c57.9-20.5 82.8-69.1 82.8-69.1l-3.2 30.1C267 569.3 306.3 530.8 316.8 507z"
        />
        <path
            className="apist20"
            d="M313.7 440.1c0 0 13.5 43 3.1 66.9S267 569.3 267 569.3l3.2-30.1c0 0-24.9 48.6-82.8 69.1S105 639 105 639l161.9-231.6L313.7 440.1z"
        />
        <path
            className="apist21"
            d="M266.4 408l-35.1-24.5c0 0-32.5-1-45.1 10.3 -12.6 11.3-26.2 44.3-26.2 44.3l18.9-7.7c0 0-24.6 25.4-20.8 67.4 3.2 35.9 4.2 54.3 4.4 58.9L266.4 408z"
        />
        <path
            className="apist22"
            d="M266.5 407.9l35.1 24.5c0 0 12.1 30.1 5.8 45.9 -6.2 15.7-32.6 39.9-32.6 39.9l0.7-20.4c0 0-15.3 31.9-56.1 42.7 -34.8 9.3-52.5 14.8-56.8 16.2L266.5 407.9z"
        />
        <path
            className="apist23"
            d="M439.1 355.3c0 0 16.1 43 14.5 58.4s-15.3 38.7-39.9 63.9c-24.6 25.2-44.1 40-44.1 40l-14.7-81.1L439.1 355.3z"
        />
        <path
            className="apist24"
            d="M354.9 436.6l3.4 19c13.4-7.3 30.7-20.7 44.2-30.1 13.3-9.3 32.5-36.7 42.8-52.1 -3.3-10.2-6.2-18.1-6.2-18.1L354.9 436.6z"
        />
        <path
            className="apist23"
            d="M257.3 221.7c0 0-45.9-0.4-59.8 6.5 -13.9 6.9-31.1 27.6-46.3 59.4s-22.4 55.2-22.4 55.2l81.2-14.1L257.3 221.7z"
        />
        <path
            className="apist25"
            d="M246.8 220.9c-14.3 0.3-40 1.5-49.8 6.4 -13.9 6.9-31.1 27.6-46.3 59.4 -4.3 8.9-7.9 17.2-11 24.5 14.8-18.1 44.4-50.1 53-60.1C200.7 241.9 230.4 228.1 246.8 220.9z"
        />
        <path
            className="apist26"
            d="M537.5 186.4c12-44.1 4.5-125.7 1.2-155.1 -0.7-5.9-6.3-9.8-12-8.4 -28.8 7-108 28-145.3 54.4 -46 32.6-90.4 79.5-121.7 129 -30.7 48.5-60.8 121.4-60.7 147 0 1 0.2 2 0.5 3 2.3 6.6 13.7 33.2 58.1 64.3 44.4 31 73.3 32.6 80.3 32.5 1 0 2-0.2 3-0.5 24.1-8.7 82.2-62 117.2-107.5C493.9 298.7 522.7 240.8 537.5 186.4z"
        />
        <path
            className="apist23"
            d="M401.3 66.2c-7.7 3.9-14.7 8-20.7 12.2 -46 32.6-90.4 79.5-121.7 129 -13.4 21.2-26.6 46.9-37.3 71.4 18.3 24.7 45.9 58 77.3 82.7 36 28.3 74.9 42.7 98.7 49.5 21-19.6 43-43.1 59.8-64.8 35.7-46.4 64.6-104.3 79.3-158.6 2-7.2 3.4-15.4 4.4-24.3 -18.2-18-41.6-40-63.8-57.1C451.3 86.1 421.7 73.4 401.3 66.2z"
        />
        <path
            className="apist27"
            d="M379.4 78.7c-45.3 32.5-88.9 78.8-119.8 127.7 -9.3 14.7-18.5 31.6-26.9 48.8l0 0.1c0 0 9 43.2 76.3 91.8 51.5 37.3 94.9 40.6 112.4 40.2 13.3-13.8 26.1-28.3 36.7-42.2 35.7-46.4 64.6-104.3 79.3-158.6 0.2-0.7 0.4-1.5 0.6-2.3 -18.3-19.7-43.8-44.5-70.9-63.4C432.8 96.7 398.7 84.4 379.4 78.7z"
        />
        <path
            className="apist28"
            d="M379.3 79.1c-46 32.6-90.4 79.5-121.7 129s-62 124.3-60.6 148.5c0 0 2.2 9 12.5 23 9.1-35.6 29.7-97.3 74-168.3C328.2 139.9 425 73.1 489.2 34.1 453.5 44.3 405.8 60.4 379.3 79.1z"
        />
        <path
            className="apist29"
            d="M536.7 187.5c-14.8 54.4-43.6 112.3-79.3 158.6s-95.4 100.9-118.6 108c0 0-9.2 1-25.9-3.9 30.3-20.8 81.1-61.3 132.5-127.4 51.8-66.5 81.2-180.3 95.8-254C543.9 105.9 545.2 156.2 536.7 187.5z"
        />
        <ellipse
            transform="matrix(0.5728 -0.8197 0.8197 0.5728 20.8644 425.6071)"
            className="apist30"
            cx="418.8"
            cy="192.8"
            rx="58.2"
            ry="58.2"
        />
        <ellipse
            transform="matrix(0.5728 -0.8197 0.8197 0.5728 26.0083 422.0111)"
            className="apist31"
            cx="417.9"
            cy="186.1"
            rx="58.2"
            ry="58.2"
        />
        <path
            className="apist32"
            d="M383.6 235.2c-27.1-18.9-33.7-56.4-14.8-83.5 18.9-27.1 56.4-33.7 83.5-14.8s33.7 56.4 14.8 83.5S410.7 254.1 383.6 235.2zM450.3 139.7c-25.6-17.9-60.9-11.6-78.7 14 -17.9 25.6-11.6 60.9 14 78.7 25.6 17.9 60.9 11.6 78.7-14S475.8 157.6 450.3 139.7z"
        />
        <ellipse
            transform="matrix(0.5728 -0.8197 0.8197 0.5728 25.2004 423.3459)"
            className="apist33"
            cx="418.8"
            cy="187.5"
            rx="44.9"
            ry="44.9"
        />
        <path
            className="apist34"
            d="M454.9 213c3.2-4.6 5.4-9.6 6.7-14.8 -1.5-9.2-6.6-17.8-14.8-23.5 -16.2-11.3-38.6-7.4-49.9 8.8 -9.8 14.1-8.2 32.7 3 44.8C419.2 236.8 442.4 230.9 454.9 213z"
        />
        <ellipse
            transform="matrix(0.5728 -0.8197 0.8197 0.5728 -85.2533 408.6919)"
            className="apist30"
            cx="349.5"
            cy="286.1"
            rx="32.1"
            ry="32.1"
        />
        <ellipse
            transform="matrix(0.5728 -0.8197 0.8197 0.5728 -82.4164 406.7087)"
            className="apist31"
            cx={349}
            cy="282.4"
            rx="32.1"
            ry="32.1"
        />
        <path
            className="apist32"
            d="M329.6 310.1c-15.3-10.7-19-31.8-8.3-47.1 10.7-15.3 31.8-19 47.1-8.3s19 31.8 8.3 47.1S344.9 320.8 329.6 310.1zM366.4 257.5c-13.7-9.6-32.7-6.2-42.4 7.5 -9.6 13.7-6.2 32.7 7.5 42.4 13.7 9.6 32.7 6.2 42.4-7.5C383.5 286.1 380.2 267.1 366.4 257.5z"
        />
        <ellipse
            transform="matrix(0.5728 -0.8197 0.8197 0.5728 -82.862 407.4448)"
            className="apist33"
            cx="349.5"
            cy="283.2"
            rx="24.8"
            ry="24.8"
        />
        <path
            className="apist34"
            d="M369.4 297.3c1.8-2.5 3-5.3 3.7-8.1 -0.8-5.1-3.6-9.8-8.2-13 -8.9-6.3-21.3-4.1-27.5 4.9 -5.4 7.8-4.5 18 1.7 24.7C349.7 310.4 362.5 307.1 369.4 297.3z"
        />
        <path
            className="apist23"
            d="M318.9 354.5l6.6-34 -29.7 17.9c0 0-26.3 36.9-35.4 56.8 -9.1 19.9-32.3 64.7-32.3 64.7s34-37.2 49.6-52.6C293.3 391.9 318.9 354.5 318.9 354.5z"
        />
        <path
            className="apist24"
            d="M325.1 321.1l-6.6 34c0 0-25.6 37.4-41.2 52.8 -15.6 15.4-49.6 52.6-49.6 52.6L325.1 321.1z"
        />
        <path
            className="apist35"
            d="M292 103.8c24.1 18.7 21.3 48.7 2.1 73.5 -19.2 24.8-46.6 33.8-70.7 15.1s-27.3-51.3-8.1-76.2S267.9 85.1 292 103.8z"
        />
        <path
            className="apist18"
            d="M295.7 179.4c-10.2 13.1-22.3 21.7-35 24.8 -13.6 3.3-27.2 0.2-39.3-9.2 -22.6-17.5-31.7-49.9-8.5-79.8 23.5-30.3 58.1-30.2 80.4-13 12 9.3 18.4 21.9 18.3 36.5C311.4 151.9 305.8 166.4 295.7 179.4zM216.8 118.3c-21.4 27.6-12.5 56.8 7.7 72.5 21.5 16.7 47.3 11.1 67.1-14.5 20.2-26 19.5-53.4-1.7-69.9C264.7 86.9 232 98.8 216.8 118.3z"
        />
        <ellipse
            transform="matrix(0.4265 -0.9045 0.9045 0.4265 67.3847 293.8434)"
            className="apist12"
            cx="265.4"
            cy="93.8"
            rx="14.3"
            ry="26.8"
        />
        <path
            className="apist18"
            d="M276.9 112.7c-5.7 0-12.1-1.6-18.3-4.5 -6.7-3.2-12.4-7.6-16-12.4 -3.8-5.1-4.9-10.2-3-14.2 1.9-4.1 6.5-6.5 12.9-6.8 6-0.3 13 1.3 19.7 4.5 6.7 3.2 12.4 7.6 16 12.4 3.8 5.1 4.9 10.2 3 14.2s-6.5 6.5-12.9 6.8C277.8 112.7 277.4 112.7 276.9 112.7zM254 78.2c-0.4 0-0.9 0-1.3 0 -5.1 0.3-8.6 2-10 4.8 -1.3 2.9-0.4 6.7 2.6 10.8 3.3 4.4 8.5 8.4 14.7 11.3 6.2 2.9 12.7 4.4 18.1 4.1 5.1-0.3 8.6-2 10-4.8 1.3-2.9 0.4-6.7-2.6-10.8 -3.3-4.4-8.5-8.4-14.7-11.3l0 0C265 79.7 259.1 78.2 254 78.2z"
        />
        <ellipse
            transform="matrix(0.4134 -0.9105 0.9105 0.4134 73.9771 293.7309)"
            className="apist18"
            cx={265}
            cy="89.4"
            rx="5.5"
            ry="11.8"
        />
        <ellipse
            transform="matrix(0.5147 -0.8574 0.8574 0.5147 51.5636 268.5486)"
            className="apist12"
            cx={263}
            cy="88.7"
            rx="2.6"
            ry="3.5"
        />
        <ellipse
            transform="matrix(0.4265 -0.9045 0.9045 0.4265 40.3973 298.7331)"
            className="apist12"
            cx="255.8"
            cy="117.5"
            rx="20.2"
            ry="35.2"
        />
        <path
            className="apist18"
            d="M269.4 142.9c-7 0-15-1.8-23-5.6 -8.8-4.1-16.1-10-20.7-16.5 -4.8-6.8-6-13.6-3.4-19 2.6-5.5 8.6-8.8 16.8-9.5 7.9-0.6 17.1 1.3 25.9 5.4l0 0c18.7 8.8 29.3 24.5 24.1 35.6C286.2 139.6 278.7 142.9 269.4 142.9zM242.2 95.5c-0.9 0-1.9 0-2.8 0.1 -7 0.6-12 3.2-14 7.6 -2 4.3-0.9 9.9 3.1 15.6 4.2 6.1 11.1 11.5 19.3 15.4 16.7 7.9 33.9 6.8 38.2-2.4 4.4-9.2-5.7-23.2-22.4-31l0 0C256.4 97.4 248.9 95.5 242.2 95.5z"
        />
        <ellipse
            transform="matrix(0.4134 -0.9105 0.9105 0.4134 46.9846 298.4734)"
            className="apist18"
            cx="255.2"
            cy="112.8"
            rx="7.8"
            ry={17}
        />
        <ellipse
            transform="matrix(0.5147 -0.8574 0.8574 0.5147 27.4634 268.8198)"
            className="apist12"
            cx="251.2"
            cy="110.2"
            rx="3.3"
            ry="4.4"
        />
        <polygon
            className="apist18"
            points="351.9 255 317.9 159.1 277.6 167.7 282.3 172.8 316 167.9 348.6 260.1 "
        />
        <path
            className="apist18"
            d="M358.8 264.3c0 0 8.4 10.3-2 17.3s-17.8-2.1-17.8-2.1 -1.8-4.2 1.9-15c3.7-10.8 4.9-13.2 8-14.3C351.9 249 358.8 264.3 358.8 264.3z"
        />
        <polygon
            className="apist18"
            points="376.3 210.1 341 125.1 306.8 136.4 310.2 140.9 338.4 131.9 373 215.2 "
        />
        <path
            className="apist18"
            d="M387.5 221.5c0 0 10.4 8.4 1.6 17.4 -8.8 9-17.9 1.7-17.9 1.7s-2.6-3.8-1.2-15.1c1.4-11.3 2.1-13.9 4.8-15.7C377.6 208 387.5 221.5 387.5 221.5z"
        />
        <polygon
            className="apist18"
            points="308.2 288.9 290.9 223.5 278.9 194 273.5 197.1 287.1 227.8 303.2 291.5 "
        />
        <path
            className="apist18"
            d="M316 300.4c0 0 8.3 10.4-2.3 17.3 -10.5 6.9-17.8-2.3-17.8-2.3s-1.7-4.3 2.1-15c3.8-10.7 5.1-13.1 8.2-14.2C309.3 285.1 316 300.4 316 300.4z"
        />
        <polyline
            className="apist18"
            points="260 157.4 146.7 114.1 142.8 119.2 262.4 164.5 "
        />
        <path
            className="apist18"
            d="M150 121.4c0 0-21.5-2.6-18.9-18.6s17.6-15 17.6-15 5.4 2.1 11.9 15.3c8.6 17.1 3.2 20.1-0.5 22"
        />
    </svg>
);

const Mercure = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x={0}
        y={0}
        viewBox="0 0 100 100"
        xmlSpace="preserve"
    >
        <style>
            {
                ".prefix__st1{fill:#fff}.prefix__st2,.prefix__st4{fill:#1e1f1d}.prefix__st4{opacity:.2}.prefix__st5{opacity:.1;fill:#020203}"
            }
        </style>
        <circle
            transform="rotate(-80.781 49.748 50.086)"
            cx={49.7}
            cy={50.1}
            fill="#bbe1e3"
            r={45.6}
        />
        <circle className="prefix__st1" cx={30.7} cy={34.2} r={6}/>
        <circle
            transform="rotate(-82.027 48.473 22.241)"
            className="prefix__st1"
            cx={48.5}
            cy={22.2}
            r={10.7}
        />
        <circle
            transform="rotate(-72.067 68.674 36.11)"
            className="prefix__st1"
            cx={68.7}
            cy={36.1}
            r={8.9}
        />
        <g>
            <path
                className="prefix__st2"
                d="M36.8 75.8h-1L31.2 52l9.6 5.3-.5.9-8.1-4.5z"
            />
            <path
                id="prefix__XMLID_370_"
                className="prefix__st2"
                d="M27.1 72.5l-1-.1 2-17.9L41 58.6l-.2 1-11.9-3.9z"
            />
            <path
                id="prefix__XMLID_368_"
                className="prefix__st2"
                d="M41.6 73.1l-3.2-9.8 4.7-1 .2.9-3.6.9 2.9 8.7z"
            />
            <path
                id="prefix__XMLID_366_"
                className="prefix__st2"
                d="M41.7 73s-.9-1.7-2.4-.6-.6 2.5-.6 2.5.5.5 2.1.5c1.6.1 2 0 2.3-.3.3-.3-.7-3-.7-3l-.7.9z"
            />
            <path
                id="prefix__XMLID_364_"
                className="prefix__st2"
                d="M26.1 72.2s-1.5-2.3-3.6-.9c-2 1.4-.9 3.5-.9 3.5s.7.5 2.9.5c2.9 0 2.9-.9 3.1-1.5.4-1-.7-2.9-.7-2.9l-.8 1.3z"
            />
            <path
                id="prefix__XMLID_361_"
                className="prefix__st2"
                d="M36.1 75.7s-2-2.9-4.1-1.5c-2 1.4-.9 3.5-.9 3.5s.7.5 2.9.5c2.9 0 3.1-.6 3.3-1.2.4-1-.9-3.2-.9-3.2l-.3 1.9z"
            />
        </g>
        <g id="prefix__XMLID_345_">
            <path
                id="prefix__XMLID_360_"
                className="prefix__st2"
                d="M61.3 75.6h1l5.1-23.7-9.8 5.1.5.9 8.2-4.4z"
            />
            <path
                id="prefix__XMLID_358_"
                className="prefix__st2"
                d="M71.2 72.4l.9-.1-1.7-17.9-12.9 3.9.1 1 12-3.8z"
            />
            <path
                id="prefix__XMLID_354_"
                className="prefix__st2"
                d="M56.6 72.8l3.3-9.8-4.6-1.1-.2 1 3.5.9-2.9 8.7z"
            />
            <path
                id="prefix__XMLID_352_"
                className="prefix__st2"
                d="M56.5 72.7s1-1.6 2.4-.6c1.5 1.1.6 2.5.6 2.5s-.5.4-2.1.5-2 0-2.3-.4c-.3-.4.7-3 .7-3l.7 1z"
            />
            <path
                id="prefix__XMLID_350_"
                className="prefix__st2"
                d="M72.1 72.1s1.6-2.3 3.6-.8.8 3.5.8 3.5-.7.5-2.9.5c-2.9 0-2.9-.9-3.1-1.5-.3-1 .8-2.9.8-2.9l.8 1.2z"
            />
            <path
                id="prefix__XMLID_348_"
                className="prefix__st2"
                d="M62.1 75.5s2.1-2.9 4.1-1.4c2 1.5.8 3.5.8 3.5s-.7.4-2.9.4c-2.9 0-3.1-.6-3.3-1.2-.3-1 1-3.2 1-3.2l.3 1.9z"
            />
        </g>
        <g id="prefix__XMLID_340_">
            <path
                id="prefix__XMLID_344_"
                d="M59.1 52.4c1.7 5.4-1.7 9.6-7.1 11.3-5.4 1.7-10.3.1-12.1-5.3-1.7-5.4 1.8-8.6 7.1-10.3 5.5-1.6 10.4-1.1 12.1 4.3z"
                fill="#3baab4"
            />
            <path
                id="prefix__XMLID_341_"
                className="prefix__st2"
                d="M52.3 64.7c-3 .9-5.8.9-8.1 0-2.5-1-4.3-3.1-5.2-5.9-1.7-5.4 1-9.3 7.8-11.5 6.9-2.2 11.6-.5 13.3 4.8.9 2.9.6 5.6-1 7.9-1.4 2.1-3.8 3.8-6.8 4.7zm-5.2-16.5c-6.3 2-8.7 5.4-7.1 10.2 1.6 5.1 6.3 7.1 12.1 5.3 5.9-1.9 8.7-6.3 7.1-11.4-2-5.9-7.6-5.5-12.1-4.1z"
            />
        </g>
        <g id="prefix__XMLID_335_">
            <ellipse
                id="prefix__XMLID_339_"
                transform="matrix(.00813 -1 1 .00813 -4.278 93.662)"
                className="prefix__st1"
                cx={45.1}
                cy={49}
                rx={6.9}
                ry={6.7}
            />
            <path
                id="prefix__XMLID_336_"
                className="prefix__st2"
                d="M44.9 56.2c-3.9 0-7-3.3-7-7.3s3.2-7.2 7.1-7.2c3.9 0 7 3.3 7 7.3-.1 4-3.2 7.3-7.1 7.2zm.1-13.8c-3.5 0-6.3 2.9-6.4 6.5 0 3.6 2.8 6.6 6.3 6.6s6.3-2.9 6.4-6.5c0-3.6-2.8-6.5-6.3-6.6z"
            />
        </g>
        <g id="prefix__XMLID_330_">
            <ellipse
                id="prefix__XMLID_334_"
                transform="matrix(.00813 -1 1 .00813 4.395 104.82)"
                className="prefix__st1"
                cx={55}
                cy={50.2}
                rx={5.4}
                ry={5.5}
            />
            <path
                id="prefix__XMLID_331_"
                className="prefix__st2"
                d="M54.9 55.9c-3.2 0-5.8-2.6-5.8-5.8 0-3.2 2.7-5.7 5.9-5.7s5.8 2.6 5.8 5.8c-.1 3.2-2.7 5.8-5.9 5.7zm0-10.8c-2.8 0-5.2 2.2-5.2 5s2.3 5.1 5.1 5.1 5.2-2.2 5.2-5c.1-2.7-2.2-5-5.1-5.1z"
            />
        </g>
        <circle
            id="prefix__XMLID_328_"
            className="prefix__st2"
            cx={45.5}
            cy={49.4}
            r={3.1}
        />
        <circle
            id="prefix__XMLID_327_"
            className="prefix__st1"
            cx={47.2}
            cy={48.9}
            r={0.8}
        />
        <ellipse
            id="prefix__XMLID_325_"
            transform="matrix(.00813 -1 1 .00813 4.507 105.579)"
            className="prefix__st2"
            cx={55.5}
            cy={50.5}
            rx={2.4}
            ry={2.5}
        />
        <circle
            id="prefix__XMLID_324_"
            className="prefix__st1"
            cx={55}
            cy={50.1}
            r={0.7}
        />
        <g id="prefix__XMLID_272_">
            <ellipse
                id="prefix__XMLID_323_"
                transform="rotate(-1.132 65.185 77.293)"
                className="prefix__st4"
                cx={65.2}
                cy={77.3}
                rx={4.3}
                ry={1.4}
            />
            <ellipse
                id="prefix__XMLID_322_"
                transform="matrix(.00813 -1 1 .00813 -.088 148.78)"
                className="prefix__st4"
                cx={75}
                cy={74.4}
                rx={1.4}
                ry={4.4}
            />
            <ellipse
                id="prefix__XMLID_320_"
                transform="matrix(.00813 -1 1 .00813 -16.842 131.481)"
                className="prefix__st4"
                cx={57.9}
                cy={74.2}
                rx={1.4}
                ry={3}
            />
        </g>
        <g id="prefix__XMLID_375_">
            <ellipse
                id="prefix__XMLID_381_"
                transform="rotate(-87.937 32.606 77.55) scale(1.00005)"
                className="prefix__st4"
                cx={32.6}
                cy={77.5}
                rx={1.4}
                ry={4.3}
            />
            <ellipse
                id="prefix__XMLID_380_"
                transform="matrix(.00813 -1 1 .00813 -51.829 96.813)"
                className="prefix__st4"
                cx={22.9}
                cy={74.5}
                rx={1.4}
                ry={4.4}
            />
            <ellipse
                id="prefix__XMLID_379_"
                transform="matrix(.00813 -1 1 .00813 -34.944 113.984)"
                className="prefix__st4"
                cx={40}
                cy={74.6}
                rx={1.4}
                ry={3}
            />
        </g>
        <path
            id="prefix__XMLID_356_"
            className="prefix__st2"
            d="M78.3 52.5L61.9 63.6l-5.5-4.9.6-.7 5 4.3 15.4-10.6z"
        />
        <path
            id="prefix__XMLID_347_"
            className="prefix__st2"
            d="M77.2 53.1s3.1-1.1 2.2-3.5c-.9-2.3-3.2-1.6-3.2-1.6s-.7.5-1.3 2.7c-.7 2.9.2 3.1.9 3.3"
        />
        <path
            id="prefix__XMLID_376_"
            className="prefix__st2"
            d="M20.8 53.2l16.3 10.9 5-5.3-.7-.7-4.5 4.8-15.7-10.5z"
        />
        <path
            id="prefix__XMLID_362_"
            className="prefix__st2"
            d="M20.8 53.8s-3.2-.9-2.4-3.3c.8-2.4 3-1.9 3-1.9s.8.5 1.5 2.6c.9 2.8 0 3.1-.6 3.3"
        />
        <path
            className="prefix__st5"
            d="M26.9 38.3c2 2 5.2 2 7.2 0s2-5.2 0-7.2c0 0-1.1 3.4-2.4 4.6s-4.8 2.6-4.8 2.6z"
        />
        <linearGradient
            id="prefix__SVGID_1_"
            gradientUnits="userSpaceOnUse"
            x1={-104.708}
            y1={-218.524}
            x2={-95.753}
            y2={-218.524}
            gradientTransform="matrix(1.3707 .02173 -.02176 1.3727 163.251 336.41)"
        >
            <stop offset={0} stopColor="#76c8dd"/>
            <stop offset={1} stopColor="#2ab3d7"/>
        </linearGradient>
        <path
            d="M30.5 40.4c-3.4-.1-6.1-2.9-6-6.2s2.9-6.1 6.2-6c3.4.1 6.1 2.9 6 6.2 0 3.3-2.8 6.1-6.2 6zm.2-11.8c-3.1 0-5.7 2.4-5.7 5.5s2.4 5.7 5.5 5.7 5.7-2.4 5.7-5.5c.1-3-2.4-5.6-5.5-5.7z"
            fill="url(#prefix__SVGID_1_)"
        />
        <linearGradient
            id="prefix__SVGID_2_"
            gradientUnits="userSpaceOnUse"
            x1={-103.744}
            y1={320.571}
            x2={-96.717}
            y2={320.571}
            gradientTransform="matrix(1.3707 .02173 .02176 -1.3727 161.031 476.425)"
        >
            <stop offset={0} stopColor="#76c8dd"/>
            <stop offset={1} stopColor="#2ab3d7"/>
        </linearGradient>
        <path
            d="M30.7 29.4c-2.7 0-4.9 2.1-4.9 4.7 0 .8.2 1.6.5 2.3.1-.1.3-.2.4-.3 2.7-1.5 5-2.8 6.6-5.2 0 0-.2 2.7-1.7 4-.4.3-.7.5-.9.7.8-.4 1.5-.9 2-1.5 0 0-.1 1.8-1.4 2.6-.5.3-.9.5-1.4.6.8-.2 1.3-.4 1.7-.6-.4 1.1-1.1 1.7-2.3 1.9-.4 0-.8-.1-1.1-.1.7.4 1.5.6 2.3.6 2.7 0 4.9-2.1 4.9-4.7.1-2.8-2-5-4.7-5z"
            fill="url(#prefix__SVGID_2_)"
        />
        <path
            className="prefix__st5"
            d="M39.6 26.7c2 4.6 7.4 6.7 11.9 4.7s6.7-7.4 4.7-11.9c0 0-4.1 4.8-7 6.2-2.9 1.2-9.6 1-9.6 1z"
        />
        <linearGradient
            id="prefix__SVGID_3_"
            gradientUnits="userSpaceOnUse"
            x1={124.354}
            y1={-308.435}
            x2={140.301}
            y2={-308.435}
            gradientTransform="matrix(1.2945 .5263 -.506 1.2446 -278.654 336.448)"
        >
            <stop offset={0} stopColor="#76c8dd"/>
            <stop offset={1} stopColor="#2ab3d7"/>
        </linearGradient>
        <path
            d="M44.7 32.1c-5.7-2.3-8.5-8.6-6.3-14.1s8.7-8 14.4-5.7 8.5 8.6 6.3 14.1c-2.3 5.5-8.7 8-14.4 5.7zm7.7-19c-5.2-2.1-11.1.2-13.1 5.2s.6 10.8 5.8 12.9S56.2 31 58.3 26c1.9-4.9-.7-10.8-5.9-12.9z"
            fill="url(#prefix__SVGID_3_)"
        />
        <linearGradient
            id="prefix__SVGID_4_"
            gradientUnits="userSpaceOnUse"
            x1={126.497}
            y1={411.231}
            x2={139.011}
            y2={411.231}
            gradientTransform="matrix(1.27 .5163 .517 -1.2718 -332.746 476.702)"
        >
            <stop offset={0} stopColor="#76c8dd"/>
            <stop offset={1} stopColor="#2ab3d7"/>
        </linearGradient>
        <path
            d="M51.7 14.3c-4.4-1.8-9.4.3-11.2 4.7-.6 1.4-.7 2.8-.6 4.2.3-.1.6-.1.9-.2 5.4-.8 10.1-1.4 14.3-4.4 0 0-2 4.4-5.5 5.5-.8.2-1.4.4-2 .5 1.6-.2 3-.5 4.4-1.2 0 0-1.3 3-4.1 3.4-.9.2-1.7.2-2.5.2 1.4.2 2.4.2 3.2 0-1.3 1.6-2.9 2.1-5 1.6-.7-.2-1.3-.6-1.8-1 .9 1.1 2 2 3.4 2.5 4.4 1.8 9.4-.3 11.2-4.7s-.3-9.3-4.7-11.1z"
            fill="url(#prefix__SVGID_4_)"
        />
        <path
            className="prefix__st5"
            d="M60.5 35.5c-.5 4.1 2.4 7.9 6.5 8.4s7.9-2.4 8.4-6.5c0 0-5 1.7-7.6 1.4-2.6-.3-7.3-3.3-7.3-3.3z"
        />
        <linearGradient
            id="prefix__SVGID_5_"
            gradientUnits="userSpaceOnUse"
            x1={343.974}
            y1={-400.692}
            x2={357.227}
            y2={-400.692}
            gradientTransform="matrix(.822 1.0971 -1.0987 .8232 -659.793 -18.605)"
        >
            <stop offset={0} stopColor="#76c8dd"/>
            <stop offset={1} stopColor="#2ab3d7"/>
        </linearGradient>
        <path
            d="M61.4 41.6c-3-4-2.2-9.7 1.8-12.7s9.7-2.2 12.7 1.8 2.2 9.7-1.8 12.7-9.7 2.2-12.7-1.8zm13.9-10.4c-2.7-3.7-8-4.4-11.6-1.7-3.7 2.8-4.4 8-1.7 11.6 2.7 3.7 8 4.4 11.7 1.7s4.4-7.9 1.6-11.6z"
            fill="url(#prefix__SVGID_5_)"
        />
        <linearGradient
            id="prefix__SVGID_6_"
            gradientUnits="userSpaceOnUse"
            x1={345.4}
            y1={502.761}
            x2={355.8}
            y2={502.761}
            gradientTransform="matrix(.822 1.0971 1.0987 -.8232 -771.86 65.363)"
        >
            <stop offset={0} stopColor="#76c8dd"/>
            <stop offset={1} stopColor="#2ab3d7"/>
        </linearGradient>
        <path
            d="M74.4 31.8c-2.4-3.2-6.8-3.8-10-1.4-1 .7-1.7 1.7-2.2 2.7.2.1.5.1.7.2 4.2 1.7 7.8 3.3 12.1 3 0 0-3.3 2.3-6.2 1.6-.6-.2-1.2-.3-1.6-.5 1.2.6 2.4 1 3.6 1 0 0-2.2 1.6-4.4.7-.8-.3-1.4-.7-1.9-1.1.9.8 1.6 1.2 2.3 1.4-1.6.6-3 .3-4.2-1-.4-.5-.6-1-.9-1.5.2 1.2.6 2.3 1.4 3.3 2.4 3.2 6.8 3.8 10 1.4 3-2.1 3.7-6.6 1.3-9.8z"
            fill="url(#prefix__SVGID_6_)"
        />
    </svg>
);

const Arrow = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={26}
        height={18}
        viewBox="0 0 25.9 18"
    >
        <style jsx>
            {`
                .linkst0 {
                    clip-path: url(#SVGID_2_);
                    fill: #38a9b4;
                }
            `}
        </style>
        <defs>
            <rect width="25.9" height={18}/>
        </defs>
        <path
            className="linkst0"
            d="M17 0.3c-0.3-0.4-0.9-0.4-1.3 0 -0.3 0.3-0.3 0.9 0 1.3L22.1 8H0.9C0.4 8 0 8.4 0 8.9c0 0.5 0.4 0.9 0.9 0.9h21.2l-6.4 6.4c-0.3 0.4-0.3 0.9 0 1.3 0.4 0.4 0.9 0.4 1.3 0l8-8c0.4-0.3 0.4-0.9 0-1.3L17 0.3zM17 0.3"
        />
    </svg>
);

const Flag = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={600}
        height={30}
        viewBox="0 0 830 42"
        className="welcome__flag"
    >
        <style jsx>
            {`
                .flagst0 {
                    fill: #253032;
                }

                .flagst1 {
                    fill: #ffffff;
                }

                .flagst2 {
                    fill: #c34536;
                }
            `}
        </style>
        <rect className="flagst0" width={830} height={42}/>
        <path
            className="flagst1"
            d="M241.2 27.1v-6.3c0-0.8-0.2-1.3-0.5-1.7 -0.3-0.4-0.8-0.6-1.5-0.6 -0.9 0-1.6 0.3-2 0.8s-0.7 1.3-0.7 2.4v5.4H235v-6.3c0-0.8-0.2-1.3-0.5-1.7 -0.3-0.4-0.8-0.6-1.5-0.6 -0.9 0-1.6 0.3-2 0.8 -0.4 0.5-0.6 1.4-0.6 2.7v5.1h-1.5v-9.6h1.2l0.2 1.3h0.1c0.3-0.5 0.7-0.8 1.2-1.1 0.5-0.3 1.1-0.4 1.7-0.4 1.5 0 2.5 0.5 3 1.6h0.1c0.3-0.5 0.7-0.9 1.2-1.2s1.2-0.4 1.9-0.4c1.1 0 1.9 0.3 2.4 0.8 0.5 0.6 0.8 1.5 0.8 2.7v6.3H241.2z"
        />
        <path
            className="flagst1"
            d="M251.5 27.1l-0.3-1.4h-0.1c-0.5 0.6-1 1-1.4 1.2 -0.5 0.2-1.1 0.3-1.8 0.3 -1 0-1.7-0.2-2.2-0.7s-0.8-1.2-0.8-2.1c0-1.9 1.6-3 4.7-3.1l1.6-0.1v-0.6c0-0.8-0.2-1.3-0.5-1.7 -0.3-0.4-0.8-0.5-1.6-0.5 -0.8 0-1.7 0.2-2.7 0.7l-0.4-1.1c0.5-0.3 1-0.5 1.6-0.6s1.1-0.2 1.7-0.2c1.1 0 2 0.3 2.6 0.8 0.6 0.5 0.8 1.3 0.8 2.5v6.6H251.5zM248.3 26.1c0.9 0 1.6-0.2 2.1-0.7 0.5-0.5 0.8-1.2 0.8-2.1v-0.9l-1.5 0.1c-1.2 0-2 0.2-2.5 0.5 -0.5 0.3-0.8 0.8-0.8 1.5 0 0.5 0.2 0.9 0.5 1.2S247.7 26.1 248.3 26.1z"
        />
        <path
            className="flagst1"
            d="M262.2 25.8L262.2 25.8c-0.8 1-1.8 1.5-3.1 1.5 -1.3 0-2.2-0.4-2.9-1.3s-1-2.1-1-3.7 0.4-2.8 1.1-3.7 1.7-1.3 2.9-1.3c1.3 0 2.3 0.5 3 1.4h0.1l-0.1-0.7 0-0.7v-3.9h1.5v13.7h-1.2L262.2 25.8zM259.3 26c1 0 1.7-0.3 2.2-0.8 0.4-0.5 0.7-1.4 0.7-2.6v-0.3c0-1.4-0.2-2.3-0.7-2.9 -0.5-0.6-1.2-0.9-2.2-0.9 -0.9 0-1.5 0.3-2 1 -0.5 0.7-0.7 1.6-0.7 2.8 0 1.2 0.2 2.2 0.7 2.8S258.4 26 259.3 26z"
        />
        <path
            className="flagst1"
            d="M270.7 27.3c-1.4 0-2.5-0.4-3.4-1.3 -0.8-0.9-1.2-2.1-1.2-3.6 0-1.6 0.4-2.8 1.1-3.7 0.8-0.9 1.8-1.4 3.1-1.4 1.2 0 2.2 0.4 2.9 1.2 0.7 0.8 1.1 1.8 1.1 3.1v0.9h-6.6c0 1.1 0.3 2 0.9 2.6s1.3 0.9 2.3 0.9c1 0 2.1-0.2 3.1-0.7v1.3c-0.5 0.2-1 0.4-1.5 0.5C271.9 27.2 271.4 27.3 270.7 27.3zM270.3 18.5c-0.8 0-1.4 0.3-1.8 0.8 -0.5 0.5-0.7 1.2-0.8 2.1h5c0-0.9-0.2-1.6-0.6-2.1C271.7 18.7 271.1 18.5 270.3 18.5z"
        />
        <path
            className="flagst1"
            d="M289.3 27.1l-1.8-5.7c-0.1-0.3-0.3-1.1-0.6-2.4h-0.1c-0.2 1-0.4 1.8-0.6 2.4l-1.8 5.6h-1.7l-2.6-9.6h1.5c0.6 2.4 1.1 4.3 1.4 5.5 0.3 1.3 0.5 2.1 0.6 2.6h0.1c0.1-0.3 0.2-0.8 0.3-1.3 0.1-0.5 0.3-1 0.4-1.3l1.8-5.5h1.6l1.7 5.5c0.3 1 0.6 1.9 0.7 2.5h0.1c0-0.2 0.1-0.5 0.2-1s0.7-2.8 1.8-7.1h1.5l-2.7 9.6H289.3z"
        />
        <path
            className="flagst1"
            d="M295.3 14.8c0-0.3 0.1-0.6 0.2-0.7 0.2-0.2 0.4-0.2 0.6-0.2 0.2 0 0.4 0.1 0.6 0.2s0.3 0.4 0.3 0.7 -0.1 0.6-0.3 0.7c-0.2 0.2-0.4 0.2-0.6 0.2 -0.2 0-0.5-0.1-0.6-0.2C295.4 15.4 295.3 15.2 295.3 14.8zM296.9 27.1h-1.5v-9.6h1.5V27.1z"
        />
        <path
            className="flagst1"
            d="M303.1 26.1c0.3 0 0.5 0 0.7-0.1 0.2 0 0.4-0.1 0.6-0.1V27c-0.2 0.1-0.4 0.1-0.7 0.2 -0.3 0.1-0.6 0.1-0.8 0.1 -1.9 0-2.8-1-2.8-2.9v-5.7h-1.4v-0.7l1.4-0.6 0.6-2.1h0.8v2.2h2.8v1.1h-2.8v5.7c0 0.6 0.1 1 0.4 1.3S302.6 26.1 303.1 26.1z"
        />
        <path
            className="flagst1"
            d="M312.9 27.1v-6.2c0-0.8-0.2-1.4-0.5-1.8s-0.9-0.6-1.7-0.6c-1 0-1.8 0.3-2.2 0.8 -0.5 0.6-0.7 1.5-0.7 2.7v5h-1.5V13.4h1.5v4.1c0 0.5 0 0.9-0.1 1.2h0.1c0.3-0.5 0.7-0.8 1.2-1.1 0.5-0.3 1.1-0.4 1.8-0.4 1.2 0 2.1 0.3 2.7 0.8 0.6 0.6 0.9 1.4 0.9 2.7v6.3H312.9z"
        />
        <path
            className="flagst1"
            d="M364 17.3c1.3 0 2.2 0.4 2.9 1.3 0.7 0.9 1 2.1 1 3.7s-0.4 2.8-1.1 3.7c-0.7 0.9-1.7 1.3-2.9 1.3 -0.6 0-1.2-0.1-1.7-0.3 -0.5-0.2-1-0.6-1.3-1.1h-0.1l-0.3 1.2h-1V13.4h1.5v3.3c0 0.7 0 1.4-0.1 2h0.1C361.6 17.8 362.6 17.3 364 17.3zM363.7 18.5c-1 0-1.7 0.3-2.2 0.9 -0.4 0.6-0.7 1.5-0.7 2.9s0.2 2.3 0.7 2.9c0.5 0.6 1.2 0.9 2.2 0.9 0.9 0 1.6-0.3 2-1 0.4-0.7 0.7-1.6 0.7-2.8 0-1.3-0.2-2.2-0.7-2.8S364.7 18.5 363.7 18.5z"
        />
        <path
            className="flagst1"
            d="M369 17.5h1.6l2.1 5.5c0.5 1.3 0.8 2.2 0.9 2.7h0.1c0.1-0.3 0.2-0.8 0.5-1.5 0.2-0.7 1-2.9 2.4-6.7h1.6l-4.1 11c-0.4 1.1-0.9 1.9-1.4 2.3 -0.5 0.5-1.2 0.7-2 0.7 -0.4 0-0.9 0-1.3-0.1v-1.2c0.3 0.1 0.7 0.1 1.1 0.1 1 0 1.7-0.6 2.1-1.7l0.5-1.4L369 17.5z"
        />
        <path
            className="flagst2"
            d="M344.3 11.8c-0.9-0.5-2-0.8-3.1-0.8 -2 0-3.7 0.9-4.9 2.3 -1.2-1.4-2.9-2.3-4.9-2.3 -1.1 0-2.2 0.3-3.1 0.8 -2 1.1-3.3 3.2-3.3 5.6 0 0.7 0.1 1.3 0.3 2 1.1 4.9 11 11.1 11 11.1s9.9-6.2 11-11.1c0.2-0.6 0.3-1.3 0.3-2C347.6 15 346.3 12.9 344.3 11.8L344.3 11.8zM344.3 11.8"
        />
        <path
            className="flagst1"
            d="M391.1 24.7c0.1-0.1 0.3-0.2 0.5-0.3 0.2-0.2 0.5-0.3 0.9-0.6 0.3-0.2 0.7-0.5 1.1-0.7 0.4-0.3 0.8-0.5 1.1-0.8l0.1-0.8c0.2-1.6 0.4-3.1 0.8-4.5 0.4-1.4 0.8-2.6 1.4-3.7 0.5-1.1 1.1-2.1 1.7-2.9 0.6-0.8 1.2-1.5 1.9-2.1 0.6-0.6 1.3-1 1.9-1.3 0.6-0.3 1.2-0.4 1.7-0.4 0.4 0 0.8 0.1 1.1 0.2 0.3 0.1 0.6 0.4 0.8 0.7 0.2 0.3 0.4 0.7 0.6 1.1s0.2 1 0.2 1.6c0 0.7-0.1 1.5-0.3 2.3 -0.2 0.8-0.5 1.6-0.9 2.4 -0.4 0.8-0.9 1.6-1.4 2.4 -0.6 0.8-1.2 1.6-1.9 2.3 -0.7 0.8-1.4 1.5-2.2 2.1 -0.8 0.7-1.6 1.3-2.5 1.8 0 0.5 0 0.9 0 1.1 0 0.3 0 0.5 0 0.6 0 0.1 0 0.2 0 0.3 0 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0 0.2 0 0.1 0.1 0.1 0.2 0.1 0.1 0 0.2 0.1 0.3 0.1 0.1 0 0.3 0 0.6 0 0.4 0 0.8-0.1 1.4-0.3l3.9-1.1c0.1 0 0.1 0 0.2 0 0.1 0 0.1 0 0.2 0 0.2 0 0.4 0 0.5 0.1s0.3 0.2 0.4 0.3c0.1 0.1 0.2 0.3 0.2 0.4 0 0.2 0.1 0.3 0.1 0.5 0 0.2 0 0.3-0.1 0.5 0 0.1-0.1 0.3-0.2 0.4 -0.1 0.1-0.2 0.2-0.4 0.3 -0.1 0.1-0.3 0.2-0.5 0.2 -0.8 0.3-1.5 0.6-2.3 0.8 -0.3 0.1-0.7 0.2-1.1 0.3 -0.4 0.1-0.8 0.2-1.2 0.3 -0.4 0.1-0.8 0.1-1.2 0.2 -0.4 0-0.8 0.1-1.2 0.1 -0.6 0-1.1-0.1-1.4-0.3 -0.4-0.2-0.7-0.5-0.9-0.8 -0.2-0.3-0.4-0.7-0.5-1.2 -0.1-0.4-0.1-0.9-0.1-1.4 -0.7 0.5-1.2 0.9-1.7 1.2 -0.5 0.3-0.8 0.4-0.9 0.4 -0.1 0-0.3 0-0.4-0.1 -0.1-0.1-0.2-0.2-0.3-0.4 -0.1-0.1-0.2-0.3-0.2-0.5 -0.1-0.2-0.1-0.4-0.1-0.5 0-0.1 0-0.3 0.1-0.4C390.9 24.9 391 24.8 391.1 24.7zM397.8 20.6c0.4-0.4 0.8-0.9 1.2-1.4s0.9-1 1.3-1.5c0.4-0.5 0.8-1.1 1.2-1.6 0.4-0.6 0.8-1.1 1.1-1.7 0.3-0.6 0.6-1.1 0.8-1.6 0.2-0.5 0.4-1 0.4-1.5 0-0.2 0-0.3 0-0.5 0-0.1 0-0.3 0-0.4 0-0.4-0.1-0.8-0.2-1 -0.1-0.2-0.3-0.3-0.5-0.3 -0.2 0-0.5 0.1-0.9 0.4 -0.3 0.3-0.7 0.6-1.1 1.1 -0.4 0.5-0.7 1.1-1.1 1.8s-0.7 1.5-1 2.3c-0.3 0.8-0.6 1.8-0.8 2.8C398 18.5 397.9 19.5 397.8 20.6z"
        />
        <path
            className="flagst1"
            d="M410.3 28.6c-0.7 0-1.4-0.1-1.9-0.4 -0.6-0.3-1-0.6-1.4-1.1s-0.6-1-0.8-1.6 -0.3-1.2-0.3-1.9c0-0.4 0-0.9 0.1-1.4 0.1-0.5 0.2-1 0.4-1.4 0.2-0.5 0.4-0.9 0.7-1.3 0.3-0.4 0.6-0.8 0.9-1.1 0.4-0.3 0.8-0.6 1.2-0.8 0.4-0.2 0.9-0.3 1.5-0.3 0.4 0 0.8 0.1 1.2 0.2 0.4 0.1 0.7 0.3 1 0.6 0.3 0.3 0.5 0.6 0.7 0.9 0.2 0.4 0.2 0.8 0.2 1.2 0 0.5-0.1 1-0.4 1.5 -0.2 0.5-0.6 0.9-1 1.4 -0.4 0.4-0.9 0.8-1.5 1.1 -0.6 0.3-1.2 0.6-1.9 0.8 0.1 0.2 0.2 0.4 0.3 0.5 0.1 0.1 0.2 0.2 0.3 0.3 0.1 0.1 0.2 0.1 0.4 0.2 0.1 0 0.3 0 0.4 0 0.5 0 1-0.1 1.5-0.3s1-0.4 1.5-0.7c0.5-0.3 1-0.6 1.4-0.9 0.4-0.3 0.8-0.6 1.1-0.9l1.5 1.6c-0.7 0.7-1.4 1.3-2.2 1.9 -0.3 0.2-0.7 0.5-1.1 0.7 -0.4 0.2-0.8 0.4-1.2 0.6 -0.4 0.2-0.9 0.3-1.3 0.4C411.2 28.5 410.7 28.6 410.3 28.6zM408.7 23.1c0.3 0 0.6-0.1 0.9-0.2 0.3-0.1 0.6-0.3 0.9-0.6 0.3-0.2 0.5-0.5 0.7-0.7 0.2-0.3 0.3-0.5 0.3-0.8 0-0.4-0.1-0.6-0.2-0.9 -0.1-0.2-0.3-0.3-0.5-0.3 -0.3 0-0.6 0.1-0.9 0.2 -0.2 0.1-0.4 0.3-0.6 0.5 -0.2 0.2-0.3 0.4-0.4 0.7s-0.2 0.5-0.2 0.8c-0.1 0.3-0.1 0.5-0.1 0.8C408.7 22.7 408.7 22.9 408.7 23.1z"
        />
        <path
            className="flagst1"
            d="M415.4 24.1c0.4-0.4 0.8-0.7 1.1-0.9 0.3-0.2 0.5-0.5 0.7-0.7 0.2-0.2 0.4-0.4 0.5-0.6 0.2-0.2 0.3-0.5 0.6-0.8 0.2-0.3 0.5-0.6 0.8-1.1 0.3-0.4 0.7-0.9 1.2-1.6 0.1-0.1 0.2-0.3 0.3-0.4 0.1-0.1 0.3-0.3 0.4-0.4 0.2-0.1 0.3-0.2 0.5-0.3 0.2-0.1 0.4-0.1 0.6-0.1 0.4 0 0.7 0 0.9 0.1 0.2 0.1 0.4 0.2 0.4 0.3 0.1 0.1 0.1 0.2 0.2 0.4 0 0.1 0 0.2 0 0.3 0 0.2-0.1 0.4-0.2 0.6 -0.1 0.2-0.3 0.4-0.5 0.7 -0.2 0.2-0.3 0.4-0.5 0.6 -0.2 0.2-0.3 0.3-0.3 0.4 0 0.2 0 0.5 0.1 0.7 0 0.2 0.1 0.4 0.1 0.6 0.1 0.2 0.1 0.4 0.2 0.6 0.1 0.2 0.1 0.5 0.2 0.7 0.1 0.3 0.1 0.6 0.1 1 0 0.4 0.1 0.8 0.1 1.3 0.3-0.2 0.6-0.4 0.9-0.5 0.3-0.2 0.7-0.3 1-0.5 0.4-0.2 0.7-0.3 1.1-0.5 0.4-0.2 0.7-0.4 1.1-0.7l0 2.6c-0.5 0.4-1 0.7-1.7 1.1 -0.6 0.3-1.3 0.6-2 0.9 -0.7 0.2-1.4 0.4-2.1 0.6 -0.7 0.1-1.4 0.2-2 0.2 -0.5 0-0.9 0-1.3-0.1 -0.4-0.1-0.7-0.2-1-0.4 -0.3-0.2-0.5-0.4-0.7-0.7 -0.2-0.3-0.3-0.7-0.3-1.1 -0.1 0-0.2 0-0.3 0 -0.1 0-0.2 0-0.3 0 -0.1 0-0.2 0-0.4 0 -0.1 0-0.2 0-0.3-0.1 -0.1-0.1-0.1-0.1-0.2-0.2 0-0.1-0.1-0.3-0.1-0.5 0-0.2 0-0.4 0.1-0.5 0.1-0.2 0.2-0.3 0.3-0.4s0.2-0.2 0.4-0.3C415.2 24.2 415.3 24.1 415.4 24.1zM416.9 25.6c0.1 0 0.2 0.1 0.3 0.2 0.1 0.1 0.2 0.2 0.4 0.4 0.1 0.1 0.3 0.3 0.5 0.4 0.2 0.1 0.4 0.2 0.7 0.2 0.3 0 0.6-0.1 0.8-0.2 0.2-0.1 0.4-0.2 0.5-0.4 0.1-0.2 0.2-0.4 0.2-0.6 0-0.2 0.1-0.5 0.1-0.7 0-0.2 0-0.4 0-0.6 0-0.2-0.1-0.4-0.1-0.6 0-0.2-0.1-0.4-0.1-0.6 -0.1-0.2-0.1-0.3-0.1-0.5L416.9 25.6z"
        />
        <path
            className="flagst1"
            d="M433.6 13c0-0.7 0.1-1.2 0.4-1.7 0.3-0.5 0.6-0.9 1.1-1.2 0.5-0.3 1.1-0.6 1.8-0.8 0.7-0.2 1.4-0.4 2.3-0.5 0.8-0.1 1.7-0.2 2.6-0.3s1.9-0.1 2.9-0.1c1.4 0 2.8 0.1 4.3 0.2 1.5 0.1 3 0.3 4.7 0.6 0.4 0.1 0.6 0.2 0.8 0.4 0.2 0.2 0.2 0.4 0.2 0.7 0 0.2 0 0.3-0.1 0.5 -0.1 0.1-0.2 0.3-0.3 0.4 -0.1 0.1-0.3 0.2-0.4 0.3 -0.2 0.1-0.3 0.1-0.5 0.1 -0.6 0-1.2 0-1.9-0.1 -0.7-0.1-1.3-0.1-2-0.2 -0.7-0.1-1.4-0.2-2.2-0.2 -0.8-0.1-1.5-0.1-2.3-0.2 -0.1 0.9-0.3 1.8-0.5 2.8 -0.2 1-0.5 2-0.7 3.1s-0.5 2.1-0.8 3.1c-0.3 1-0.6 2-0.8 3 -0.3 0.9-0.5 1.8-0.7 2.6 -0.2 0.8-0.4 1.5-0.6 2.1 -0.1 0.3-0.2 0.5-0.3 0.7 -0.1 0.2-0.3 0.4-0.4 0.6 -0.2 0.2-0.3 0.3-0.5 0.4 -0.2 0.1-0.3 0.1-0.5 0.1 -0.4 0-0.8-0.1-1.1-0.3 -0.3-0.2-0.4-0.6-0.4-1 0-0.1 0-0.3 0.1-0.5 0.1-0.7 0.2-1.4 0.4-2.1 0.2-0.7 0.4-1.4 0.6-2.2 0.2-0.7 0.5-1.5 0.8-2.4 0.3-0.8 0.6-1.8 1-2.8s0.7-2.1 1.1-3.3c0.4-1.2 0.9-2.6 1.3-4 -0.4 0-0.8 0.1-1.3 0.1 -0.4 0-0.8 0.1-1.2 0.2 -0.4 0.1-0.8 0.2-1.1 0.3 -0.3 0.1-0.7 0.2-0.9 0.4 -0.3 0.2-0.5 0.3-0.6 0.6 -0.2 0.2-0.2 0.5-0.2 0.8 0 0 0 0.1 0 0.3 0 0.2-0.1 0.3-0.2 0.5 -0.1 0.2-0.3 0.4-0.6 0.5 -0.3 0.2-0.6 0.2-1.1 0.2 -0.5 0-0.8-0.1-1.1-0.2 -0.3-0.2-0.4-0.3-0.6-0.5C433.7 13.5 433.6 13.3 433.6 13z"
        />
        <path
            className="flagst1"
            d="M458.1 26.1c-0.3 0.3-0.6 0.5-1 0.8 -0.4 0.3-0.9 0.6-1.4 0.8 -0.5 0.2-1 0.5-1.5 0.6 -0.5 0.2-1 0.2-1.4 0.2 -0.4 0-0.7-0.1-1-0.2 -0.3-0.1-0.5-0.3-0.7-0.5 -0.2-0.2-0.3-0.5-0.4-0.7 -0.1-0.3-0.1-0.6-0.1-1 0-0.5 0.1-1.1 0.2-1.7 0.1-0.7 0.3-1.3 0.4-2 0.2-0.7 0.3-1.4 0.5-2.1 0.2-0.7 0.3-1.3 0.5-1.9 0.1-0.2 0.2-0.4 0.3-0.5 0.2-0.1 0.3-0.3 0.6-0.4 0.2-0.1 0.4-0.2 0.6-0.2 0.2 0 0.4-0.1 0.6-0.1 0.3 0 0.6 0.1 0.7 0.2 0.1 0.1 0.2 0.3 0.2 0.5 0 0.2 0 0.4-0.1 0.7 -0.1 0.3-0.2 0.7-0.3 1.1 -0.1 0.4-0.2 0.9-0.4 1.3 -0.1 0.5-0.3 0.9-0.4 1.4 -0.1 0.5-0.2 0.9-0.3 1.4s-0.1 0.9-0.1 1.2c0 0.4 0 0.6 0.1 0.8 0.1 0.2 0.2 0.3 0.5 0.3 0.3 0 0.6-0.1 0.9-0.3 0.3-0.2 0.7-0.4 1-0.7 0.4-0.3 0.7-0.6 1-0.9 0.3-0.3 0.6-0.6 0.9-0.8V26.1zM452.9 14c0-0.2 0-0.4 0.1-0.6 0.1-0.2 0.2-0.4 0.4-0.6 0.2-0.2 0.4-0.4 0.7-0.5 0.3-0.1 0.7-0.2 1.1-0.2 0.3 0 0.5 0 0.8 0.1 0.2 0.1 0.5 0.2 0.6 0.3 0.2 0.1 0.3 0.3 0.4 0.5 0.1 0.2 0.2 0.5 0.2 0.8 0 0.3 0 0.5-0.1 0.8 -0.1 0.2-0.2 0.5-0.4 0.7s-0.4 0.4-0.7 0.5c-0.3 0.1-0.6 0.2-1 0.2 -0.7 0-1.2-0.2-1.5-0.5C453.1 15 452.9 14.6 452.9 14z"
        />
        <path
            className="flagst1"
            d="M460.2 28.6c-0.4 0-0.8-0.2-1.2-0.6 -0.4-0.4-0.7-0.9-0.9-1.5 -0.3-0.6-0.5-1.3-0.6-2.2 -0.2-0.8-0.2-1.7-0.2-2.6 0-0.7 0.1-1.5 0.2-2.3 0.1-0.8 0.2-1.7 0.4-2.5 0.2-0.9 0.4-1.7 0.7-2.6 0.3-0.9 0.6-1.7 0.9-2.5 0.3-0.8 0.7-1.6 1.1-2.3 0.4-0.7 0.8-1.3 1.3-1.8 0.4-0.5 0.9-0.9 1.4-1.2 0.5-0.3 1-0.4 1.5-0.4 0.3 0 0.6 0.1 0.8 0.2 0.2 0.2 0.4 0.4 0.5 0.6s0.2 0.5 0.3 0.8c0.1 0.3 0.1 0.6 0.1 1 0 0.7-0.1 1.5-0.3 2.2 -0.2 0.8-0.4 1.5-0.7 2.3 -0.3 0.8-0.6 1.5-1 2.3s-0.8 1.5-1.2 2.3c-0.4 0.8-0.8 1.5-1.2 2.2 -0.4 0.7-0.8 1.5-1.2 2.2 0 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.3-0.1 0.4 0 0.1-0.1 0.3-0.1 0.5 0 0.2-0.1 0.3-0.1 0.5v0.2c0 0.2 0 0.4 0.1 0.6 0 0.2 0.1 0.4 0.2 0.5 0.1 0.2 0.1 0.3 0.2 0.4 0.1 0.1 0.1 0.1 0.2 0.1 0.1 0 0.3 0 0.5-0.1s0.4-0.1 0.6-0.3c0.2-0.1 0.4-0.2 0.7-0.4 0.2-0.1 0.4-0.3 0.7-0.4 0.5-0.3 1-0.7 1.5-1.1l1 2.5c-0.7 0.5-1.4 0.9-2.1 1.3 -0.3 0.2-0.6 0.3-0.9 0.5 -0.3 0.2-0.6 0.3-1 0.4 -0.3 0.1-0.6 0.2-0.9 0.3C460.7 28.5 460.4 28.6 460.2 28.6zM460.2 19.2c0.4-0.6 0.7-1.3 1.1-2.1 0.4-0.8 0.8-1.6 1.1-2.4 0.4-0.8 0.7-1.7 0.9-2.5 0.3-0.8 0.4-1.6 0.5-2.3 0-0.2 0-0.4 0-0.6 0-0.2 0-0.2-0.1-0.2 -0.2 0-0.5 0.1-0.7 0.4 -0.3 0.3-0.5 0.7-0.8 1.2s-0.5 1.1-0.8 1.7 -0.5 1.4-0.6 2.1 -0.3 1.5-0.4 2.3C460.2 17.7 460.2 18.4 460.2 19.2z"
        />
        <path
            className="flagst1"
            d="M467.1 28.6c-0.4 0-0.8-0.2-1.2-0.6 -0.4-0.4-0.7-0.9-0.9-1.5 -0.3-0.6-0.5-1.3-0.6-2.2 -0.2-0.8-0.2-1.7-0.2-2.6 0-0.7 0.1-1.5 0.2-2.3 0.1-0.8 0.2-1.7 0.4-2.5 0.2-0.9 0.4-1.7 0.7-2.6 0.3-0.9 0.6-1.7 0.9-2.5 0.3-0.8 0.7-1.6 1.1-2.3 0.4-0.7 0.8-1.3 1.3-1.8 0.4-0.5 0.9-0.9 1.4-1.2 0.5-0.3 1-0.4 1.5-0.4 0.3 0 0.6 0.1 0.8 0.2 0.2 0.2 0.4 0.4 0.5 0.6s0.2 0.5 0.3 0.8 0.1 0.6 0.1 1c0 0.7-0.1 1.5-0.3 2.2 -0.2 0.8-0.4 1.5-0.7 2.3 -0.3 0.8-0.6 1.5-1 2.3s-0.8 1.5-1.2 2.3c-0.4 0.8-0.8 1.5-1.2 2.2 -0.4 0.7-0.8 1.5-1.2 2.2 0 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.3-0.1 0.4 0 0.1-0.1 0.3-0.1 0.5 0 0.2-0.1 0.3-0.1 0.5v0.2c0 0.2 0 0.4 0.1 0.6 0 0.2 0.1 0.4 0.2 0.5 0.1 0.2 0.1 0.3 0.2 0.4 0.1 0.1 0.1 0.1 0.2 0.1 0.1 0 0.3 0 0.5-0.1 0.2-0.1 0.4-0.1 0.6-0.3 0.2-0.1 0.4-0.2 0.7-0.4 0.2-0.1 0.4-0.3 0.7-0.4 0.5-0.3 1-0.7 1.5-1.1l1 2.5c-0.7 0.5-1.4 0.9-2.1 1.3 -0.3 0.2-0.6 0.3-0.9 0.5 -0.3 0.2-0.6 0.3-1 0.4 -0.3 0.1-0.6 0.2-0.9 0.3C467.7 28.5 467.4 28.6 467.1 28.6zM467.2 19.2c0.4-0.6 0.7-1.3 1.1-2.1 0.4-0.8 0.8-1.6 1.1-2.4 0.4-0.8 0.7-1.7 0.9-2.5 0.3-0.8 0.4-1.6 0.5-2.3 0-0.2 0-0.4 0-0.6 0-0.2 0-0.2-0.1-0.2 -0.2 0-0.5 0.1-0.7 0.4 -0.3 0.3-0.5 0.7-0.8 1.2 -0.3 0.5-0.5 1.1-0.8 1.7 -0.2 0.7-0.5 1.4-0.6 2.1s-0.3 1.5-0.4 2.3C467.2 17.7 467.2 18.4 467.2 19.2z"
        />
        <path
            className="flagst1"
            d="M475.5 28.6c-0.7 0-1.4-0.1-1.9-0.4 -0.6-0.3-1-0.6-1.4-1.1 -0.4-0.4-0.6-1-0.8-1.6 -0.2-0.6-0.3-1.2-0.3-1.9 0-0.4 0-0.9 0.1-1.4 0.1-0.5 0.2-1 0.4-1.4 0.2-0.5 0.4-0.9 0.7-1.3 0.3-0.4 0.6-0.8 0.9-1.1 0.4-0.3 0.8-0.6 1.2-0.8 0.4-0.2 0.9-0.3 1.5-0.3 0.4 0 0.8 0.1 1.2 0.2 0.4 0.1 0.7 0.3 1 0.6 0.3 0.3 0.5 0.6 0.7 0.9 0.2 0.4 0.2 0.8 0.2 1.2 0 0.5-0.1 1-0.4 1.5 -0.2 0.5-0.6 0.9-1 1.4 -0.4 0.4-0.9 0.8-1.5 1.1 -0.6 0.3-1.2 0.6-1.9 0.8 0.1 0.2 0.2 0.4 0.3 0.5 0.1 0.1 0.2 0.2 0.3 0.3 0.1 0.1 0.2 0.1 0.4 0.2 0.1 0 0.3 0 0.4 0 0.5 0 1-0.1 1.5-0.3 0.5-0.2 1-0.4 1.5-0.7 0.5-0.3 1-0.6 1.4-0.9 0.4-0.3 0.8-0.6 1.1-0.9l1.5 1.6c-0.7 0.7-1.4 1.3-2.2 1.9 -0.3 0.2-0.7 0.5-1.1 0.7 -0.4 0.2-0.8 0.4-1.2 0.6 -0.4 0.2-0.9 0.3-1.3 0.4C476.4 28.5 475.9 28.6 475.5 28.6zM473.9 23.1c0.3 0 0.6-0.1 0.9-0.2 0.3-0.1 0.6-0.3 0.9-0.6 0.3-0.2 0.5-0.5 0.7-0.7 0.2-0.3 0.3-0.5 0.3-0.8 0-0.4-0.1-0.6-0.2-0.9 -0.1-0.2-0.3-0.3-0.5-0.3 -0.3 0-0.6 0.1-0.9 0.2s-0.4 0.3-0.6 0.5c-0.2 0.2-0.3 0.4-0.4 0.7 -0.1 0.3-0.2 0.5-0.2 0.8 -0.1 0.3-0.1 0.5-0.1 0.8C473.9 22.7 473.9 22.9 473.9 23.1z"
        />
        <path
            className="flagst1"
            d="M489.7 18.1c0 0.2 0 0.5-0.1 0.9 0 0.4-0.1 0.8-0.2 1.2 -0.1 0.4-0.2 0.9-0.2 1.3 -0.1 0.5-0.2 0.9-0.2 1.3 -0.1 0.4-0.1 0.7-0.2 1 0 0.3-0.1 0.5-0.1 0.6 0 0.2 0 0.4 0 0.6 0 0.2 0 0.3 0.1 0.5 0 0.1 0.1 0.2 0.2 0.3s0.2 0.1 0.4 0.1c0.2 0 0.4 0 0.6-0.1 0.2-0.1 0.5-0.2 0.8-0.3 0.3-0.1 0.6-0.3 0.8-0.5 0.3-0.2 0.6-0.4 0.8-0.6 0.3-0.2 0.5-0.4 0.7-0.6 0.2-0.2 0.4-0.4 0.5-0.6 0 0.3 0 0.5 0 0.7 0 0.2 0 0.4 0 0.6 0 0.2 0 0.4 0 0.6 0 0.2 0 0.4 0 0.7 -0.2 0.2-0.4 0.4-0.6 0.6 -0.3 0.2-0.5 0.4-0.8 0.6 -0.3 0.2-0.6 0.4-1 0.6 -0.3 0.2-0.7 0.3-1 0.5 -0.4 0.1-0.7 0.2-1 0.3 -0.3 0.1-0.7 0.1-1 0.1 -0.3 0-0.6-0.1-0.8-0.2 -0.2-0.1-0.4-0.3-0.5-0.5 -0.2-0.2-0.3-0.5-0.4-0.8 -0.1-0.3-0.2-0.6-0.3-1 -0.3 0.4-0.6 0.7-0.9 1s-0.6 0.6-1 0.8c-0.3 0.2-0.7 0.4-1 0.5 -0.3 0.1-0.7 0.2-1 0.2 -0.3 0-0.5 0-0.7-0.1 -0.2-0.1-0.4-0.2-0.6-0.4 -0.2-0.2-0.3-0.5-0.4-0.8 -0.1-0.3-0.2-0.7-0.2-1.2 0-0.6 0.1-1.4 0.2-2.3 0.1-0.9 0.3-2 0.5-3.2 0-0.1 0-0.3 0.1-0.5 0-0.2 0.1-0.4 0.2-0.7 0.1-0.2 0.2-0.5 0.3-0.7 0.1-0.2 0.2-0.5 0.4-0.7 0.1-0.2 0.3-0.4 0.5-0.5 0.2-0.1 0.4-0.2 0.7-0.2 0.4 0 0.7 0.1 0.9 0.2 0.2 0.1 0.3 0.2 0.3 0.3 -0.1 0.4-0.1 0.9-0.2 1.4 -0.1 0.5-0.2 1-0.3 1.5 -0.1 0.5-0.2 1-0.2 1.5 -0.1 0.5-0.1 0.9-0.2 1.3 -0.1 0.4-0.1 0.7-0.1 0.9 0 0.2-0.1 0.4-0.1 0.4 0 0.1 0 0.3 0 0.4 0 0.1 0.1 0.2 0.1 0.3 0.1 0.1 0.1 0.2 0.2 0.2 0.1 0.1 0.2 0.1 0.3 0.1 0.2 0 0.3 0 0.5-0.1 0.2-0.1 0.3-0.2 0.5-0.4 0.2-0.2 0.3-0.4 0.4-0.6 0.1-0.2 0.2-0.5 0.3-0.8l1.2-6c0-0.2 0.2-0.3 0.5-0.5 0.3-0.1 0.6-0.2 0.9-0.2 0.4 0 0.7 0.1 0.9 0.2C489.6 17.7 489.7 17.9 489.7 18.1z"
        />
        <path
            className="flagst1"
            d="M495.1 28.6c-0.4 0-0.8-0.2-1.2-0.6 -0.4-0.4-0.7-0.9-0.9-1.5 -0.3-0.6-0.5-1.3-0.6-2.2 -0.2-0.8-0.2-1.7-0.2-2.6 0-0.7 0.1-1.5 0.2-2.3 0.1-0.8 0.2-1.7 0.4-2.5 0.2-0.9 0.4-1.7 0.7-2.6 0.3-0.9 0.6-1.7 0.9-2.5 0.3-0.8 0.7-1.6 1.1-2.3 0.4-0.7 0.8-1.3 1.3-1.8 0.4-0.5 0.9-0.9 1.4-1.2 0.5-0.3 1-0.4 1.5-0.4 0.3 0 0.6 0.1 0.8 0.2 0.2 0.2 0.4 0.4 0.5 0.6s0.2 0.5 0.3 0.8 0.1 0.6 0.1 1c0 0.7-0.1 1.5-0.3 2.2 -0.2 0.8-0.4 1.5-0.7 2.3 -0.3 0.8-0.6 1.5-1 2.3s-0.8 1.5-1.2 2.3c-0.4 0.8-0.8 1.5-1.2 2.2 -0.4 0.7-0.8 1.5-1.2 2.2 0 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.3-0.1 0.4 0 0.1-0.1 0.3-0.1 0.5 0 0.2-0.1 0.3-0.1 0.5v0.2c0 0.2 0 0.4 0.1 0.6 0 0.2 0.1 0.4 0.2 0.5 0.1 0.2 0.1 0.3 0.2 0.4 0.1 0.1 0.1 0.1 0.2 0.1 0.1 0 0.3 0 0.5-0.1 0.2-0.1 0.4-0.1 0.6-0.3 0.2-0.1 0.4-0.2 0.7-0.4 0.2-0.1 0.4-0.3 0.7-0.4 0.5-0.3 1-0.7 1.5-1.1l1 2.5c-0.7 0.5-1.4 0.9-2.1 1.3 -0.3 0.2-0.6 0.3-0.9 0.5 -0.3 0.2-0.6 0.3-1 0.4 -0.3 0.1-0.6 0.2-0.9 0.3C495.7 28.5 495.4 28.6 495.1 28.6zM495.1 19.2c0.4-0.6 0.7-1.3 1.1-2.1 0.4-0.8 0.8-1.6 1.1-2.4 0.4-0.8 0.7-1.7 0.9-2.5 0.3-0.8 0.4-1.6 0.5-2.3 0-0.2 0-0.4 0-0.6 0-0.2 0-0.2-0.1-0.2 -0.2 0-0.5 0.1-0.7 0.4 -0.3 0.3-0.5 0.7-0.8 1.2 -0.3 0.5-0.5 1.1-0.8 1.7 -0.2 0.7-0.5 1.4-0.6 2.1s-0.3 1.5-0.4 2.3C495.2 17.7 495.1 18.4 495.1 19.2z"
        />
        <path
            className="flagst1"
            d="M499.1 24.1c0.4-0.4 0.8-0.7 1.1-0.9 0.3-0.2 0.5-0.5 0.7-0.7 0.2-0.2 0.4-0.4 0.5-0.6 0.2-0.2 0.3-0.5 0.6-0.8 0.2-0.3 0.5-0.6 0.8-1.1 0.3-0.4 0.7-0.9 1.2-1.6 0.1-0.1 0.2-0.3 0.3-0.4 0.1-0.1 0.3-0.3 0.4-0.4 0.2-0.1 0.3-0.2 0.5-0.3 0.2-0.1 0.4-0.1 0.6-0.1 0.4 0 0.7 0 0.9 0.1 0.2 0.1 0.4 0.2 0.4 0.3 0.1 0.1 0.1 0.2 0.2 0.4 0 0.1 0 0.2 0 0.3 0 0.2-0.1 0.4-0.2 0.6 -0.1 0.2-0.3 0.4-0.5 0.7 -0.2 0.2-0.3 0.4-0.5 0.6 -0.2 0.2-0.3 0.3-0.3 0.4 0 0.2 0 0.5 0.1 0.7 0 0.2 0.1 0.4 0.1 0.6 0.1 0.2 0.1 0.4 0.2 0.6 0.1 0.2 0.1 0.5 0.2 0.7 0.1 0.3 0.1 0.6 0.1 1 0 0.4 0.1 0.8 0.1 1.3 0.3-0.2 0.6-0.4 0.9-0.5 0.3-0.2 0.7-0.3 1-0.5 0.4-0.2 0.7-0.3 1.1-0.5 0.4-0.2 0.7-0.4 1.1-0.7l0 2.6c-0.5 0.4-1 0.7-1.7 1.1 -0.6 0.3-1.3 0.6-2 0.9s-1.4 0.4-2.1 0.6c-0.7 0.1-1.4 0.2-2 0.2 -0.5 0-0.9 0-1.3-0.1 -0.4-0.1-0.7-0.2-1-0.4 -0.3-0.2-0.5-0.4-0.7-0.7 -0.2-0.3-0.3-0.7-0.3-1.1 -0.1 0-0.2 0-0.3 0 -0.1 0-0.2 0-0.3 0 -0.1 0-0.2 0-0.4 0 -0.1 0-0.2 0-0.3-0.1s-0.1-0.1-0.2-0.2c0-0.1-0.1-0.3-0.1-0.5 0-0.2 0-0.4 0.1-0.5 0.1-0.2 0.2-0.3 0.3-0.4s0.2-0.2 0.4-0.3C498.9 24.2 499 24.1 499.1 24.1zM500.6 25.6c0.1 0 0.2 0.1 0.3 0.2 0.1 0.1 0.2 0.2 0.4 0.4s0.3 0.3 0.5 0.4c0.2 0.1 0.4 0.2 0.7 0.2 0.3 0 0.6-0.1 0.8-0.2 0.2-0.1 0.4-0.2 0.5-0.4 0.1-0.2 0.2-0.4 0.2-0.6 0-0.2 0.1-0.5 0.1-0.7 0-0.2 0-0.4 0-0.6 0-0.2-0.1-0.4-0.1-0.6s-0.1-0.4-0.1-0.6c-0.1-0.2-0.1-0.3-0.1-0.5L500.6 25.6z"
        />
        <path
            className="flagst1"
            d="M516.2 26.3c0 0 0 0.1 0 0.2 0 0.1 0 0.3-0.1 0.4 0 0.2-0.1 0.3-0.2 0.5 -0.1 0.2-0.2 0.4-0.4 0.5 -0.2 0.2-0.4 0.3-0.6 0.4 -0.2 0.1-0.6 0.2-0.9 0.2 -0.3 0-0.6 0-0.8-0.1 -0.2-0.1-0.4-0.2-0.6-0.3 -0.2-0.2-0.3-0.3-0.4-0.6 -0.1-0.2-0.1-0.5-0.1-0.9 0-0.3 0-0.6 0.1-0.8 0.1-0.3 0.2-0.5 0.4-0.7 0.2-0.2 0.4-0.4 0.7-0.5 0.3-0.1 0.6-0.2 1-0.2 0.6 0 1.1 0.2 1.5 0.5C516 25.2 516.2 25.7 516.2 26.3z"
        />
        <path
            className="flagst1"
            d="M522 28.6c-0.7 0-1.3-0.1-1.9-0.4 -0.5-0.3-1-0.6-1.4-1.1 -0.4-0.4-0.6-1-0.8-1.5 -0.2-0.6-0.3-1.2-0.3-1.8 0-0.5 0-0.9 0.1-1.4 0.1-0.5 0.2-1 0.4-1.4 0.2-0.5 0.4-0.9 0.7-1.4 0.3-0.4 0.6-0.8 0.9-1.1 0.4-0.3 0.8-0.6 1.2-0.8 0.4-0.2 0.9-0.3 1.4-0.3 0.4 0 0.9 0.1 1.2 0.2 0.4 0.1 0.7 0.3 1 0.6 0.3 0.2 0.5 0.5 0.6 0.9 0.2 0.3 0.2 0.7 0.2 1.1 0 0.3 0 0.5-0.1 0.8 -0.1 0.3-0.2 0.5-0.3 0.7 -0.1 0.2-0.3 0.4-0.5 0.5 -0.2 0.1-0.4 0.2-0.7 0.2 -0.4 0-0.6-0.1-0.7-0.3 -0.1-0.2-0.2-0.5-0.2-0.8 0-0.1 0-0.3 0-0.4 0-0.2 0-0.3 0-0.4 0-0.2 0-0.3-0.1-0.5 0-0.1-0.1-0.2-0.3-0.2 -0.3 0-0.6 0.1-0.8 0.2 -0.2 0.2-0.4 0.4-0.6 0.6 -0.2 0.2-0.3 0.5-0.4 0.8 -0.1 0.3-0.2 0.6-0.2 0.9 -0.1 0.3-0.1 0.6-0.1 0.9 0 0.3 0 0.5 0 0.7 0 0.3 0 0.6 0.1 0.9 0.1 0.3 0.1 0.6 0.3 0.8 0.1 0.3 0.3 0.5 0.6 0.6 0.2 0.2 0.6 0.3 0.9 0.3 0.4 0 0.8-0.1 1.2-0.3 0.5-0.2 0.9-0.5 1.4-0.9 0.5-0.4 0.9-0.7 1.3-1.2 0.4-0.4 0.8-0.8 1.1-1.2l0.8 1.4c-0.6 0.8-1.2 1.6-1.9 2.2 -0.3 0.3-0.6 0.6-0.9 0.8 -0.3 0.3-0.7 0.5-1.1 0.7 -0.4 0.2-0.8 0.4-1.2 0.5C522.8 28.5 522.4 28.6 522 28.6z"
        />
        <path
            className="flagst1"
            d="M534.4 19.8c0.2 0.5 0.4 0.9 0.5 1.4 0.1 0.5 0.2 1 0.2 1.4 0 0.5-0.1 0.9-0.2 1.4 -0.1 0.5-0.2 0.9-0.4 1.4s-0.4 0.8-0.7 1.2c-0.3 0.4-0.6 0.7-0.9 1 -0.4 0.3-0.7 0.5-1.2 0.7 -0.4 0.2-0.9 0.2-1.3 0.2 -0.7 0-1.3-0.2-1.8-0.5 -0.5-0.3-0.9-0.7-1.2-1.2 -0.3-0.5-0.5-1-0.7-1.6 -0.1-0.6-0.2-1.2-0.2-1.9 0-0.9 0.1-1.7 0.4-2.4 0.3-0.7 0.6-1.4 1.1-1.9 0.5-0.6 1.1-1 1.8-1.3 0.7-0.3 1.5-0.5 2.3-0.5 0.7 0 1.4 0.1 2.1 0.3 0.6 0.2 1.3 0.5 1.8 0.9 0.6 0.4 1.1 0.8 1.6 1.3 0.5 0.5 0.9 1 1.4 1.5l-0.2 1.7c-0.2-0.3-0.5-0.6-0.9-0.9 -0.4-0.3-0.7-0.6-1.1-1 -0.4-0.3-0.8-0.6-1.2-0.9 -0.4-0.3-0.7-0.5-1-0.7L534.4 19.8zM530.8 26.3c0.3 0 0.5-0.1 0.8-0.4 0.2-0.3 0.5-0.6 0.7-1 0.2-0.4 0.3-0.9 0.5-1.4 0.1-0.5 0.2-1 0.2-1.4 0-0.4 0-0.7-0.1-1s-0.1-0.6-0.2-0.8c-0.1-0.2-0.2-0.4-0.4-0.5 -0.2-0.1-0.4-0.2-0.6-0.2 -0.3 0-0.6 0.1-0.9 0.4 -0.3 0.3-0.5 0.6-0.8 1 -0.2 0.4-0.4 0.9-0.5 1.4 -0.1 0.5-0.2 1-0.2 1.5 0 0.3 0 0.6 0.1 0.9 0.1 0.3 0.2 0.5 0.3 0.8 0.1 0.2 0.3 0.4 0.5 0.5C530.2 26.2 530.5 26.3 530.8 26.3z"
        />
        <path
            className="flagst1"
            d="M544.9 19.8c0.2 0.5 0.4 0.9 0.5 1.4 0.1 0.5 0.2 1 0.2 1.4 0 0.5-0.1 0.9-0.2 1.4 -0.1 0.5-0.2 0.9-0.4 1.4s-0.4 0.8-0.7 1.2c-0.3 0.4-0.6 0.7-0.9 1 -0.4 0.3-0.7 0.5-1.2 0.7 -0.4 0.2-0.9 0.2-1.3 0.2 -0.7 0-1.3-0.2-1.8-0.5 -0.5-0.3-0.9-0.7-1.2-1.2 -0.3-0.5-0.5-1-0.7-1.6 -0.1-0.6-0.2-1.2-0.2-1.9 0-0.9 0.1-1.7 0.4-2.4 0.3-0.7 0.6-1.4 1.1-1.9 0.5-0.6 1.1-1 1.8-1.3 0.7-0.3 1.5-0.5 2.3-0.5 0.7 0 1.4 0.1 2.1 0.3 0.6 0.2 1.3 0.5 1.8 0.9 0.6 0.4 1.1 0.8 1.6 1.3s0.9 1 1.4 1.5l-0.2 1.7c-0.2-0.3-0.5-0.6-0.9-0.9 -0.4-0.3-0.7-0.6-1.1-1 -0.4-0.3-0.8-0.6-1.2-0.9 -0.4-0.3-0.7-0.5-1-0.7L544.9 19.8zM541.2 26.3c0.3 0 0.5-0.1 0.8-0.4 0.2-0.3 0.5-0.6 0.7-1 0.2-0.4 0.3-0.9 0.5-1.4 0.1-0.5 0.2-1 0.2-1.4 0-0.4 0-0.7-0.1-1 -0.1-0.3-0.1-0.6-0.2-0.8 -0.1-0.2-0.2-0.4-0.4-0.5 -0.2-0.1-0.4-0.2-0.6-0.2 -0.3 0-0.6 0.1-0.9 0.4 -0.3 0.3-0.5 0.6-0.8 1 -0.2 0.4-0.4 0.9-0.5 1.4 -0.1 0.5-0.2 1-0.2 1.5 0 0.3 0 0.6 0.1 0.9 0.1 0.3 0.2 0.5 0.3 0.8 0.1 0.2 0.3 0.4 0.5 0.5C540.7 26.2 540.9 26.3 541.2 26.3z"
        />
        <path
            className="flagst1"
            d="M552.9 26.5c0.8 0 1.5-0.1 2.2-0.2 0.6-0.2 1.2-0.4 1.8-0.6 0.5-0.3 1-0.6 1.4-0.9 0.4-0.4 0.8-0.7 1.2-1.1l0.1 2.7c-0.2 0.3-0.6 0.6-0.9 0.9 -0.4 0.3-0.7 0.5-1.2 0.8 -0.4 0.2-0.9 0.4-1.3 0.5 -0.5 0.1-0.9 0.2-1.4 0.2 -0.1 0-0.1 0-0.2 0 -0.1 0-0.2 0-0.4-0.1 -0.2 0-0.5-0.1-0.9-0.2 -0.4-0.1-0.9-0.1-1.5-0.2v0.2c0 1.4-0.1 2.7-0.4 3.9 -0.2 1.2-0.6 2.2-1 3 -0.4 0.8-0.9 1.5-1.4 1.9 -0.5 0.4-1.1 0.7-1.6 0.7 -0.4 0-0.8-0.1-1.1-0.3 -0.3-0.2-0.5-0.5-0.7-0.9 -0.2-0.4-0.3-0.8-0.4-1.3 -0.1-0.5-0.1-1-0.1-1.6 0-0.3 0.1-0.7 0.2-1.1 0.1-0.4 0.2-0.8 0.4-1.3 0.2-0.4 0.4-0.9 0.6-1.3 0.2-0.5 0.4-0.9 0.7-1.3 0.5-1 1.1-2 1.8-3.1 0.1-0.6 0.2-1.2 0.3-1.9 0.1-0.6 0.2-1.3 0.3-1.9 0.1-0.6 0.3-1.2 0.5-1.7 0.2-0.5 0.5-1 0.8-1.4 0.3-0.4 0.7-0.7 1.2-0.9 0.5-0.2 1-0.4 1.6-0.4 0.5 0 0.9 0.1 1.3 0.2 0.4 0.1 0.8 0.3 1.1 0.6 0.3 0.3 0.6 0.7 0.7 1.1 0.2 0.5 0.3 1 0.3 1.7 0 0.5-0.1 1-0.2 1.5 -0.2 0.5-0.4 1-0.7 1.4 -0.3 0.5-0.8 0.9-1.3 1.3 -0.5 0.4-1.1 0.7-1.8 1.1L552.9 26.5zM547.4 33.7c0 0.1 0 0.2 0 0.3 0 0.1 0.1 0.3 0.1 0.4 0.1 0.1 0.1 0.3 0.2 0.4 0.1 0.1 0.2 0.2 0.4 0.2 0.1 0 0.2-0.1 0.3-0.2 0.1-0.1 0.2-0.3 0.2-0.6s0.1-0.5 0.1-0.8c0-0.3 0-0.6 0.1-0.9 0-0.3 0-0.6 0-0.9 0-0.3 0-0.6 0-0.8 0-0.4 0-0.8 0.1-1.1 0-0.3 0-0.5 0-0.7 0-0.2 0-0.4 0-0.6 -0.1 0.3-0.3 0.6-0.4 0.9 -0.1 0.3-0.3 0.7-0.4 1.1 -0.1 0.4-0.2 0.7-0.3 1.1 -0.1 0.4-0.2 0.7-0.3 1 -0.1 0.3-0.1 0.6-0.2 0.8C547.4 33.5 547.4 33.6 547.4 33.7zM551.4 25.3c0.5-0.2 0.9-0.5 1.2-0.8 0.3-0.3 0.6-0.6 0.9-0.9 0.2-0.3 0.4-0.7 0.6-1 0.2-0.4 0.3-0.7 0.4-1.1 0-0.2 0.1-0.4 0.1-0.6 0-0.2 0-0.4-0.1-0.7 -0.1-0.2-0.2-0.4-0.3-0.5 -0.1-0.1-0.3-0.2-0.6-0.2 -0.3 0-0.5 0.1-0.8 0.2 -0.2 0.2-0.4 0.4-0.6 0.7 -0.2 0.3-0.3 0.6-0.4 1 -0.1 0.4-0.2 0.8-0.3 1.2 -0.1 0.4-0.1 0.9-0.1 1.3C551.5 24.4 551.4 24.8 551.4 25.3z"
        />
        <path
            className="flagst1"
            d="M434.9 23.5c0.1 0 0.2 0 0.3 0 0.1 0 0.2 0.1 0.3 0.1 0.1 0 0.2 0.1 0.2 0.2 0.1 0.1 0.1 0.2 0.1 0.3 0 0.1 0 0.2 0 0.4 0 0.1-0.1 0.2-0.2 0.3 -0.1 0.1-0.2 0.2-0.3 0.2 -0.1 0.1-0.3 0.1-0.6 0.1H431c-0.2 0-0.3 0-0.4-0.1 -0.1-0.1-0.2-0.1-0.3-0.2 -0.1-0.1-0.1-0.2-0.1-0.3 0-0.1 0-0.2 0-0.3 0-0.1 0-0.2 0-0.2 0-0.1 0.1-0.2 0.1-0.2 0.1-0.1 0.1-0.1 0.3-0.2 0.1 0 0.3-0.1 0.5-0.1H434.9z"
        />
    </svg>
);

const HelpButton = ({Image, url, title}) => (
    <a
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        className="help__circle"
        title={title}
    >
        <Image alt={"Help button"}/>
    </a>
);

const Logo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={150}
        height={150}
        viewBox="0 0 300 300"
    >
        <style jsx>
            {`
                .logost0 {
                    fill: #ffffff;
                }

                .logost1 {
                    fill: #afe5e5;
                }

                .logost2 {
                    opacity: 0.2;
                    fill: #1d1e1c;
                }

                .logost3 {
                    fill: #1d1e1c;
                }

                .logost4 {
                    fill: #38a9b4;
                }
            `}
        </style>
        <path
            className="logost0"
            d="M35.6 214.6l5.4 4.4c1.6 1.3 2.4 2.4 2.6 4.4v15.7c0 2-1.6 3.6-3.6 3.6 -2 0-3.6-1.6-3.6-3.6v-3.5l-7.2-6.7v10.2c0 2-1.6 3.6-3.6 3.6 -2 0-3.6-1.6-3.6-3.6v-15.7c0.2-2 1.1-3.1 2.6-4.4l5.3-4.4C32 213 33.6 212.9 35.6 214.6zM36.4 228.4v-7.5h-7.2v7.5H36.4z"
        />
        <path
            className="logost0"
            d="M54.4 235.4v3.5c0 2-1.5 3.7-3.5 3.7 -2 0-3.6-1.7-3.6-3.7 0-6.4 0-12.8 0-19.2 0-3.3 2.8-6.1 6.1-6.1 1.9 0 3.5 0 5.5 0 1.7 0 3.1 0.6 4.3 1.7l4 4c2.6 2.5 2.1 8.6-0.4 11l-3.6 3.4c-1.2 1.2-2.6 1.7-4.3 1.7H54.4zM61.3 228.2v-7.4l-6.9-0.1v7.5H61.3z"
        />
        <path
            className="logost0"
            d="M71.3 239.4v-13.3c0-1.8 1.5-3.4 3.6-3.4 2.1 0 3.7 1.5 3.7 3.2v13.5c0 1.8-1.6 3.3-3.7 3.3C72.9 242.7 71.3 241.2 71.3 239.4zM78.5 221h-7v-7.3h7V221z"
        />
        <path
            className="logost0"
            d="M103.8 235.4v3.5c0 2-1.5 3.7-3.5 3.7 -2 0-3.6-1.7-3.6-3.7 0-6.4 0-12.8 0-19.2 0-3.3 2.8-6.1 6.1-6.1 1.9 0 3.5 0 5.5 0 1.7 0 3.1 0.6 4.3 1.7l4 4c2.6 2.5 2.1 8.6-0.4 11l-3.6 3.4c-1.2 1.2-2.6 1.7-4.3 1.7H103.8zM110.8 228.2v-7.4l-6.9-0.1v7.5H110.8z"
        />
        <path
            className="logost0"
            d="M120.4 236.3c0-6.4 0-12.8 0-19.3 0-1.9 1.7-3.6 3.6-3.6 2.1 0 3.7 1.6 3.7 3.6v18.3c3.6 0 2.6-0.1 6.2-0.1 4.8 0 4.8 7.3 0 7.3 -3.3 0-5.2 0-7.2 0C123.2 242.5 120.4 239.7 120.4 236.3z"
        />
        <path
            className="logost0"
            d="M153 214.6l5.4 4.4c1.6 1.3 2.4 2.4 2.6 4.4v15.7c0 2-1.6 3.6-3.6 3.6 -2 0-3.6-1.6-3.6-3.6v-3.5l-7.2-6.7v10.2c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6v-15.7c0.2-2 1.1-3.1 2.6-4.4l5.3-4.4C149.4 213 150.9 212.9 153 214.6zM153.8 228.4v-7.5h-7.2v7.5H153.8z"
        />
        <path
            className="logost0"
            d="M178.1 213.6c4.7 0 4.7 7.2 0 7.2 -3.6 0 0.5 0-3.1 0 0 6.1 0 12.3 0 18.3 0 4.9-7.2 4.9-7.2 0 0-6 0-12.2 0-18.3 -3.6 0 0.5 0-3.1 0 -4.7 0-4.7-7.2 0-7.2C169.1 213.6 173.6 213.6 178.1 213.6z"
        />
        <path
            className="logost0"
            d="M190.8 220.8c0 1.3 0 3.6 0 4.8 2.7 0 3.8 0 6.5 0 1.9 0 3.6 1.6 3.6 3.6 0 1.9-1.7 3.6-3.7 3.6 -2.6 0-3.7 0-6.4 0 0 2.4 0 3.9 0 6.3 0 4.7-7.2 4.7-7.2 0 0-6.5 0-13 0-19.5 0-3.4 2.7-6.1 6.1-6.1 4 0 5.2 0 9.2 0 2 0 3.6 1.6 3.6 3.6 0 2-1.7 3.7-3.6 3.7H190.8z"
        />
        <path
            className="logost0"
            d="M210.9 213.6h8.3c3.3 0 6.1 2.7 6.1 6.1v16.6c0 3-2.9 6.1-5.9 6.1h-8.6c-3.1 0-6.1-3.1-6.1-6.1v-16.6C204.7 216.2 207.6 213.6 210.9 213.6zM218.1 220.9h-6.2v14.5h6.2V220.9z"
        />
        <path
            className="logost0"
            d="M245.6 230.8c2.6 1.6 3.5 3.6 3.5 6.2v2.1c0 2-1.6 3.6-3.5 3.6 -2 0-3.6-1.7-3.6-3.6v-2l-7.1-8.6c0 4.5 0 6.2 0 10.6 0 2-1.6 3.6-3.6 3.6 -2 0-3.6-1.6-3.6-3.6 0-7.2 0-14.5 0-21.8 0-2 1.6-3.6 3.6-3.6 2.7 0 5.4 0 8.1 0 1.7 0 3.1 0.6 4.3 1.8l3.5 3.4c1.2 1.2 1.9 2.7 1.9 4.5 0 0.5 0 1.1 0 1.6C249.2 227.7 247.9 229.6 245.6 230.8zM234.9 220.8v6.9h7.1c0-2.3 0-4.6 0-6.9H234.9z"
        />
        <path
            className="logost0"
            d="M264.1 214.7l3.1 3.3 3.1-3.3c1.7-1.8 4.2-1.8 5.8 0l4.2 4.4c1.3 1.4 2.4 2.4 2.6 4.4v15.7c0 4.7-7.3 4.7-7.3 0 0-6.1 0-12.2 0-18.3h-4.8c0 6.1 0 12.2 0 18.3 0 4.8-7.2 4.8-7.2 0 0-6.1 0-12.2 0-18.3h-4.8c0 6.1 0 12.2 0 18.3 0 4.7-7.3 4.7-7.3 0v-15.7c0.1-2 1.2-2.9 2.6-4.4l4.2-4.4C260 212.9 262.5 212.9 264.1 214.7z"
        />
        <circle className="logost1" cx="148.5" cy="122.7" r="70.1"/>
        <ellipse className="logost2" cx="131.8" cy="147.2" rx="9.3" ry="2.3"/>
        <ellipse className="logost2" cx="112.5" cy="146.7" rx="9.3" ry="2.3"/>
        <ellipse className="logost2" cx="117.1" cy="160.5" rx="9.3" ry="2.3"/>
        <ellipse className="logost2" cx="99.5" cy="153.9" rx="9.3" ry="2.3"/>
        <polygon
            className="logost3"
            points="121.6 146 119.9 146 119.9 108.6 136.4 117.5 135.6 119 121.6 111.5 "
        />
        <polygon
            className="logost3"
            points="108.7 153.4 107 153.1 111.7 116 136.7 119.7 136.4 121.4 113.2 117.9 "
        />
        <polygon
            className="logost3"
            points="124.5 158.6 123.7 124.9 135.8 121.4 136.3 123.1 125.5 126.2 126.2 158.5 "
        />
        <polygon
            className="logost3"
            points="138 144.5 132.4 127.8 140.3 125.9 140.7 127.5 134.6 129 139.6 143.9 "
        />
        <path
            className="logost3"
            d="M138.1 144.3c0 0-1.6-2.8-4.1-1 -2.5 1.8-1.1 4.2-1.1 4.2s0.8 0.8 3.6 0.8 3.4 0 4-0.6c0.5-0.6-1.2-5.1-1.2-5.1L138.1 144.3z"
        />
        <path
            className="logost3"
            d="M106.2 150.5c0 0-2.6-3.9-6.1-1.4 -3.5 2.5-1.5 5.9-1.5 5.9s1.1 0.8 5 0.8c5 0 4.9-1.5 5.3-2.5 0.6-1.7-1.3-5-1.3-5L106.2 150.5z"
        />
        <path
            className="logost3"
            d="M119.7 144.2c0 0-3.5-4.9-6.9-2.4 -3.5 2.5-1.5 5.9-1.5 5.9s1.1 0.8 5 0.8c5 0 5.3-1 5.6-2 0.6-1.7-1.6-5.5-1.6-5.5L119.7 144.2z"
        />
        <path
            className="logost3"
            d="M124.4 157.5c0 0-3.1-4.8-6.6-2.3 -3.5 2.5-1.5 5.9-1.5 5.9s1.1 1 5 1c5 0 5.1-1.6 5.1-2.7 0.1-5.4-1.8-5-1.8-5L124.4 157.5z"
        />
        <polygon
            className="logost3"
            points="182 146.2 183.7 146.2 183.7 108.8 167.2 117.7 168 119.2 182 111.7 "
        />
        <polygon
            className="logost3"
            points="194.9 153.6 196.6 153.4 191.9 116.2 166.9 120 167.2 121.6 190.4 118.2 "
        />
        <polygon
            className="logost3"
            points="179.1 158.8 179.9 125.2 167.8 121.7 167.3 123.3 178.1 126.4 177.4 158.8 "
        />
        <polygon
            className="logost3"
            points="165.6 144.7 171.2 128 163.3 126.1 162.9 127.8 169 129.2 164 144.1 "
        />
        <path
            className="logost3"
            d="M165.5 144.5c0 0 1.6-2.8 4.1-1 2.5 1.8 1.1 4.2 1.1 4.2s-0.8 0.8-3.6 0.8c-2.8 0.1-3.4 0-4-0.6 -0.5-0.6 1.2-5.1 1.2-5.1L165.5 144.5z"
        />
        <path
            className="logost3"
            d="M197.3 150.7c0 0 2.6-3.9 6.1-1.4 3.5 2.5 1.5 5.9 1.5 5.9s-1.1 0.8-5 0.8c-5 0-4.9-1.5-5.3-2.5 -0.6-1.7 1.3-5 1.3-5L197.3 150.7z"
        />
        <path
            className="logost3"
            d="M183.9 144.5c0 0 3.5-4.9 6.9-2.4 3.5 2.5 1.5 5.9 1.5 5.9s-1.1 0.8-5 0.8c-5 0-5.3-1-5.6-2 -0.6-1.7 1.6-5.5 1.6-5.5L183.9 144.5z"
        />
        <path
            className="logost3"
            d="M179.2 157.7c0 0 3.1-4.8 6.6-2.3 3.5 2.5 1.5 5.9 1.5 5.9s-1.1 1-5 1c-5 0-5.1-1.6-5.1-2.7 -0.1-5.4 1.8-5 1.8-5L179.2 157.7z"
        />
        <path
            className="logost4"
            d="M170.8 115.1c0 10.3-8.2 15.7-18.3 15.7 -10.1 0-17.8-5.4-17.8-15.7s7.7-13.8 17.8-13.8C162.6 101.3 170.8 104.9 170.8 115.1z"
        />
        <path
            className="logost3"
            d="M152.3 131.6c-5.3 0-9.9-1.4-13.2-4.2 -3.5-2.9-5.4-7.2-5.4-12.3 0-9.6 6.4-14.7 18.6-14.7 12.3 0 19.1 5.2 19.1 14.7 0 5.1-2 9.4-5.7 12.4C162.3 130.2 157.6 131.6 152.3 131.6zM152.3 102.2c-11.2 0-16.9 4.4-16.9 13 0 9.2 6.5 14.8 16.9 14.8 10.6 0 17.4-5.8 17.4-14.8C169.7 104.4 160.2 102.2 152.3 102.2z"
        />
        <ellipse
            className="logost0"
            cx="145.6"
            cy="104.2"
            rx="11.4"
            ry="11.8"
        />
        <path
            className="logost3"
            d="M145.4 116.6c-6.6 0-12-5.5-12-12.4 0-6.8 5.4-12.4 12-12.4 6.6 0 12 5.5 12 12.4C157.4 111 152 116.6 145.4 116.6zM145.4 93c-6 0-10.8 5-10.8 11.2 0 6.2 4.8 11.2 10.8 11.2s10.8-5 10.8-11.2C156.2 98.1 151.3 93 145.4 93z"
        />
        <ellipse className="logost0" cx="162.6" cy="106.1" rx="9.4" ry="9.2"/>
        <path
            className="logost3"
            d="M162.4 116c-5.5 0-10-4.4-10-9.8 0-5.4 4.5-9.8 10-9.8s10 4.4 10 9.8C172.4 111.6 167.9 116 162.4 116zM162.4 97.5c-4.9 0-8.8 3.9-8.8 8.6 0 4.8 3.9 8.6 8.8 8.6 4.9 0 8.8-3.9 8.8-8.6C171.2 101.4 167.2 97.5 162.4 97.5z"
        />
        <circle className="logost3" cx="146.3" cy="104.8" r="5.2"/>
        <circle className="logost0" cx="149.2" cy={104} r="1.4"/>
        <ellipse className="logost3" cx="163.4" cy="106.7" rx="4.3" ry="4.1"/>
        <circle className="logost0" cx="162.5" cy={106} r="1.2"/>
        <ellipse className="logost2" cx={172} cy="147.5" rx="9.3" ry="2.3"/>
        <ellipse className="logost2" cx="191.2" cy={147} rx="9.3" ry="2.3"/>
        <ellipse className="logost2" cx="186.6" cy="160.8" rx="9.3" ry="2.3"/>
        <ellipse className="logost2" cx="204.3" cy="154.2" rx="9.3" ry="2.3"/>
    </svg>
);

const Slack = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 120 120"
    >
        <path
            d="M74.8 17.3c-1.5-4.6-6.4-7.1-10.9-5.6 -4.6 1.5-7.1 6.4-5.6 10.9l22.5 69.1c1.5 4.3 6.1 6.7 10.6 5.4 4.6-1.3 7.4-6.2 5.9-10.7L74.8 17.3"
            fill="#DFA22F"
        />
        <path
            d="M40 28.6c-1.5-4.6-6.4-7.1-10.9-5.6 -4.6 1.5-7.1 6.4-5.6 10.9l22.5 69.1c1.5 4.3 6.1 6.7 10.6 5.4 4.6-1.3 7.4-6.2 5.9-10.7L40 28.6"
            fill="#3CB187"
        />
        <path
            d="M103 74.5c4.6-1.5 7.1-6.4 5.6-10.9 -1.5-4.6-6.4-7.1-10.9-5.6L28.6 80.4c-4.3 1.5-6.7 6.1-5.4 10.6 1.3 4.6 6.2 7.4 10.8 5.9L103 74.5"
            fill="#CE1E5B"
        />
        <path d="M43 94l16.5-5.4 -5.4-16.5L37.6 77.5 43 94" fill="#392538"/>
        <path
            d="M77.8 82.7c6.2-2 12-3.9 16.5-5.4L88.9 60.8 72.4 66.2 77.8 82.7"
            fill="#BB242A"
        />
        <path
            d="M91.7 39.7c4.6-1.5 7.1-6.4 5.6-10.9 -1.5-4.6-6.4-7.1-10.9-5.6L17.3 45.6c-4.3 1.5-6.7 6.1-5.4 10.6 1.3 4.6 6.2 7.4 10.8 5.9L91.7 39.7"
            fill="#72C5CD"
        />
        <path
            d="M31.7 59.2c4.5-1.5 10.3-3.3 16.5-5.4 -2-6.2-3.9-12-5.4-16.5l-16.5 5.4L31.7 59.2"
            fill="#248C73"
        />
        <path
            d="M66.5 47.9l16.5-5.4c-1.8-5.5-3.6-11-5.4-16.5l-16.5 5.4L66.5 47.9"
            fill="#62803A"
        />
    </svg>
);

const Sto = () => (
    <svg
        width={25}
        height={25}
        viewBox="0 0 120 120"
    >
        <style jsx>
            {`
                .stost0 {
                    fill: #bcbbbb;
                }

                .stost1 {
                    fill: #f48023;
                }
            `}
        </style>
        <polygon
            className="stost0"
            points="84.4,93.8 84.4,70.6 92.1,70.6 92.1,101.5 22.6,101.5 22.6,70.6 30.3,70.6 30.3,93.8 "
        />
        <path
            className="stost1"
            d="M38.8,68.4l37.8,7.9l1.6-7.6l-37.8-7.9L38.8,68.4z M43.8,50.4l35,16.3l3.2-7l-35-16.4L43.8,50.4z M53.5,33.2 l29.7,24.7l4.9-5.9L58.4,27.3L53.5,33.2z M72.7,14.9l-6.2,4.6l23,31l6.2-4.6L72.7,14.9z M38,86h38.6v-7.7H38V86z"
        />
    </svg>
);

const WebbyWelcome = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="400"
        height="400"
        viewBox="0 0 300 300"
    >
        <style jsx>
            {`
                .webbyWelcome {
                    position: relative;
                }

                .webbyWelcome0 {
                    fill: #1d1e1c;
                }

                .webbyWelcome1 {
                    fill: #38a9b4;
                }

                .webbyWelcome2 {
                    fill: #ffffff;
                }

                .webbyWelcome3 {
                    opacity: 0.12;
                    fill: #020202;
                }
            `}
        </style>
        <polygon
            className="webbyWelcome0"
            points="266.4 174.5 271.7 174.9 280.3 126.4 202.1 122 201.9 127.2 274.7 131.4 "
        />
        <path
            className="webbyWelcome0"
            d="M148.7 73l3.1-3.5 27.2 32.4 -15.5 26.3c-1.2 1.1-3 0.8-3.9-0.5l-0.5-0.7c-0.7-1.1-0.5-2.6 0.5-3.4l13.5-21.3L148.7 73z"
        />
        <path
            className="webbyWelcome0"
            d="M150.6 75.2c0 0 12.1-14.4 8.7-21s-4.8-6.1-9.7-5.3c-4.9 0.8-8 3.9-7.3 9.5C143 63.9 145.1 69.7 150.6 75.2z"
        />
        <path
            className="webbyWelcome0"
            d="M142.4 73l-3.1-3.5 -27.2 32.4 15.5 25c1.2 1.1 3 0.8 3.9-0.5l0.5-0.7c0.7-1.1 0.5-2.6-0.5-3.4l-13.5-19.9L142.4 73z"
        />
        <path
            className="webbyWelcome0"
            d="M140.5 75.2c0 0-12.1-14.4-8.7-21 3.3-6.6 4.8-6.1 9.7-5.3s8 3.9 7.3 9.5C148.1 63.9 146 69.7 140.5 75.2z"
        />
        <polygon
            className="webbyWelcome0"
            points="152.2 34 155.2 30.5 214.6 101.2 177 136.4 173.5 133.3 208 101.6 "
        />
        <path
            className="webbyWelcome0"
            d="M154.5 36c0 0 11.7-18 7-25s-6.3-6.3-11.7-4.7 -8.6 5.5-7 11.7S147.4 30.6 154.5 36z"
        />
        <polygon
            className="webbyWelcome0"
            points="139 34 135.9 30.5 76.5 101.2 114.2 136.4 117.6 133.3 83.2 101.6 "
        />
        <path
            className="webbyWelcome0"
            d="M136.7 36c0 0-11.7-18-7-25 4.7-7 6.3-6.3 11.7-4.7 5.5 1.6 8.6 5.5 7 11.7C146.8 24.3 143.7 30.6 136.7 36z"
        />
        <polygon
            className="webbyWelcome0"
            points="136.6 271 122 176.6 161.1 159.1 160.6 164.3 127.9 179.6 141.8 271 "
        />
        <path
            className="webbyWelcome0"
            d="M132 279.3c0 0-6.3 8.9 2.6 14.1 8.9 5.2 14.5-2.6 14.5-2.6s1.2-3.6-2.3-12.2c-3.6-8.6-4.7-10.5-7.3-11.3C136.9 266.5 132 279.3 132 279.3z"
        />
        <polygon
            className="webbyWelcome0"
            points="174.6 271 189.2 176.6 150.1 159.1 150.6 164.3 183.3 179.6 169.4 271 "
        />
        <path
            className="webbyWelcome0"
            d="M179.2 279.3c0 0 6.3 8.9-2.6 14.1 -8.9 5.2-14.5-2.6-14.5-2.6s-1.2-3.6 2.3-12.2c3.6-8.6 4.7-10.5 7.3-11.3C174.3 266.5 179.2 279.3 179.2 279.3z"
        />
        <path
            className="webbyWelcome1"
            d="M203.1 155.6c0 28.1-24.5 42.9-54.7 42.9s-53.2-14.8-53.2-42.9 23-48.7 53.2-48.7S203.1 127.5 203.1 155.6z"
        />
        <path
            className="webbyWelcome0"
            d="M147.7 200.8c-16 0-29.6-4-39.5-11.5 -10.6-8-16.2-19.7-16.2-33.8 0-26.2 19.3-51.1 55.7-51.1 36.9 0 57.2 25.2 57.2 51.1 0 14-5.9 25.7-17 33.8C177.9 196.7 163.6 200.8 147.7 200.8zM147.7 109.1c-33.6 0-50.6 22.9-50.6 46.4 0 25 19.4 40.6 50.6 40.6 31.7 0 52.1-15.9 52.1-40.6C199.9 126.2 171.5 109.1 147.7 109.1z"
        />
        <ellipse
            className="webbyWelcome2"
            cx="124.4"
            cy="118.7"
            rx="25.7"
            ry="25.2"
        />
        <path
            className="webbyWelcome0"
            d="M123.7 145.5c-15.1 0-27.3-12-27.3-26.8 0-14.8 12.3-26.8 27.3-26.8s27.3 12 27.3 26.8C151.1 133.5 138.8 145.5 123.7 145.5zM123.7 95.1c-13.3 0-24.1 10.6-24.1 23.6 0 13 10.8 23.6 24.1 23.6 13.3 0 24.1-10.6 24.1-23.6C147.8 105.7 137 95.1 123.7 95.1z"
        />
        <ellipse
            className="webbyWelcome0"
            cx="126.4"
            cy="120.2"
            rx="11.6"
            ry="11.2"
        />
        <circle className="webbyWelcome2" cx="124.2" cy="118.2" r="3.2"/>
        <ellipse
            className="webbyWelcome2"
            cx="175.1"
            cy="122.3"
            rx="31.1"
            ry="32.2"
        />
        <path
            className="webbyWelcome0"
            d="M174.4 156.2c-18.1 0-32.8-15.2-32.8-33.8 0-18.7 14.7-33.8 32.8-33.8 18.1 0 32.8 15.2 32.8 33.8C207.2 141 192.5 156.2 174.4 156.2zM174.4 91.7c-16.3 0-29.5 13.7-29.5 30.6 0 16.9 13.2 30.6 29.5 30.6s29.5-13.7 29.5-30.6C203.9 105.5 190.7 91.7 174.4 91.7z"
        />
        <circle className="webbyWelcome0" cx="177" cy="124" r="14.3"/>
        <circle className="webbyWelcome2" cx="184.8" cy="121.8" r="4"/>
        <rect
            x="29.7"
            y="162.6"
            transform="matrix(0.9931 -0.1171 0.1171 0.9931 -21.2869 18.5462)"
            className="webbyWelcome3"
            width="235.1"
            height="55.8"
        />
        <rect
            x="28.3"
            y="161.4"
            transform="matrix(0.9931 -0.1171 0.1171 0.9931 -20.9551 18.1347)"
            className="webbyWelcome2"
            width="231.3"
            height="52.1"
        />
        <path
            className="webbyWelcome1"
            d="M30.8 228.5l-6.4-54.7 1.5-0.2L257 146.4l6.4 54.7 -1.5 0.2L30.8 228.5zM27.7 176.4l5.7 48.7 226.7-26.7 -5.7-48.7L27.7 176.4z"
        />
        <path
            className="webbyWelcome1"
            d="M67.5 212.9l-4.1-3.4 -3.3 4.3c-1.7 2.2-4.6 2.6-6.8 0.8l-5.4-4.6c-1.8-1.6-3.2-2.6-3.7-4.9l-2.2-18.8c-0.7-5.6 7.8-6.6 8.4-1 0.8 7.1 1.7 14.7 2.6 21.8l5.7-0.7c-0.8-7.1-1.7-14.6-2.6-21.8 -0.7-5.7 8-6.7 8.6-1 0.8 7.1 1.7 14.7 2.6 21.8l5.7-0.7c-0.8-7.1-1.7-14.6-2.6-21.8 -0.7-5.6 7.8-6.6 8.4-1l2.2 18.8c0.1 2.4-1.1 3.6-2.4 5.6l-4.3 5.7C72.5 214.4 69.6 214.7 67.5 212.9z"
        />
        <path
            className="webbyWelcome1"
            d="M89.8 185.1c0.2 1.6 0.4 3 0.5 4.5 3.2-0.4 6.3-0.7 9.6-1.1 2.3-0.3 4.5 1.4 4.8 3.8 0.3 2.3-1.5 4.5-3.8 4.8 -3.2 0.4-6.4 0.8-9.6 1.1 0.2 1.4 0.3 2.8 0.5 4.1l10.4-1.2c2.4-0.3 4.5 1.4 4.8 3.8 0.3 2.3-1.5 4.4-3.8 4.8 -4.7 0.6-7.1 0.8-11.8 1.4 -3.9 0.5-7.6-2.4-8-6.4l-0.3-2.7c-0.4-3.4-0.3-6.4 3.4-8.2 -3.7-0.8-4.7-3.4-5.1-6.8 -0.1-0.7-0.2-1.6-0.3-2.3 -0.5-4 2.4-7.7 6.3-8.1 4.8-0.6 7.1-0.8 11.8-1.4 2.4-0.3 4.5 1.4 4.8 3.7 0.3 2.4-1.4 4.6-3.8 4.9L89.8 185.1z"
        />
        <path
            className="webbyWelcome1"
            d="M108.2 201.6c-0.9-7.6-1.8-15.2-2.7-22.9 -0.3-2.3 1.5-4.5 3.8-4.7 2.5-0.3 4.6 1.4 4.9 3.7l2.6 21.8c4.3-0.5 3.1-0.5 7.4-1 5.6-0.7 6.7 8 1 8.6 -3.9 0.5-6.2 0.7-8.6 1C112.5 208.6 108.7 205.7 108.2 201.6z"
        />
        <path
            className="webbyWelcome1"
            d="M133.8 171.2l11.9-1.4c2.3-0.3 4.6 1.5 4.8 3.8 0.3 2.3-1.5 4.5-3.8 4.8l-10.6 1.2 2 17.3 10.5-1.2c2.4-0.3 4.5 1.4 4.8 3.8 0.3 2.4-1.5 4.5-3.8 4.7l-11.8 1.4c-4 0.5-7.7-2.4-8.1-6.4l-2.3-19.8C127 175.4 129.8 171.7 133.8 171.2z"
        />
        <path
            className="webbyWelcome1"
            d="M158.9 168.3l9.8-1.2c3.9-0.5 7.6 2.3 8.1 6.4l2.3 19.7c0.4 3.5-2.5 7.7-6.2 8.1l-10.3 1.2c-3.6 0.4-7.7-2.9-8.1-6.4l-2.3-19.7C151.8 172.2 155 168.8 158.9 168.3zM168.5 175.9l-7.4 0.9 2 17.2 7.4-0.9L168.5 175.9z"
        />
        <path
            className="webbyWelcome1"
            d="M192.9 165.6l4.2 3.5 3.3-4.4c1.8-2.4 4.8-2.8 6.9-0.8l5.6 4.6c1.7 1.5 3.1 2.5 3.7 4.8l2.2 18.7c0.7 5.6-8 6.6-8.6 1 -0.9-7.2-1.7-14.5-2.6-21.8l-5.7 0.7c0.9 7.2 1.7 14.5 2.6 21.8 0.7 5.7-7.9 6.7-8.6 1 -0.9-7.2-1.7-14.5-2.6-21.8l-5.6 0.7c0.9 7.2 1.7 14.5 2.6 21.8 0.7 5.6-8 6.6-8.6 1l-2.2-18.7c-0.2-2.4 1.1-3.7 2.4-5.6l4.4-5.8C187.8 164 190.8 163.7 192.9 165.6z"
        />
        <path
            className="webbyWelcome1"
            d="M226.8 169c0.2 1.6 0.4 3 0.5 4.5 3.2-0.4 6.3-0.7 9.6-1.1 2.3-0.3 4.5 1.4 4.8 3.8 0.3 2.3-1.5 4.5-3.8 4.8 -3.2 0.4-6.4 0.8-9.6 1.1 0.2 1.4 0.3 2.8 0.5 4.1l10.4-1.2c2.4-0.3 4.5 1.4 4.8 3.8 0.3 2.3-1.5 4.4-3.8 4.8 -4.7 0.6-7.1 0.8-11.8 1.4 -3.9 0.5-7.6-2.4-8-6.4l-0.3-2.7c-0.4-3.4-0.3-6.4 3.4-8.2 -3.7-0.8-4.7-3.4-5.1-6.8 -0.1-0.7-0.2-1.6-0.3-2.3 -0.5-4 2.4-7.7 6.3-8.1 4.8-0.6 7.1-0.8 11.8-1.4 2.4-0.3 4.5 1.4 4.8 3.7 0.3 2.4-1.4 4.6-3.8 4.9L226.8 169z"
        />
        <polygon
            className="webbyWelcome0"
            points="37.9 184.8 32.6 185.2 38.5 133.3 97 144.8 97.2 150.1 44.1 138.3 "
        />
        <path
            className="webbyWelcome0"
            d="M33.6 182.5c0 0-10.2 22.2-3.8 29.3s8.1 6 14 3.3 8.8-7.6 6-14.4C47 194 42.5 187.5 33.6 182.5z"
        />
        <path
            className="webbyWelcome0"
            d="M273.5 167.6c0.1-0.4-6.7 24.4-14 26 -9.4 2-10.1 0.2-13.3-5.4 -3.2-5.6-2.7-11.3 3.5-15.2C255.9 169.1 263.4 166.5 273.5 167.6z"
        />
    </svg>
);
