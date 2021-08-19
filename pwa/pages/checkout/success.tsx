import useTranslation from "next-translate/useTranslation";
import ContainerLayout from "../../layouts/ContainerLayout";

function SuccessCheckoutPage() {
    const {t} = useTranslation('checkout')
    return (
        <ContainerLayout>
            <div className="row">
                <div className="col-12 col-md-6 m-auto mt-4 vh-100 align-middle">
                    <div className="card text-center border-success">
                        <i className="bi bi-bag-check text-success" style={{fontSize: "10rem"}}/>
                        <div className="card-body">
                            <p className="card-text">{t('success.title')}</p>
                            <p>{t('success.confirmationEmail')}</p>
                        </div>
                        <div className="card-footer">
                            {t('success.footer')}<br/><a
                            href="mailto:support@once-upon-a-gift.com">support@once-upon-a-gift.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    )
}

export default SuccessCheckoutPage
