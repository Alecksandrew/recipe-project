
import styles from "./DropdownIngredients.module.css";
import { useState, useContext } from "react"

import { SelectedIngredientsContext } from "../../contexts/selectedIngredientsContext";

function DropdownIngredients({imageURL, imageAlt, ingredientName = "Alho de Aimpim"} ) {

    const { makeIngredientBecomeSelected } = useContext(SelectedIngredientsContext)

    const [isSelected, setIsSelected] = useState(false);

    function handleButtonClick() {
        setIsSelected(true);

        if(makeIngredientBecomeSelected) {
            makeIngredientBecomeSelected({name: ingredientName, image: imageURL,})
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