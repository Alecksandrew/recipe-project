import styles from "./SnackBar.module.css"

function SnackBar({className, hidden=false, text, bgColor = "var(--Paleta01)"}) {

    return(
        <div className={`${styles.container} ${className} ${hidden ? styles.hidden : null}`} style={{backgroundColor: bgColor}}>
            <p>{text}</p>
        </div>
    )
}

export default SnackBar;