import "./Header.css";
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { TbFridge } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";




/*logoFile -> You can use SVG tag or image url*/

function Header({ objectLogo = {logoFile: undefined, altText:"logo"}, arrayMenuOptions = [{name:"Home", icon: <AiOutlineHome />}, {name:"What is there in your fridge?", icon: <TbFridge />}, {name:"Wishlist", icon: <FaRegHeart />}]}) {
    
    /*=============== CODE ABOUT LOGO =================================*/
    const { logoFile, altText } = objectLogo;

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
        logoWhichWillBeRendered = <span>INVALID FILE</span>
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

    /*========================== CODE ABOUT MENU OPTIONS =========================*/
    function listMenuOptions() {
        return arrayMenuOptions.map(option => {
                    return <li key={option.name} className={`menu-option ${isMobile ? "mobile" : "desktop"}`}>{option.icon}{option.name}</li>
                })
    }

    function renderMenuOverlay() {
        if(isMobile) {
            if(isMenuOpen){
                return <div className="menu-overlay-mobile active" onClick={handleClickMenuState}></div>
            }
            else {
                return <div className="menu-overlay-mobile" onClick={handleClickMenuState}></div>
            }
        }
        return null
    }
    

    return (
        <header>
            <nav className={`nav-menu ${isMobile ? "mobile" : "desktop"}`}>
                <a href="" className={`container-logo`}>{logoWhichWillBeRendered}</a>
                <ul className={`container-pages-options ${isMobile ? "mobile" : "desktop"} ${(isMobile && isMenuOpen) ? "show-menu" : "" } `}>
                    {listMenuOptions()}
                </ul>
                {isMobile && <IoIosMenu className="menu-hamburguer" onClick={handleClickMenuState}/>}
            </nav>
            {renderMenuOverlay()}
        </header>
    );

}

export default Header;