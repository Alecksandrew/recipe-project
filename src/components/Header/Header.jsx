import "./Header.css";
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";

/*logoFile -> You can use SVG tag or image url*/

function Header({ logo = {logoFile: undefined, altText:"logo"}}) {
    
    /*=============== CODE ABOUT LOGO =================================*/
    const { logoFile, altText } = logo;

    const ValidImgFormats = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"];
    function isValidImageFormat(file) {
        return ValidImgFormats.some(format => file.endsWith(format));
    }

    const isImgTag = React.isValidElement(logoFile) && logoFile.type === "img";
    const isImgURL = typeof logoFile === "string" && isValidImageFormat(logoFile); /*Local and external URLs */
    const isSvgTag = React.isValidElement(logoFile) && logoFile.type === "svg";

    let logoWhichWillBeRendered;
     
    if(isImgTag && isImgTag.props.alt) {
        logoWhichWillBeRendered = isImgTag;
    } 
    else if (isImgTag) {
       logoWhichWillBeRendered = React.cloneElement(isImgTag, { alt: altText });;
    }
    else if(isImgURL) {
        logoWhichWillBeRendered = <img src={logoFile} alt={altText} />;
    }
    else if (isSvgTag) {
        logoWhichWillBeRendered = isSvgTag
    } 
    else {
        logoWhichWillBeRendered = <span>INVALID FILE, CORRECT YOUR LOGO FILE!!!!</span>
    };

    /*========================== CODE ABOUT MENU HAMBURGUER LOGIC =========================*/

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

    function handleResize() {
        setIsMobile(window.innerWidth < 768)
    }

    useEffect( () => {
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize);
    }, []);


    /*========================== CODE ABOUT MENU HAMBURGUER =========================*/
  
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    function handleClickMenuState() {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <header>
            <nav className={`nav-menu ${isMobile ? "mobile" : "desktop"}`}>
                <a href="" className={`container-logo`}>{logoWhichWillBeRendered}</a>
                <ul className={`container-pages-options ${isMobile ? "mobile" : "desktop"} ${isMenuOpen ? "show-menu" : "" } `}>
                    <li>Home</li>
                    <li>What is there in your frigde?</li>
                    <li>Wishlist</li>
                </ul>
                {isMobile && <IoIosMenu className="menu-hamburguer" onClick={handleClickMenuState}/>}
            </nav>
        </header>
    );

}

export default Header;