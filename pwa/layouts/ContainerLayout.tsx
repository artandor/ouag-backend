import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function ContainerLayout({children}) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar/>
            <div className="flex-shrink-0">
                <div className={"container"}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
