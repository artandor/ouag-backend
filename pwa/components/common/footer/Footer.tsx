import Image from 'next/image'
import useTranslation from "next-translate/useTranslation";
import ouagLogo from '../../../public/img/big-logo.png'
import styles from './Footer.module.css'
import Link from 'next/link'

function Footer() {
    const {t} = useTranslation('shared');

    return (
        <footer className="mt-auto py-3 bg-light">
            <div id="contact" itemProp="brand" itemScope
                 itemType="https://schema.org/Organization">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 text-center text-lg-left">
                            <div>
                                <Image src={ouagLogo} width="30" height="24" className="img-fluid logo" alt="logo"
                                       itemProp="logo"/>
                                <span itemProp="name" className="ms-2">Once Upon A Gift</span>
                                <meta itemProp="url" content="https://app.once-upon-a-gift.com/"/>
                            </div>
                            <div className="mb-2 d-none" itemProp="address" itemScope
                                 itemType="https://schema.org/PostalAddress">
                                <i className="bi bi-pin-map"/><span itemProp="postalCode">59000</span>
                                <span itemProp="addressLocality" className="ms-2">Lille, FRANCE</span>
                            </div>
                            <div className=" d-block d-sm-inline-block">
                                <p className="mb-2" itemType="https://schema.org/ContactPoint">
                                    <i className="bi bi-envelope"/>
                                    <a className="ms-2"
                                       href="mailto:support@once-upon-a-gift.com"
                                       itemProp="email">support@once-upon-a-gift.com</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 text-center">
                            <h4>Partenaire</h4>
                            <p><a href="https://hemisf4ire.com/" target="_blank"
                                  rel="noopener noreferrer">Hémisf4ire</a></p>
                        </div>
                        <div className="col-lg-4 text-center text-lg-end">
                            <div className={styles.socialIcons}>
                                <a href="https://www.facebook.com/OUAGOfficial" target="_blank"
                                   rel="noopener noreferrer">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com/ouagofficial/" target="_blank"
                                   rel="noopener noreferrer">
                                    <i className="bi bi-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <footer className="my-2 text-center">
                <p className="mb-2"><small>COPYRIGHT © 2021-2022</small></p>
                <small>
                    <Link href="/tos"><a className="m-2">{t('tos')}</a></Link>
                    <Link href="/privacy"><a className="m-2">{t('privacy')}</a></Link>
                </small>

            </footer>
        </footer>
    );
}

export default Footer;
