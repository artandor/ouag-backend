import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import Link from "next/link"
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import ContainerLayout from "../../../layouts/ContainerLayout";
import InviteList from "../../../components/invite/InviteList";
import {GiftInvite} from "../../../types/GiftInvite";

export default function GiftInvitesPage() {
    const {t} = useTranslation('gifts');
    let [gift, setGift] = useState({})
    const router = useRouter()

    useEffect(() => {
        fetch(router.asPath.replace("/invites", ""))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [router])

    function addInvite(invite: GiftInvite) {
        let existingInviteIndex = gift["invites"].findIndex((element) => {
            return element["@id"] === invite["@id"];
        });
        existingInviteIndex !== -1 ? gift["invites"][existingInviteIndex] = invite : gift["invites"].push(invite);
        setGift(prevGift => {
            return {...prevGift, ...gift};
        })
    }

    function deleteInvite(invite: GiftInvite) {
        gift['invites'] = gift["invites"].filter(function (o) {
                return o !== invite
            }
        );
        setGift(prevGift => {
            return {...prevGift, ...gift};
        })
    }

    return (
        <div>
            <div>
                <Head>
                    <title>{gift["name"]}</title>
                </Head>
            </div>
            <ContainerLayout>
                <div>
                    <h1>{t('invite.pageTitle')} {gift['name']}</h1>
                </div>
                <div className="d-flex justify-content-between mb-3">
                    <button className="btn btn-primary" onClick={router.back}><i
                        className="bi bi-arrow-left"></i> {t('shared:backButton')}
                    </button>
                    {gift["invites"] && gift["invites"].length > 0 &&
                    <Link href={router.asPath.replace('/invites', '/summary')}>
                        <a className="btn btn-success">{t('shared:nextButton')} <i
                            className="bi bi-arrow-right"></i></a>
                    </Link>
                    }
                </div>

                <div>
                    {gift["invites"] &&
                    <InviteList invites={gift["invites"]} addInvite={gift['state'] == 'draft' && addInvite}
                                deleteInvite={gift['state'] == 'draft' && deleteInvite}/>}
                </div>
            </ContainerLayout>
        </div>
    );
};
