
import styles from "./DropdownIngredients.module.css";
import { useState, useContext } from "react"

import { SelectedIngredientsActionsContext } from "../../contexts/selectedIngredientsActionsContext";
import { SelectedIngredientsStateContext } from "../../contexts/selectedIngredientsStateContext";

function DropdownIngredients({imageURL, imageAlt, ingredientName = "Alho de Aimpim"} ) {

    const [ isSelected, setIsSelected] = useState(false);
    const { makeIngredientBecomeSelected } = useContext(SelectedIngredientsActionsContext)
    
    const { countSelectedTimes, setCountSelectedTimes } = useContext(SelectedIngredientsStateContext)

    function handleButtonClick() {
        
        if(!isSelected) {
            setIsSelected(true);
            setCountSelectedTimes(1);
            makeIngredientBecomeSelected({name: ingredientName, image: imageURL,})

            console.log("Button was clicked!")
        }
        else {
            setCountSelectedTimes(countSelectedTimes + 1)
        }
    }

    return (
        <div className={styles.containerIngredient}>
            <div className={styles.containerImage}>
                <img src={imageURL} alt={imageAlt} />
            </div>
            <h3 className={styles.ingredientName}>{ingredientName}</h3>
            <button type="button" className={styles.btnSelect} onClick={handleButtonClick}>Select ingredient</button>
        </div>
    )
}

export default DropdownIngredients;