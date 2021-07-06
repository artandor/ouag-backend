import {FunctionComponent} from "react";
import Link from "next/link";
import {Gift} from "../../types/Gift";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {getDaysBetweenDates} from "../../utils/common";

interface Props {
    gifts: Gift[];
}

export const GiftList: FunctionComponent<Props> = ({gifts}) => {
    const router = useRouter()
    const {t} = useTranslation('gifts')
    const todayDate = new Date();

    return (
        <div>
            <button type="button" className="btn fs-3 float-end" data-bs-target="#modalHelpGift"
                    data-bs-toggle="modal" data-bs-placement="bottom"><i className="bi bi-question-circle"></i>
            </button>
            <h1>Gift List</h1>
            <div className="modal fade" id="modalHelpGift" tabIndex={-1} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Help</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <p className="lead">Sur cette page, vous pourrez créer ou personnaliser vos cadeaux.</p>

                                <p>Chaque cadeau est facturé en fonction du nombre de médias et du nombre de
                                    receveurs.</p>

                                <p>Lorsque vous enverrez votre cadeau, ses destinataires recevront un mail les invitant
                                    à venir le réclamer sur l'application.</p>
                                <ul>
                                    <li>0.17€ par souvenir</li>
                                    <li>Prix augmenté de 50% par receveur</li>
                                </ul>
                                Vous recevrez quant à vous une confirmation lorsqu'ils auront bien obtenu le cadeau dans
                                l'application.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link href={"/gifts/create"}>
                <a className="btn btn-primary my-2">{t('giftCreation')}</a>
            </Link>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-3">
                {gifts &&
                gifts.length !== 0 &&
                gifts.map((gift) => (
                    <Link href={`${gift["@id"]}`} key={gift['@id']}>
                        <div className="col">
                            <div className="card h-100">
                                <div className="card-img-top">
                                    {new Date(gift.startAt) <= todayDate ?
                                        // TODO : Replace this by the current media object that is gifted
                                        <img
                                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cmu.edu%2Fnews%2Fstories%2Farchives%2F2017%2Fnovember%2Fimages%2Fpredict-perfect-gift_900x600-min.jpg&f=1&nofb=1"
                                            alt="Cover of this gift" className={"img-fluid"}/> :
                                        <div style={{height: "26vh"}}
                                             className="d-flex align-items-center justify-content-center alert-primary">
                                            <p className="h2">{`Starts in ${getDaysBetweenDates(new Date(gift.startAt), todayDate)} days`}</p>
                                        </div>}
                                </div>
                                <div className="card-body">
                                    <div className="card-title d-flex justify-content-between">
                                        <h4 className="text-ellipsis me-1">{gift.name}</h4>
                                        <h4>
                                            <span
                                                className={`text-capitalize badge bg-${gift.state == 'draft' ? 'info'
                                                    : gift.state == 'ordered' ? 'warning text-dark' : 'success'}`}>{gift.state}</span>
                                        </h4>
                                    </div>
                                    <p className="card-text">{t('recapAttention', {count: gift.recurrence})} {t('recapMediaAmount', {count: gift.mediaAmount})}</p>
                                    <div className="text-center text-bold"><strong>
                                        {gift.state == 'published' ?
                                            <label htmlFor="giftProgress">{t('distributionPercentage')}</label> :
                                            <label htmlFor="giftProgress">{t('fillPercentage')}</label>}
                                    </strong></div>
                                    <div className="progress" id="giftProgress">
                                        <div
                                            className={`progress-bar ${gift.state == 'published' ? 'bg-success' : 'bg-info'}`}
                                            role="progressbar" style={{width: `${gift.completionPercentage}%`}}
                                            aria-valuenow={gift.completionPercentage} aria-valuemin={0}
                                            aria-valuemax={100}>{gift.completionPercentage}%
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-middle">
                                    {new Date(gift.startAt) <= todayDate ?
                                        <div className="d-flex content-end">
                                            {t('starting')}{` ${new Date(gift.startAt).toLocaleDateString(router.locale, {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}`}
                                        </div> : <p></p>}
                                    <Link href={`${gift["@id"]}`}>
                                        <a>
                                            <i className="bi bi-pen" aria-hidden="true"/>{" "}
                                            <span className="sr-only">Customize</span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
