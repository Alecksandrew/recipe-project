import styles from "./IngredientCard.module.css"
import { FaWindowClose } from "react-icons/fa";


function IngredientCard({image, name, onRemove}) {


    return(
        <div className={styles.cardContainer}>
            <FaWindowClose className={styles.closeIcon}  onClick={onRemove} />
            <div className={styles.containerImage}>
                <img src={image} alt={name} />
            </div>
            <p>{name}</p>
        </div>
    )
}

export default IngredientCard;