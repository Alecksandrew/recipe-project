import styles from "../ToleranceSection/ToleranceSection.module.css"

import { SelectedIngredientsActionsContext } from "../../contexts/selectedIngredientsActionsContext";
import { useContext } from "react";

function ToleranceSection({classNameFromParent}) {

    const { modifyTolerance, tolerance } = useContext(SelectedIngredientsActionsContext)

    return ( 
        <section className={`${styles.section} ${classNameFromParent}`}>
            <h2>Tolerance Control</h2>
            <p>It will show recipes with some ingredients you dont have in your kitchen</p>
            <div className={styles.toleranceContainer}>
                <label htmlFor="tolerance" className={styles.labelTolerance}>
                    <span>Tolerance level: {tolerance}</span>
                </label>
                <input type="range" min={0} max={6} step={1} id="tolerance" name="tolerance" value={tolerance} onChange={modifyTolerance}/>
            </div>
        </section>
    )

}

export default ToleranceSection;