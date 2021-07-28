import Navbar from "../components/common/Navbar";

export default function ContainerLayout({children}) {
    return (
        <>
            <Navbar/>
            <div className={"container"}>
                {children}
            </div>
        </>
    )
}
