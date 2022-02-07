import ContainerLayout from "../../../layouts/ContainerLayout";
import useTranslation from 'next-translate/useTranslation'
import AskPasswordResetForm from "../../../components/user/AskPasswordResetForm";

function ForgotPasswordPage() {
    const {t} = useTranslation('users');

    return (

        <ContainerLayout>
            <div className="row">
                <h1>{t('resetPassword')}</h1>
                <AskPasswordResetForm/>
            </div>
        </ContainerLayout>
    );
}

export default ForgotPasswordPage;
