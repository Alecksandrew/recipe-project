import styles from "./Warning.module.css"

function Warning({title, text, bgColor = "var(--Paleta01)", onClose}) {
    

    return (
        <>
            <div className={styles.container} style={{backgroundColor: bgColor}}>
                <h2>{title}</h2>
                <p>{text}</p>
                <button type="button" className={styles.btn} onClick={onClose}>Ok</button>
                
            </div>
            <div className={styles.overlay}></div>
        </>
    )
}

export default Warning;
