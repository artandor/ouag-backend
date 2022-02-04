import ContainerLayout from "../../../layouts/ContainerLayout";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import Button from "react-bootstrap/Button"
import {Simulate} from "react-dom/test-utils";

export default function SummaryPage() {
    const {t} = useTranslation('gifts');
    let [gift, setGift] = useState({})
    const [promoCode, setPromoCode] = useState("");
    const [promoCodeIsCorrect, setPromoCodeIsCorrect] = useState(null);
    const [promotion, setPromotion] = useState(null);
    const router = useRouter()

    const unitPrice = 0.33;

    useEffect(() => {
        fetch(router.asPath.replace("/summary", ""))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [router])

    function verifyPromoCode() {
        fetch('/stripe/coupon/validate', {
            method: 'POST',
            body: JSON.stringify({'code': promoCode})
        }).then((data) => {
            setPromotion(data)
            setPromoCodeIsCorrect(true)
        }).catch((err) => {
            console.log('Could not find promotion code.');
            setPromoCodeIsCorrect(false);
        })
    }

    function orderGiftRequest() {
        fetch(router.asPath.replace('summary', 'order'), {method: 'PUT', body: JSON.stringify({'code': promoCode})})
            .then((giftData) => {
                console.log('Gift successfully published');
                if (window) window.location.assign(giftData['checkoutUrl'])
            })
            // Handle if total is < .50 €
            .catch((e) => console.log('An error occured while publishing gift.'))
    }

    return (
        <div>
            <div>
                <Head>
                    <title>{gift["name"]}</title>
                </Head>
            </div>
            <ContainerLayout>
                <button className="btn btn-primary" onClick={router.back}>
                    <i className="bi bi-arrow-left"/> {t('shared:backButton')}
                </button>
                {gift["state"] === 'draft' &&
                <Button variant={"success"} className="float-end" onClick={orderGiftRequest}>Send Gift</Button>
                }
                <div className="my-4">
                    <h1 className="mb-3">{t('recap.pageTitle')}</h1>

                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">{t('recap.item')}</th>
                            <th scope="col">{t('recap.quantity')}</th>
                            <th scope="col">{t('recap.unitPrice')}</th>
                            <th scope="col">{t('recap.total')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">{t('recap.memories')}</th>
                            <td>{gift['mediaAmount']}</td>
                            <td>{unitPrice}</td>
                            <td>{gift['mediaAmount'] * unitPrice} €</td>
                        </tr>
                        <tr>
                            <td scope="row" colSpan={2}/>
                            <th>{t('recap.totalPerDest')}</th>
                            <td>{gift['invites'] && gift['mediaAmount'] * unitPrice} €</td>
                        </tr>
                        <tr>
                            <th scope="row">{t('recap.recipient')}</th>
                            <td>{gift['invites'] && gift['invites'].length}</td>
                            <td>{t('recap.recipientPriceLabel1')}<br/>{t('recap.recipientPriceLabel2')}</td>
                            <td>{gift['invites'] && gift['mediaAmount'] * unitPrice * (gift['invites'].length - 1)} €</td>
                        </tr>
                        <tr>
                            <td scope="row" colSpan={2}/>
                            <th>{t('recap.total')}</th>
                            <td>{gift['invites'] && gift['mediaAmount'] * unitPrice * gift['invites'].length} €</td>
                        </tr>
                        {promotion && promotion['percent_off'] && (
                            <>
                                <tr>
                                    <td scope="row" colSpan={2}/>
                                    <th>{t('recap.reduction')} ({promotion['percent_off']} %)</th>
                                    <td>- {(gift['mediaAmount'] * unitPrice * gift['invites'].length * promotion['percent_off'] / 100).toFixed(2)} €
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" colSpan={2}/>
                                    <th>{t('recap.newTotal')}</th>
                                    <td>{gift['invites'] && (gift['mediaAmount'] * unitPrice * gift['invites'].length
                                        - (gift['mediaAmount'] * unitPrice * gift['invites'].length * promotion['percent_off'] / 100)).toFixed(2)} €
                                    </td>
                                </tr>
                            </>
                        )
                        }
                        {promotion && promotion['amount_off'] && (
                            <>
                                <tr>
                                    <td scope="row" colSpan={2}/>
                                    <th>{t('recap.reduction')}</th>
                                    <td>- {promotion['amount_off']} €
                                    </td>
                                </tr>
                                <tr>
                                    <td scope="row" colSpan={2}/>
                                    <th>{t('recap.newTotal')}</th>
                                    <td>{gift['invites'] && gift['mediaAmount'] * unitPrice * gift['invites'].length
                                    - promotion['amount_off']} €
                                    </td>
                                </tr>
                            </>
                        )
                        }
                        </tbody>
                    </table>
                    {gift["state"] === 'draft' &&
                    <div className="d-flex justify-content-end">
                        <div className="col-3 me-2">
                            <input
                                className={promoCodeIsCorrect === false ? "form-control is-invalid" :
                                    promoCodeIsCorrect === true ? "form-control is-valid" : "form-control"}
                                placeholder={t('recap.promotionnalCodeLabel')} value={promoCode}
                                id="promoCode"
                                onChange={(event) => setPromoCode(event.target.value)}/>
                        </div>
                        {!promotion &&
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary mb-3" disabled={promoCode.length <= 0}
                                    onClick={verifyPromoCode}>
                                {t('shared:submitButton')}
                            </button>
                        </div>
                        }
                    </div>
                    }

                    <p className="text-end">{t('recap.nonApplicableVat')}</p>
                </div>
            </ContainerLayout>
        </div>
    )
}
