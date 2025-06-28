
import styles from "./DropdownIngredients.module.css";
import { useState } from "react"

function DropdownIngredients({imageURL, imageAlt, ingredientName = "Alho de Aimpim", onSelect} ) {

    const [isSelected, setIsSelected] = useState(false);

    function handleButtonClick() {
        setIsSelected(true);

        if(onSelect) {
            onSelect({name: ingredientName, image: imageURL,})
            console.log
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