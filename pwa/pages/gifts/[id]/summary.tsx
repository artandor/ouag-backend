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
            .then(() => publishGiftRequest())
            .then(() => {
                console.log('Gift successfully published');
                router.push('/gifts')
            })
            .catch((e) => console.log('An error occured while publishing gift.'))
    }

    async function publishGiftRequest() {
        return fetch(router.asPath.replace('summary', 'publish'), {method: 'PUT', body: JSON.stringify({})})
    }

    return (
        <div>
            <div>
                <Head>
                    <title>{gift["name"]}</title>
                </Head>
            </div>
            <ContainerLayout>
                <button className="btn btn-primary" onClick={router.back}><i
                    className="bi bi-arrow-left"></i> {t('shared:backButton')}
                </button>
                <div>
                    <h1>{t('recap.pageTitle')} {gift['name']}</h1>
                    <div className="row">
                        <div className="col">
                            <div>{gift['mediaAmount']} souvenirs</div>
                            <div>1 every {gift['recurrence']}</div>
                        </div>
                        <div className="col">
                            {/* TODO: Change this to get the price from Stripe API when it's setup */}
                            {unitPrice} € par souvenir
                        </div>
                    </div>
                    <div className="row">
                        <p>Total par destinataire : {gift['mediaAmount'] * unitPrice}</p>
                    </div>
                    <div className="row">
                        <div className="col">{gift['invites'] && gift['invites'].length} destinataires</div>
                        <div className="col">Total
                            : {gift['invites'] && gift['mediaAmount'] * unitPrice * gift['invites'].length} €
                        </div>
                    </div>
                    <Button variant={"success"} onClick={orderGiftRequest}>Send Gift</Button>
                </div>
            </ContainerLayout>
        </div>
    )
}
