import useTranslation from "next-translate/useTranslation";
import ContainerLayout from "../../layouts/ContainerLayout";

function FailureCheckoutPage() {
    const {t} = useTranslation('checkout')
    return (
        <ContainerLayout>
            <div className="row">
                <div className="col-12 col-md-6 m-auto mt-4">
                    <div className="card text-center border-danger">
                        <i className="bi bi-bag-x text-danger" style={{fontSize: "10rem"}}/>
                        <div className="card-body">
                            <p className="card-text">{t('failure.title')}</p>
                        </div>
                        <div className="card-footer">
                            {t('failure.footer')}<br/><a
                            href="mailto:support@once-upon-a-gift.com">support@once-upon-a-gift.com</a>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    )
}

export default FailureCheckoutPage
