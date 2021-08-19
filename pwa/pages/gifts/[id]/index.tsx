import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import {useRouter} from 'next/router'
import {createRef, useEffect, useState} from "react";
import ContainerLayout from "../../../layouts/ContainerLayout";
import PlanningList from "../../../components/planning/PlanningList";
import {Planning} from "../../../types/Planning";
import {GiftShow} from "../../../components/gift/GiftShow";
import useTranslation from "next-translate/useTranslation";

export default function GiftShowPage() {
    const [gift, setGift] = useState({})
    const [plannings, setPlannings] = useState({})
    const router = useRouter()
    const {t} = useTranslation('gifts')

    useEffect(() => {
        fetch(router.asPath)
            .then((giftData) => {
                setGift(giftData)
            })
            .catch((err) => console.error(err));
        fetch(router.asPath + '/plannings')
            .then((planningData) => {
                planningData['hydra:member'] = planningData['hydra:member'].map((planning: Planning) => {
                    planning['ref'] = createRef()
                    return planning
                });
                setPlannings(planningData)
            })
            .catch((err) => console.error(err));
    }, [router])


    return (
        <div>
            <div>
                <Head>
                    <title>{gift["name"]}</title>
                </Head>
            </div>
            <ContainerLayout>
                <GiftShow gift={gift}/>
                <h2 className="mt-2">{t('planningsTitle')}</h2>
                {plannings['hydra:totalItems'] > 0 && gift &&
                <PlanningList plannings={plannings['hydra:member']} gift={gift}/>}
            </ContainerLayout>
        </div>
    );
};
