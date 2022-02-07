import {useEffect, useState} from "react";
import ContainerLayout from "../../../../layouts/ContainerLayout";
import useTranslation from 'next-translate/useTranslation'
import {useRouter} from "next/router"
import Link from "next/link"
import {ENTRYPOINT} from "../../../../config/entrypoint";
import {PasswordResetForm} from "../../../../components/user/PasswordResetForm";
import {AskPasswordResetForm} from "../../../../components/user/AskPasswordResetForm";

function ForgotPasswordPage() {
    const {t} = useTranslation('users');

    return (

        <ContainerLayout>
            <div className="row">
                <h1>{t('resetPassword')}</h1>
                <PasswordResetForm/>
            </div>
        </ContainerLayout>
    );
}

export default ForgotPasswordPage;
