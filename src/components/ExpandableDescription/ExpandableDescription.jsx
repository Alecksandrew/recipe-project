import styles from "./ExpandableDescription.module.css"
import {useState, useEffect, useRef} from "react";

function ExpandableDescription({description, descriptionClassName, btnClassName}) {
    const readMoreButton = useRef(null);
    const descriptionTag = useRef(null);
    const [ isExpanded, setIsExpanded ] = useState(false);

    useEffect(() => {
        const isOverflowing = descriptionTag.current.scrollHeight > descriptionTag.current.clientHeight;
        
        isOverflowing ? readMoreButton.current.style.display = "block" : readMoreButton.current.style.display = "none";
    }, []);

    function handleReadMoreClick() {
        if (!isExpanded) {
            readMoreButton.current.innerText = "Read Less";
            descriptionTag.current.className = `${descriptionClassName} ${styles.expanded}`
        }
        else {
            readMoreButton.current.innerText = "Read More";
            descriptionTag.current.className = `${descriptionClassName} ${styles.collapsed}`
        }

        setIsExpanded(!isExpanded) 
    }

    return(
        <>
            <p className={descriptionClassName} dangerouslySetInnerHTML={{__html: description}} ref={descriptionTag}></p>
            <button className={btnClassName} ref={readMoreButton} onClick={handleReadMoreClick}>Read More</button>
        </>
    )

}

export default ExpandableDescription;