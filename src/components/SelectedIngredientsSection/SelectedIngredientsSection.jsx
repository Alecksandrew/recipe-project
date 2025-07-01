import styles from "./SelectedIngredientsSection.module.css"
import IngredientCard from "../IngredientCard/IngredientCard"

import { useContext } from 'react'
import { SelectedIngredientsStateContext } from "../../contexts/selectedIngredientsStateContext";


function SelectedIngredientsSection({className}) {

    const selectedIngredients = useContext(SelectedIngredientsStateContext)
     
    function listSelectedIngredients(selectedIngredients) {
        if(!selectedIngredients) return

        return selectedIngredients.map((selectedIngredient, index) => {
            return <li key={index}>
                < IngredientCard 
                name={selectedIngredient.name} 
                image={selectedIngredient.image}
                />
            </li>
        })
    }
    
    
    return(
        <section className={className}>
            <h2>Selected ingredients</h2>
            <ul className={styles.selectedIngredientsContainer}>
                {listSelectedIngredients(selectedIngredients)}
                
            </ul>
        </section>
    )
};

export default SelectedIngredientsSection
;
