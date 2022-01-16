import NavbarContent from "./NavbarContent";
import {useEffect, useState} from "react";

export default function NavbarFixed() {
    let [isScrolling, setIsScrolling] = useState(false)
    useEffect(() => {
        if (window != undefined) {
            window.addEventListener('scroll', menuscroll)
        }
    }, [])

    return (
        <nav className={`nav-menu navbar fixed-top navbar-expand-lg navbar-dark ${isScrolling ? 'is-scrolling' : ''}`}>
            <NavbarContent/>
        </nav>
    )

    function menuscroll(event) {
        if (window.scrollY > 50) {
            setIsScrolling(true);
        } else {
            setIsScrolling(false);
        }
    }
}
