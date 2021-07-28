import {GiftForm} from "../../components/gift/GiftForm";
import Head from "next/head";
import ContainerLayout from "../../layouts/ContainerLayout";
import useTranslation from "next-translate/useTranslation";

export default function GiftCreatePage() {
    const {t} = useTranslation('gifts')
    return (
        <div>
            <div>
                <Head>
                    <title>{t('giftCreation')}</title>
                </Head>
            </div>
            <ContainerLayout>
                <GiftForm/>
            </ContainerLayout>
        </div>
    );
};
