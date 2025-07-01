import styles from "./WhatsInYourKitchen.module.css"

import { useNavigate } from "react-router-dom" 
import { useState, useEffect, useRef} from "react"
import { SelectedIngredientsContext } from "../contexts/selectedIngredientsContext.js";


import KitchenSearchSection from "../components/KitchenSearchSection/KitchenSearchSection.jsx"
import SelectedIngredientsSection from "../components/SelectedIngredientsSection/SelectedIngredientsSection.jsx"
import ToleranceSection from "../components/ToleranceSection/ToleranceSection.jsx"
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx"

function WhatsInYourKitchen() {
    const navigate = useNavigate();

    

    const [ selectedIngredients, setSelectedIngredients] = useState([]);
    const [ selectedRecipes, setSelectedRecipes ] = useState([]);
    const [ hasDetailedRecipes, setHasDetailedRecipes] = useState(false);
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
        
        //First fetch -> Only fetch selected recipes
        let basicSelectedData;

        try {
            const response = await fetch(`${findByIngredientURL}?${params.toString()}`)
            basicSelectedData = await response.json();
            setSelectedRecipes(basicSelectedData);
        }
        catch(error){
            console.error(error)
            setSelectedIngredients([]);
        }

        //Second fetch -> Get more details about each recipe in order to show fill recipe card
        const severalRecipesURL = "https://api.spoonacular.com/recipes/informationBulk"
        const selectedRecipesStringIDs = basicSelectedData.map(data => data.id).join(",")
        const severalRecipersParams = new URLSearchParams({
            apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
            ids: selectedRecipesStringIDs
        })

        try {
            const detailedResponse = await fetch (`${severalRecipesURL}?${severalRecipersParams}`)
            const detailedSelectedData = await detailedResponse.json()
            
            const combinedData = detailedSelectedData.map( detailedRecipe => {
                const someDataFromFirstFetch = basicSelectedData.find(recipe => recipe.id === detailedRecipe.id)

                return {...detailedRecipe, missedIngredientCount: someDataFromFirstFetch.missedIngredientCount, usedIngredientCount: someDataFromFirstFetch.usedIngredientCount}
            })
            
            setSelectedRecipes(combinedData);
            setHasDetailedRecipes(true);
            console.log(combinedData);
        }
        catch(error) {
            console.log(error)
            setSelectedRecipes([])
        };
    }

    function sendRecipeDataToOtherPage(data) {
                navigate(`/recipe/${data.id}`, { state: data})
    }

    function listSelectedRecipes() { 
        if (!hasDetailedRecipes) return <p className={styles.loadingText}>Carregando receitas...</p>;

        return  selectedRecipes.map((selectedRecipe) => {
                    return <RecipeCard 
                            onClick={() => sendRecipeDataToOtherPage(selectedRecipe)}
                            key={selectedRecipe.id}
                            name={selectedRecipe.title} 
                            alternativeText={selectedRecipe.title} 
                            image={selectedRecipe.image} 
                            description={selectedRecipe.summary} 
                            type={selectedRecipe.dishTypes[0]} 
                            readyInMinutes={selectedRecipe.missedIngredientCount || null} 
                            iconColor={"#27AE60"}
                            />
                });
    }

    return(
        <>
            <h1 className={styles.titlePage}>Find out awesome recipes with ingredients you have in your kitchen!</h1>
            <form method="get" className={styles.form}>
                <SelectedIngredientsContext.Provider value={{selectedIngredients, makeIngredientBecomeSelected, removeIngredientsFromSelectedList}}>
                    <KitchenSearchSection
                    />
                    <SelectedIngredientsSection
                    />
                </SelectedIngredientsContext.Provider>
                <ToleranceSection />
               
                <button type="submit" onClick={fetchRecipesWithSelectedIngredients}>Search recipes</button>
            </form>
            <section className={styles.containerH2SelectedRecipes}>
                <h2>Selected recipes</h2>
                <div className={styles.containerSelectedRecipes}>
                    {listSelectedRecipes()}
                </div>
            </section>
        </>
    )

}

export default WhatsInYourKitchen;