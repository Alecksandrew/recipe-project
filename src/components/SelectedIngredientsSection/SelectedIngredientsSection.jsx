import styles from "./SelectedIngredientsSection.module.css"
import IngredientCard from "../IngredientCard/IngredientCard"

import { useCallback, useContext} from 'react'
import { SelectedIngredientsStateContext } from "../../contexts/selectedIngredientsStateContext";


function SelectedIngredientsSection({className}) {

    const state = useContext(SelectedIngredientsStateContext)
     
    const listSelectedIngredients = useCallback((selectedIngredients) => {
        if(!selectedIngredients) return

        return selectedIngredients.map((selectedIngredient, index) => {
            return <li key={index}>
                < IngredientCard 
                name={selectedIngredient.name} 
                image={selectedIngredient.image}
                />
            </li>
        })
    },[])
    
    
    return(
        <section className={className}>
            <h2 className={styles.h2}>Selected ingredients</h2>
            <ul className={styles.selectedIngredientsContainer}>
                {listSelectedIngredients(state.selectedIngredients)}
                
            </ul>
        </section>
    )
};

export default SelectedIngredientsSection
;
