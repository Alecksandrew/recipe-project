import styles from "./SelectedIngredientsSection.module.css"
import IngredientCard from "../IngredientCard/IngredientCard"

function SelectedIngredientsSection({selectedIngredients, removeFromSelectedOnes, classNameFromParent}) {
     
    function listSelectedIngredients(selectedIngredients) {
        if(!selectedIngredients) return

        return selectedIngredients.map((selectedIngredient, index) => {
            return <li key={index}>
                < IngredientCard 
                name={selectedIngredient.name} 
                image={selectedIngredient.image}
                onRemove={removeFromSelectedOnes}
                ingredient={selectedIngredient}
                />
            </li>
        })
    }
    
    
    return(
        <section className={`${styles.section} ${classNameFromParent}`}>
            <h2>Selected ingredients</h2>
            <ul className={styles.selectedIngredientsContainer}>
                {listSelectedIngredients(selectedIngredients)}
                
            </ul>
        </section>
    )
};

export default SelectedIngredientsSection
;
