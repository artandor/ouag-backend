import {FunctionComponent} from "react";
import Link from "next/link";
import Image from 'next/image'
import {Gift} from "../../types/Gift";
import {useRouter} from "next/router";
import useTranslation from "next-translate/useTranslation";
import {getDaysBetweenDates} from "../../utils/common";
import giftImage from '../../public/img/predict-perfect-gift_900x600.jpg'

interface Props {
    gifts: Gift[],
    receiverMode?: boolean,
}

export const GiftList: FunctionComponent<Props> = ({gifts, creatorMode = false}) => {
    const {t} = useTranslation('gifts')
    const router = useRouter()
    const todayDate = new Date();

    return (
        <>
            {gifts &&
            gifts.length > 0 ? (
                <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4 mb-3">
                    {gifts.map((gift) => (
                        <Link
                            href={`${(creatorMode ? gift["@id"] : `/gifts/received${gift["@id"].replace('/gifts', "")}`)}`}
                            key={gift['@id']}>
                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-img-top">
                                        {new Date(gift.startAt) <= todayDate ?
                                            // TODO : Replace this by the current media object that is gifted
                                            <Image
                                                src={giftImage}
                                                alt="Cover of this gift" className={"img-fluid"}/> :
                                            <div style={{height: "26vh"}}
                                                 className="d-flex align-items-center justify-content-center alert-primary">
                                                <p className="h2">{`Starts in ${getDaysBetweenDates(new Date(gift.startAt), todayDate)} days`}</p>
                                            </div>}
                                    </div>
                                    <div className="card-body">
                                        <div className="card-title d-flex justify-content-between">
                                            <h4 className="text-ellipsis me-1">{gift.name}</h4>
                                            {creatorMode &&
                                            <h4>
                                            <span
                                                className={`text-capitalize badge bg-${gift.state == 'draft' ? 'info'
                                                    : gift.state == 'ordered' ? 'warning text-dark' : 'success'}`}>
                                                {t(`state.${gift.state}`)}</span>
                                            </h4>}
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="card-text">{t('recapAttention', {count: gift.recurrence})} {t('recapMediaAmount', {count: gift.mediaAmount})}</p>
                                            {creatorMode &&
                                            <p className="badge rounded-pill bg-primary" style={{maxHeight: "1.4rem"}}>
                                                <i className="bi bi-people-fill"></i> {gift.invites.length}
                                            </p>
                                            }
                                        </div>
                                        {creatorMode &&
                                        <>
                                            <div className="text-center text-bold"><strong>
                                                {gift.state == 'published' ?
                                                    <label
                                                        htmlFor="giftProgress">{t('distributionPercentage')}</label> :
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
                                        </>
                                        }
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
                                        {creatorMode &&
                                        <Link href={`${gift["@id"]}`}>
                                            <a>
                                                <i className="bi bi-pen" aria-hidden="true"/>{" "}
                                                <span className="sr-only">{t('shared:customizeButton')}</span>
                                            </a>
                                        </Link>
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>))}
                </div>) : <p>{t('emptyList')}</p>}
        </>
    );
};
