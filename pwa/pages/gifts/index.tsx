import {GiftList} from "../../components/gift/GiftList";
import {fetch} from "../../utils/dataAccess";
import Head from "next/head";
import Link from 'next/link'
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import ContainerLayout from "../../layouts/ContainerLayout";
import {getUserIdFromJwt} from "../../utils/common";
import {useRouter} from "next/router";
import AuthProvider from "../../utils/authProvider";

export default function GiftListPage() {
    const {t} = useTranslation('gifts');
    let [collection, setCollection] = useState({})
    const router = useRouter();

    useEffect(() => {
        try {
            AuthProvider.checkAuth()
                .then(() => {
                    fetch(`/gifts?owner=${getUserIdFromJwt()}&order[updatedAt]&order[startAt]`)
                        .then((collectionData) => {
                            setCollection(collectionData)
                        })
                        .catch((e) => {
                            console.error(e);
                            router.push('/users/login')
                        });
                })
        } catch (e) {
            console.error(e);
            router.push('/users/login')
        }
    }, [router])

    return (
        <div>
            <div>
                <Head>
                    <title>{t('createdTitle')}</title>
                </Head>
            </div>
            <ContainerLayout>
                <h1>{t('createdTitle')}</h1>
                <div className="d-flex justify-content-between mb-2">
                    <Link href={"/gifts/create"}>
                        <a className="btn btn-primary my-2">{t('giftCreation')}</a>
                    </Link>
                    <button type="button" className="btn fs-3" data-bs-target="#modalHelpGift"
                            data-bs-toggle="modal" data-bs-placement="bottom"><i className="bi bi-question-circle"></i>
                    </button>
                </div>
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
                                    <p className="lead">{t('help.text1')}</p>

                                    <p>{t('help.text2')}</p>

                                    <p>{t('help.text3')}</p>
                                    <ul>
                                        <li>0.19€ {t('help.unitPriceLabel')}</li>
                                        <li>{t('help.destPriceLabel', {count: 50})}</li>
                                    </ul>
                                    <p>{t('help.text4')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <GiftList gifts={collection["hydra:member"]} creatorMode={true}/>
            </ContainerLayout>
        </div>
    );
}
