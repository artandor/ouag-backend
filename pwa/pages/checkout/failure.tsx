import ContainerLayout from "../../layouts/ContainerLayout";

function FailureCheckoutPage() {
    return (
        <ContainerLayout>
            <div className="row">
                <div className="col-6 m-auto mt-4">
                    <div className="card text-center border-danger">
                        <i className="bi bi-bag-x text-danger" style={{fontSize: "10rem"}}/>
                        <div className="card-body">
                            <p className="card-text">Your order was handled successfully.</p>
                        </div>
                    </div>
                </div>
            </div>
        </ContainerLayout>
    )
}

export default FailureCheckoutPage
