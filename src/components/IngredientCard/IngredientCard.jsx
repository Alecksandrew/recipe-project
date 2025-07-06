import styles from "./IngredientCard.module.css"
import { FaWindowClose } from "react-icons/fa";
import { useContext } from "react";

import { SelectedIngredientsActionsContext } from "../../contexts/selectedIngredientsActionsContext";


function IngredientCard({image, name}) {

    const { dispatch } = useContext(SelectedIngredientsActionsContext)

    function handleRemove() {
        dispatch({ type: "REMOVE_FROM_SELECTED_INGREDIENTS", payload: {name: name, image: image}});
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