import styles from "../ToleranceSection/ToleranceSection.module.css"

import { SelectedIngredientsActionsContext } from "../../contexts/selectedIngredientsActionsContext";
import { useContext, useRef} from "react";

import ToggleButton from "../ToggleButton/ToggleButton";

function ToleranceSection({classNameFromParent}) {
    const rangeInput = useRef(null)
    const { modifyTolerance, tolerance } = useContext(SelectedIngredientsActionsContext)

    function updateRangeProgressStyle(element, e) {

        
        const min = rangeInput.current.getAttribute("min");
        const max = rangeInput.current.getAttribute("max");
        const percentageEachValue = (100/(max-min));
        const percentage = Math.trunc((percentageEachValue*e.target.value)*100)/100
        element.current.style.setProperty("--filled-percentage", `${percentage}%`) ;
        console.log(percentage)
    }

    function handleInputRange(e) {
        modifyTolerance(e)
        updateRangeProgressStyle(rangeInput, e)
    }

    return ( 
        <section className={`${styles.section} ${classNameFromParent}`}>
            <h2>Tolerance Control</h2>
            <p>It will show recipes with some ingredients you dont have in your kitchen</p>
            <div className={styles.toleranceContainer}>
                <label className={styles.labelTolerance}>
                    <span>Tolerance level: {tolerance}</span>
                     <input 
                     className={styles.inputRange}
                     type="range" 
                     min={0} 
                     max={6} 
                     step={1} 
                     id="tolerance" 
                     name="tolerance" 
                     value={tolerance} 
                     onChange={handleInputRange} 
                     ref={rangeInput} 
                     />
                </label>
               
                <ToggleButton className={styles.containerToggle} text={"Exact Tolerance"}/>
            </div>
        </section>
    )

}

export default ToleranceSection;