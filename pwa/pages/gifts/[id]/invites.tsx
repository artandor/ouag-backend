import {fetch} from "../../../utils/dataAccess";
import Head from "next/head";
import Link from "next/link"
import {useEffect, useState} from "react";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";
import ContainerLayout from "../../../layouts/container";
import InviteList from "../../../components/invite/InviteList";
import {GiftInvite} from "../../../types/GiftInvite";

export default function GiftInvitesPage() {
    const {t} = useTranslation('users');
    let [gift, setGift] = useState({})
    const router = useRouter()

    useEffect(() => {
        fetch(router.asPath.replace("/invites", ""))
            .then((giftData) => {
                setGift(giftData)
            })
            .catch(() => null);
    }, [])

    function addInvite(invite: GiftInvite) {
        let existingInviteIndex = gift["invites"].findIndex((element) => {
            return element["@id"] == invite["@id"];
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
                <button className="btn btn-primary" onClick={router.back}><i className="bi bi-arrow-left"></i> Back
                </button>
                {gift["invites"] && gift["invites"].length > 0 &&
                <Link href={router.asPath + "/invites"}>
                    <a className="btn btn-success float-end">Next <i className="bi bi-arrow-right"></i></a>
                </Link>}
                <div>
                    {gift["invites"] &&
                    <InviteList invites={gift["invites"]} addInvite={addInvite} deleteInvite={deleteInvite}/>}
                </div>
            </ContainerLayout>
        </div>
    );
};
