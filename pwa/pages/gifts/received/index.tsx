import ContainerLayout from "../../../layouts/container";
import {GiftList} from "../../../components/gift/GiftList";
import {fetch} from "../../../utils/dataAccess";
import {getUserIdFromJwt} from "../../../utils/common";
import useTranslation from "next-translate/useTranslation";
import {useEffect, useState} from "react";

export default function ReceivedGiftPage() {
    const {t} = useTranslation('gifts');
    let [collection, setCollection] = useState({})

    useEffect(() => {
        fetch(`/gifts?receivers[]=${getUserIdFromJwt()}&state=published`)
            .then((collectionData) => {
                setCollection(collectionData)
            })
            .catch(() => null);
    }, [])

    return (
        <div>
            <ContainerLayout>
                <GiftList gifts={collection["hydra:member"]}/>
            </ContainerLayout>
        </div>
    )
}
