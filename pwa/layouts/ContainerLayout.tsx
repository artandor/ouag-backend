import Footer from "../components/common/footer/Footer";
import NavbarDefault from "../components/common/navbar/NavbarDefault";

export default function ContainerLayout({children}) {
    return (
        <div className="d-flex flex-column min-vh-100">
            <NavbarDefault/>
            <div className="flex-shrink-0">
                <div className={"container"}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    )
}
