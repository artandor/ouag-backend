import {Form} from "../../components/library/Form";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";


export default function CreatePage() {
    const {t} = useTranslation('libraries');
    return (
        <div>
            <div>
                <Head>
                    <title>{t("libraryCreate.title")}</title>
                </Head>
            </div>
            <Form/>
        </div>);
}
