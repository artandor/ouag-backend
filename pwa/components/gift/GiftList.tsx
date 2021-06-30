import {FunctionComponent} from "react";
import Link from "next/link";
import {Gift} from "../../types/Gift";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";

interface Props {
    gifts: Gift[];
}

export const GiftList: FunctionComponent<Props> = ({gifts}) => {
    const router = useRouter()
    const {t} = useTranslation('gifts')
    const todayDate = new Date();

    return (
        <div>
            <h1>Gift List</h1>
            <Link href={"/gifts/create"}>
                <a className="btn btn-primary my-2">{t('giftCreation')}</a>
            </Link>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {gifts &&
                gifts.length !== 0 &&
                gifts.map((gift) => (
                    <Link href={`${gift["@id"]}`} key={gift['@id']}>
                        <div className="col">
                            <div className="card h-100">
                                <div className="card-img-top">
                                    {new Date(gift.startAt) <= todayDate ?
                                        <img
                                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.cmu.edu%2Fnews%2Fstories%2Farchives%2F2017%2Fnovember%2Fimages%2Fpredict-perfect-gift_900x600-min.jpg&f=1&nofb=1"
                                            alt="Cover of this gift" className={"img-fluid"}/> : ""}
                                </div>
                                <div className="card-body">
                                    <div className="card-title d-flex justify-content-between">
                                        <h4>{gift.name}</h4>
                                        <h4>
                                            <span
                                                className={`badge bg-${gift.state == 'draft' ? 'info'
                                                    : gift.state == 'ordered' ? 'warning' : 'primary'}`}>{gift.state}</span>
                                        </h4>
                                    </div>
                                    <p className="card-text">{t('recapAttention', {count: gift.recurrence})} {t('recapMediaAmount', {count: gift.mediaAmount})}</p>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{width: "70%"}}
                                             aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>25%
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-middle">
                                    {new Date(gift.startAt) > todayDate ?
                                        `Starts in ${Math.ceil((new Date(gift.startAt).getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24))} days`
                                        : `Started at : ${new Date(gift.startAt).toLocaleDateString(router.locale, {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}`}
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
