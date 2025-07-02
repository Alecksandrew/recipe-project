import styles from "./ToggleButton.module.css"

function ToggleButton({text, trackColor = "var(--Paleta06)", ballColor = "var(--Paleta02)", checkedColor = "var(--Paleta01)"}) {


    const componentStyles = {
        '--track-color': trackColor,
        '--ball-color': ballColor,
        '--checked-color': checkedColor,
    }

    return(
        <label className={styles.labelTolerance} style={componentStyles}>  
            {text}
            <label className={styles.toggle}>
                <input type="checkbox" />
                <span className={styles.slider}></span>
            </label>
        </label>
    )
}

export default ToggleButton;