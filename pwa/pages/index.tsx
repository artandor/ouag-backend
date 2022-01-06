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
                                       target="_blank" rel="noopener" className="btn btn-primary">
                                        Faire un retour
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>

                <Pricing/>
                {/*
                <div className="section light-bg">
                    <div className
                             ="container">
                        <div className
                                 ="row">
                            <div className
                                     ="col-md-8 d-flex align-items-center">
                                <ul className
                                        ="list-unstyled ui-steps">
                                    <li className
                                            ="media">
                                        <div className
                                                 ="circle-icon mr-4">1
                                        </div>
                                        <div className
                                                 ="media-body">
                                            <h5>Ajoutez vos souvenirs</h5>
                                            <p>
                                                Téléchargez vos photos et vidéos sur l'application, à partir
                                                de la gallerie de votre téléphone. N'oubliez pas d'ajouter un
                                                petit mot parfois, c'est peut être ce qui fera sourire votre
                                                destinataire !
                                            </p>
                                        </div>
                                    </li>
                                    <li className
                                            ="media my-4">
                                        <div className
                                                 ="circle-icon mr-4">2
                                        </div>
                                        <div className
                                                 ="media-body">
                                            <h5>Planifiez votre cadeau</h5>
                                            <p>
                                                Il ne vous reste plus qu'à créer le cadeau. Choisissez une
                                                fréquence de distribution, une date de début, puis placez vos
                                                souvenirs aux dates désirées.
                                            </p>
                                        </div>
                                    </li>
                                    <li className
                                            ="media">
                                        <div className
                                                 ="circle-icon mr-4">3
                                        </div>
                                        <div className
                                                 ="media-body">
                                            <h5>Envoyez !</h5>
                                            <p>
                                                Vous nous donnez l'email du ou des destinataires, on s'occupe
                                                du reste ! Votre destinataire recevra une invitation et pourra
                                                récupérer son cadeau en téléchargeant l'application.
                                            </p>
                                            <p>
                                                Chaque jour où vous avez planifié un souvenir, vos
                                                destinataires reçoivent une notification sur leur téléphone
                                                leur indiquant qu'une nouvelle surprise les attend.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className
                                     ="col-md-4">
                                <img src="images/phone-libraries.png" alt="iphone" className
                                    ="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className
                         ="section">
                    <div className
                             ="container">
                        <div className
                                 ="section-title">
                            <small>TEMOIGNAGES</small>
                            <h3>Que disent nos Utilisateurs</h3>
                        </div>
                        <div className
                                 ="d-none" itemProp="aggregateRating" itemScope
                             itemType="https://schema.org/AggregateRating">
                            <span itemProp="ratingValue">4</span> stars - based on{'{'}" "{'}'}
                            <span itemProp="reviewCount">5</span> reviews
                        </div>
                        <div className
                                 ="testimonials owl-carousel owl-loaded owl-drag">
                            <div className
                                     ="owl-stage-outer">
                                <div className
                                         ="owl-stage" style={{
                                    transform: "translate3d(0px, 0px, 0px)"
                                    , transition: "all 0s ease 0s", width: 2790
                                }}>
                                    <div className
                                             ="owl-item active" style={{width: 930}}>
                                        <div className
                                                 ="testimonials-single" itemProp="review" itemScope
                                             itemType="https://schema.org/Review">
                                            <img src="images/client-3.jpg" alt="client" className="client-img"/>
                                            <blockquote className
                                                            ="blockquote" itemProp="reviewBody">
                                                OUAG a changé ma routine réveil. Une petite attention dès le
                                                matin, c'est bien plus sympa que commencer par les mail du
                                                boulot ou voir les chiffres du COVID.
                                            </blockquote>
                                            <meta itemProp="datePublished" content="2020-12-30"/>
                                            <h5 className
                                                    ="mt-4 mb-2" itemProp="author">
                                                Martin
                                            </h5>
                                            <p className
                                                   ="text-primary">France</p>
                                        </div>
                                    </div>
                                    <div className
                                             ="owl-item" style={{width: 930}}>
                                        <div className
                                                 ="testimonials-single" itemProp="review" itemScope
                                             itemType="https://schema.org/Review">
                                            <img src="images/client-1.jpg" alt="client" className
                                                ="client-img"/>
                                            <blockquote className
                                                            ="blockquote" itemProp="reviewBody">
                                                Revoir ces photos après 10 ans... Ca en fait des souvenirs qui
                                                remontent.
                                            </blockquote>
                                            <meta itemProp="datePublished" content="2021-02-03"/>
                                            <h5 className
                                                    ="mt-4 mb-2" itemProp="author">
                                                Lara
                                            </h5>
                                            <p className
                                                   ="text-primary">Belgique</p>
                                        </div>
                                    </div>
                                    <div className="owl-item" style={{width: "930px"}}>
                                        <div className
                                                 ="testimonials-single" itemProp="review" itemScope
                                             itemType="https://schema.org/Review">
                                            <img src="images/client-2.jpg" alt="client" className
                                                ="client-img"/>
                                            <blockquote className
                                                            ="blockquote" itemProp="reviewBody">
                                                En cherchant ces photos à offrir, je me suis quasiment fait un
                                                cadeau à moi même. Que d'émotions !
                                            </blockquote>
                                            <meta itemProp="datePublished" content="2021-03-03"/>
                                            <h5 className
                                                    ="mt-4 mb-2" itemProp="author">
                                                Adama
                                            </h5>
                                            <p className
                                                   ="text-primary">France</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className
                                     ="owl-nav">
                                <div className
                                         ="owl-prev disabled">
            <span className
                      ="ti-arrow-left">
            </span></div>
                                <div className="owl-next">
                    <span className="ti-arrow-right">
                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
            <Footer/>
        </div>
    )
}
