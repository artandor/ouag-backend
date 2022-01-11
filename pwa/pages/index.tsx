import Head from 'next/head'
import phoneNotificationImage from '../public/assets/phone-notification.png'
import dataSecurityImage from '../public/assets/data-security.png'
import graphicImage from '../public/assets/graphic.png'
import librariesImage from '../public/assets/libraries.gif'
import cottonBroImage from '../public/assets/pexels-cottonbro-3170951.jpg'
import style from '../styles/Homepage.module.css'
import GradientBlockWithImage from "../components/common/GradientBlockWithImage"
import Footer from "../components/common/footer/Footer";
import NavbarFixed from "../components/common/navbar/NavbarFixed";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Image from 'next/image'
import Pricing from "../components/common/Pricing";

export default function HomePage() {
    return (
        <div>
            <Head>
                <title>Once Upon A Gift</title>
            </Head>
            <NavbarFixed/>
            <GradientBlockWithImage title={"Once Upon A Gift"} image={phoneNotificationImage}
                                    subtitle={"Le moyen simple de faire un cadeau sur la durée pour remémorer vos " +
                                    "plus beaux souvenirs à vos proches"}/>
            <div className="container my-4">
                <div className={style.sectionTitle}>
                    <small>FONCTIONNALITES</small>
                    <h3>Faites un cadeau qui marque</h3>
                </div>
                <div className={style.tabGroup}>
                    <Tabs defaultActiveKey="home" className="nav-justified mb-3">
                        <Tab eventKey="home" title="Personnalisation" tabClassName={style.tab}>
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="text-center">
                                    <Image src={graphicImage} alt="graphic" layout={"intrinsic"}
                                           className="img-fluid rounded align-self-start mx-auto"/>
                                </div>
                                <div className="ms-lg-4">
                                    <h2>Personnalisation complète</h2>
                                    <p className="lead">Créez un cadeau qui vous ressemble.</p>
                                    <p>
                                        Importez vos photos. Ajoutez un commentaire ou un petit mot.
                                        Choisissez le paquet cadeau. Planifiez un souvenir* tous les
                                        jours ou tous les mois, c'est votre choix.
                                    </p>
                                    <p>
                                        Le prix est aussi modulable que le produit. Vous payez pour ce
                                        que vous consommez, en fonction du nombre de souvenirs dans vos
                                        cadeaux.
                                    </p>
                                    <p className="small">* Photo, video, gif, chanson</p>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Bibliothèques" tabClassName={style.tab}>
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="me-lg-4">
                                    <h2>Bibliothèques</h2>
                                    <p className="lead">
                                        Importez vos souvenirs une fois, utilisez les dans plusieurs
                                        cadeaux.
                                    </p>
                                    <p>
                                        Pour vous faire gagner du temps, vos souvenirs sont stockés dans
                                        des bibliothèques que vous pouvez organiser par thème,
                                        évenement, ...
                                    </p>
                                    <p>
                                        Mieux encore, vous pouvez choisir de partager vos bibliothèques
                                        avec vos amis afin de pouvoir les remplir à plusieurs. Parfait
                                        pour les vacances au ski ou les photos de mariage !
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Image src={librariesImage} alt="libraries" layout={"intrinsic"}
                                           className="img-fluid rounded"/>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="contact" title="Données personnelles" tabClassName={style.tab}>
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="me-lg-4">
                                    <h2>Respect de la RGPD</h2>
                                    <p className="lead">
                                        Vos données ne sont pas revendues ni analysées.
                                    </p>
                                    <p>
                                        Parce que vos souvenirs n'appartiennent qu'à vous et à ceux qui
                                        les partagent, nous respectons votre vie privée. Aucune photo ou
                                        vidéo ne sera analysée, aucune donnée personnelle revendue.
                                    </p>
                                    <p>
                                        Nos serveurs sont quant à eux sécurisés au maximum, et des
                                        experts vérifient régulièrement qu'aucune faille n'existe. Vos
                                        données ne seront pas volées.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Image src={dataSecurityImage} layout={"intrinsic"} alt="Security"
                                           className="img-fluid rounded"/>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>

                <hr/>

                <div className="section my-3" id="subscribe-tester">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6" itemScope itemType="https://schema.org/ImageObject">
                                <Image src={cottonBroImage} alt="dual phone"
                                       className="img-fluid"/>
                                <span itemProp="author" itemScope itemType="https://schema.org/Person">
                                    <meta itemProp="name" content="cottonbro"/>
                                    <meta itemProp="url" content="https://www.pexels.com/fr-fr/@cottonbro"/>
                                </span>
                            </div>
                            <div className="col-md-6 d-flex align-items-center text-center">
                                <div>
                                    <div className="box-icon mx-auto">
                                        <span className="ti-comments gradient-fill ti-3x">

                                        </span>
                                    </div>
                                    <h2>Votre avis compte</h2>
                                    <p className="mb-4">
                                        Vous voulez essayer l'application avant tout le monde,
                                        gratuitement, et faire vos retours ?
                                    </p>
                                    <p>Créez un cadeau avec le code <strong>BONNEANNEE</strong> et offrez gratuitement
                                        des cadeaux !</p>
                                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfH9IhBLFeevz9J3RxcLqv0po6ytC2uGkYGOJNww8IxjXSARQ/viewform?usp=sf_link"
                                       title="Feedback"
                                       target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                        Faire un retour
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>

                <Pricing/>
            </div>
            <Footer/>
        </div>
    )
}
