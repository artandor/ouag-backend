import ContainerLayout from "../../../layouts/ContainerLayout";
import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import Button from "react-bootstrap/Button"

export default function SummaryPage() {
    const {t} = useTranslation('gifts');
    let [gift, setGift] = useState({})
    const router = useRouter()

    const unitPrice = 0.33;

    useEffect(() => {
        fetch(router.asPath.replace("/summary", ""))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [router])

    function orderGiftRequest() {
        fetch(router.asPath.replace('summary', 'order'), {method: 'PUT', body: JSON.stringify({})})
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
                <Button variant={"success"} className="float-end" onClick={orderGiftRequest}>Send Gift</Button>
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
                            <th>Total per dest</th>
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
                        </tbody>
                    </table>
                    <p className="text-end">{t('recap.nonApplicableVat')}</p>
                </div>
            </ContainerLayout>
        </div>
    )
}
