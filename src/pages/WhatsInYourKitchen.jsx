import styles from "./WhatsInYourKitchen.module.css"
import { useNavigate } from "react-router-dom" 
import { useState, useEffect, useRef } from "react"


import KitchenSearchSection from "../components/KitchenSearchSection/KitchenSearchSection.jsx"
import SelectedIngredientsSection from "../components/SelectedIngredientsSection/SelectedIngredientsSection.jsx"
import ToleranceSection from "../components/ToleranceSection/ToleranceSection.jsx"
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx"



function WhatsInYourKitchen() {
    const navigate = useNavigate();

    const [ selectedIngredients, setSelectedIngredients] = useState([]);
    const [ selectedRecipes, setSelectedRecipes ] = useState([]);
    const [ tolerance, setTolerance] = useState(0);

    function makeIngredientBecomeSelected(ingredient) {
        setSelectedIngredients( prevSelected => [...prevSelected, ingredient])
    }

    function removeIngredientsFromSelectedList(ingredientObjToRemove) {
        setSelectedIngredients(prevSelectedIngredients => prevSelectedIngredients.filter(ingredientObj => ingredientObj.name !== ingredientObjToRemove.name))
    }


    async function fetchRecipesWithSelectedIngredients(e) {
        e.preventDefault();
        
        if(selectedIngredients.length === 0) return;
        const selectedIngredientsString = selectedIngredients.map(ingredient => ingredient.name).join(",");

        const findByIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients"
        const params = new URLSearchParams({
            apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
            ingredients: selectedIngredientsString,
            ranking: 2,
            ignorePantry: false,
            number:12
        })
        

        const response = await fetch(`${findByIngredientURL}?${params.toString()}`)
        const selectedData = await response.json();
        setSelectedRecipes(selectedData);

    }

    function listSelectedRecipes() { 
        if (!selectedRecipes || selectedRecipes.length === 0) return <p className={styles.loadingText}>Carregando receitas...</p>;

        return  selectedRecipes.map((selectedRecipe) => {
                    return <RecipeCard 
                            onClick={null}
                            key={selectedRecipe.id}
                            name={selectedRecipe.title} 
                            alternativeText={selectedRecipe.title} 
                            image={selectedRecipe.image} 
                            description={selectedRecipe.summary || null} 
                            type={selectedRecipe.dishTypes?.[0] || null} 
                            readyInMinutes={selectedRecipe.missedIngredientCount || null} 
                            iconColor={"#27AE60"}
                            />
                });
    }

    return(
        <>
            <h1 className={styles.titlePage}>Find out awesome recipes with ingredients you have in your kitchen!</h1>
            <form method="get" className={styles.form}>
                <KitchenSearchSection 
                onIngredientSelect={makeIngredientBecomeSelected}
                />
                <SelectedIngredientsSection 
                selectedIngredients={selectedIngredients} 
                removeFromSelectedOnes={removeIngredientsFromSelectedList}
                />
                <ToleranceSection />
               
                <button type="submit" onClick={fetchRecipesWithSelectedIngredients}>Search recipes</button>
            </form>
            <section>
                <h2>Selected recipes</h2>
                <div className={styles.containerSelectedRecipes}>
                    {listSelectedRecipes()}
                </div>
            </section>
        </>
    )

}

export default WhatsInYourKitchen;