import styles from "./Header.module.css";
import React, { useEffect, useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { TbFridge } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";




/*logoFile -> You can use SVG tag or image url*/

function Header({ objectLogo = {logoFile: undefined, altText:"logo"}, arrayMenuOptions = [{name:"Home", icon: <AiOutlineHome />, link: "/"}, {name:"What is there in your fridge?", icon: <TbFridge />, link: "whats-in-fridge"}, {name:"Wishlist", icon: <FaRegHeart />, link: "wishlist"}]}) {
    
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
            return <li key={option.name} className={`${styles.menuOption} ${isMobile ? styles.menuOptionMobile : styles.menuOptionDesktop}`}><Link to={option.link} className={styles.linkRouter}>{option.icon}{option.name}</Link></li>
        })
    }

    function renderMenuOverlay() {
        if(isMobile) {
            if(isMenuOpen){
                return <div className={`${styles.menuOverlayMobile} ${styles.menuOverlayMobileActive}`} onClick={handleClickMenuState}></div>
            }
            else {
                return <div className={styles.menuOverlayMobile} onClick={handleClickMenuState}></div>
            }
        }
        return null
    }
    

    return (
        <header>
            <nav className={`${styles.navMenu} ${isMobile ? styles.navMenuMobile : styles.navMenuDesktop}`}>
                <a href="" className={styles.containerLogo}>{logoWhichWillBeRendered}</a>
                <ul className={`
                    ${styles.containerPagesOptions} 
                    ${isMobile ? styles.containerPagesOptionsMobile : styles.containerPagesOptionsDesktop} 
                    ${(isMobile && isMenuOpen) ? styles.containerPagesOptionsMobileShowMenu : ""}
                `.replace(/\s+/g, ' ').trim()}>
                    {listMenuOptions()}
                </ul>
                {isMobile && <IoIosMenu className={styles.menuHamburguer} onClick={handleClickMenuState}/>} 
            </nav>
            {renderMenuOverlay()}
        </header>
    );

}

export default Header;