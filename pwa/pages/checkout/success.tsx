import ContainerLayout from "../../layouts/ContainerLayout";

function SuccessCheckoutPage() {
    return (
        <ContainerLayout>
            <div className="row">
                <div className="col-6 m-auto mt-4">
                    <div className="card text-center border-success">
                        <i className="bi bi-bag-check text-success" style={{fontSize: "10rem"}}/>
                        <div className="card-body">
                            <p className="card-text">Your order was handled successfully.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    )
}

export default SuccessCheckoutPage
