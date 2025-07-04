
import styles from "./DropdownIngredients.module.css";
import { useState, useContext } from "react"

import { SelectedIngredientsActionsContext } from "../../contexts/selectedIngredientsActionsContext";

function DropdownIngredients({imageURL, imageAlt, ingredientName = "Alho de Aimpim"} ) {

    const { makeIngredientBecomeSelected } = useContext(SelectedIngredientsActionsContext)

    const [isSelected, setIsSelected] = useState(false);

    function handleButtonClick() {
        
        if(!isSelected) {
            setIsSelected(true);
            makeIngredientBecomeSelected({name: ingredientName, image: imageURL,})
            console.log("Button was clicked!")
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