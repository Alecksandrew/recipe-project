
import styles from "./DropdownIngredients.module.css";
import { useState, useContext } from "react"

import { SelectedIngredientsActionsContext } from "../../contexts/selectedIngredientsActionsContext";
import { SelectedIngredientsStateContext } from "../../contexts/selectedIngredientsStateContext";

function DropdownIngredients({imageURL, imageAlt, ingredientName = "Alho de Aimpim"} ) {

    const [ isSelected, setIsSelected] = useState(false);
    const { dispatch } = useContext(SelectedIngredientsActionsContext)

    function handleButtonClick() {
        
        if(!isSelected) {
            setIsSelected(true);
            dispatch({ type: "INCREMENT_COUNT_SELECTED_TIMES" });
            dispatch({ type: "ADD_TO_SELECTED_INGREDIENTS", payload: {name: ingredientName, image: imageURL}});
        }
        else {
            dispatch({type: "INCREMENT_COUNT_SELECTED_TIMES"});
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