import styleHomePage from '../../styles/Homepage.module.css'
import Link from 'next/link'

export default function Pricing() {
    return (

        <div className="section" id="pricing" tabIndex={-1}>
            <div className="container">
                <div className={styleHomePage.sectionTitle}>
                    <h3>Un prix adapté et prévisible</h3>
                    <p className="lead text-center">Payez en fonction du nombre de souvenirs et du nombre de
                        destinataires.</p>
                </div>

                <h4 className="text-center">Exemple</h4>
                <div className="row flex-wrap">
                    <div className="col card pricing mx-md-3 my-3">
                        <div className="card-head">
                            <small className="text-primary">UN CALENDRIER DE L'AVANT</small>
                            <span className="price">8 €<sub/></span>
                        </div>
                        <ul className="list-group list-group-flush">
                            <div className="list-group-item">24 Souvenirs</div>
                            <div className="list-group-item">1 Destinataire</div>
                        </ul>
                    </div>
                    <div className="col-md-4 card pricing popular mx-md-3 my-3">
                        <div className="card-head">
                            <small className="text-primary">UN SOUVENIR / JOUR PENDANT 3 MOIS</small>
                            <span className="price">30 €<sub/></span>
                        </div>
                        <ul className="list-group list-group-flush">
                            <div className="list-group-item">90 Souvenirs (0,33€/u)</div>
                            <div className="list-group-item">1 Destinataire</div>
                        </ul>
                    </div>
                    <div className="col card pricing mx-md-3 my-3">
                        <div className="card-head">
                            <small className="text-primary">UN SOUVENIR PAR SEMAINE PENDANT 1 AN
                                <br/>POUR TOUTE LA FAMILLE</small>
                            <span className="price">43 €<sub></sub></span>
                        </div>
                        <ul className="list-group list-group-flush">
                            <div className="list-group-item">52 Souvenirs (0,33€/u)</div>
                            <div className="list-group-item">4 Destinataire (+50% par destinataire)</div>
                        </ul>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Link href="/gifts/create"><a className="btn btn-primary btn-lg btn-block">Créer un
                        cadeau</a></Link>
                </div>
            </div>
        </div>
    )
}
