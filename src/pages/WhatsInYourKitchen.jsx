import styles from "./WhatsInYourKitchen.module.css"

import { useState, useEffect, useRef } from "react"

import IngredientCard from "../components/IngredientCard/IngredientCard.jsx"
import KitchenSearchSection from "../components/KitchenSearchSection/KitchenSearchSection.jsx"



function WhatsInYourKitchen() {
   
    const [ selectedIngredients, setSelectedIngredients] = useState([]);

    const [ tolerance, setTolerance] = useState(0);



    function makeIngredientBecomeSelected(ingredient) {
        setSelectedIngredients( prevSelected => [...prevSelected, ingredient])
    }


    function listSelectedIngredients(selectedIngredients) {
        if(!selectedIngredients) return

        return selectedIngredients.map((selectedIngredient, index) => {
            return <li key={index}>
                < IngredientCard 
                name={selectedIngredient.name} 
                image={selectedIngredient.image}
                onRemove={() => removeIngredientsFromSelectedList(selectedIngredient)}
                />
            </li>
        })
    }

    function removeIngredientsFromSelectedList(ingredientObjToRemove) {
        setSelectedIngredients(prevSelectedIngredients => prevSelectedIngredients.filter(ingredientObj => ingredientObj.name !== ingredientObjToRemove.name))
    }



    
    async function fetchRecipesWithSelectedIngredients() {
        if(!selectedIngredients.lenght === 0) return;
        const selectedIngredientsString = selectedIngredients.map(ingredient => ingredient.join(","))

        const findByIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients"
        const params = new URLSearchParams({
            apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
            ingredients: selectedIngredientsString,
            ranking: 2,
            ignorePantry: false,
        })
        

        const response = await fetch(`${findByIngredientURL}?${params.toString()}`)
        const data = await response.json();

        
    }


    return(
        <>
            <h1 className={styles.titlePage}>Find out awesome recipes with ingredients you have in your kitchen!</h1>
            <form method="get" className={styles.form}>
                <KitchenSearchSection onIngredientSelect={makeIngredientBecomeSelected}/>
                
                <section className={styles.section}>
                    <h2>Selected ingredients</h2>
                    <ul className={styles.selectedIngredientsContainer}>
                        {listSelectedIngredients(selectedIngredients)}
                        
                    </ul>
                </section>
                <section className={styles.section}>
                    <h2>Tolerance Control</h2>
                    <p>It will show recipes with some ingredients you dont have in your kitchen</p>
                    <div className={styles.toleranceContainer}>
                        <label htmlFor="tolerance" className={styles.labelTolerance}>
                            <span>Tolerance level:0</span>
                        </label>
                        <input type="range" min={0} max={6} step={1} id="tolerance" name="tolerance"/>
                    </div>
                </section>
                <button type="submit" onClick={fetchRecipesWithSelectedIngredients}>Search recipes</button>
            </form>
            <h2>Selected recipes</h2>
        </>
    )

}

export default WhatsInYourKitchen;