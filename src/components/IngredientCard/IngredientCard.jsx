import styles from "./IngredientCard.module.css"
import { FaWindowClose } from "react-icons/fa";
import { useContext } from "react";

import { SelectedIngredientsContext } from "../../contexts/selectedIngredientsContext";


function IngredientCard({image, name}) {

    const { removeIngredientsFromSelectedList } = useContext(SelectedIngredientsContext)

    function handleRemove() {
        if(removeIngredientsFromSelectedList) {
            removeIngredientsFromSelectedList({name: name, image: image});
        }
    }


    return(
        <div className={styles.cardContainer}>
            <FaWindowClose className={styles.closeIcon}  onClick={handleRemove} />
            <div className={styles.containerImage}>
                <img src={image} alt={name} />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default IngredientCard;