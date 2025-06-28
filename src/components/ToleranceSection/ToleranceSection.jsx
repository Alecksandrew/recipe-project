import styles from "../ToleranceSection/ToleranceSection.module.css"

function ToleranceSection() {

    return ( 
        <section className={styles.section}>
            <h2>Tolerance Control</h2>
            <p>It will show recipes with some ingredients you dont have in your kitchen</p>
            <div className={styles.toleranceContainer}>
                <label htmlFor="tolerance" className={styles.labelTolerance}>
                    <span>Tolerance level:0</span>
                </label>
                <input type="range" min={0} max={6} step={1} id="tolerance" name="tolerance"/>
            </div>
        </section>
    )

}

export default ToleranceSection;