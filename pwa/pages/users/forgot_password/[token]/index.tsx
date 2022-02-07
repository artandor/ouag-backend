import ContainerLayout from "../../../../layouts/ContainerLayout";
import useTranslation from 'next-translate/useTranslation'
import PasswordResetForm from "../../../../components/user/PasswordResetForm";

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
