import styles from "./WhatsInYourKitchen.module.css"

import { useNavigate } from "react-router-dom" 
import { useState, useEffect, useRef, useCallback} from "react"
import {  SelectedIngredientsStateContext } from "../contexts/selectedIngredientsStateContext.js";
import { SelectedIngredientsActionsContext } from "../contexts/selectedIngredientsActionsContext.js";


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
    const [ basicIngredients, setBasicIngredients] = useState(false); //USER CAN DECIDE IF HE WANNA EITHER INCLUDE INGREDIENTS LIKE SALT, FLOUR IN THE SEARCH OR NOT -> IGNORE PANTRY
    const [ exactTolerance, setExactTolerance] = useState(false); // Feature which the user can decide either he wanna show only recipes with the exact tolerance or with the exact tolerance and other

    const makeIngredientBecomeSelected = useCallback((ingredient) => {
        setSelectedIngredients( prevSelected => [...prevSelected, ingredient])
    }, [])

    const removeIngredientsFromSelectedList = useCallback((ingredientObjToRemove) => {
        setSelectedIngredients(prevSelectedIngredients => prevSelectedIngredients.filter(ingredientObj => ingredientObj.name !== ingredientObjToRemove.name))
    },[])


    async function fetchRecipesWithSelectedIngredients(e) {
        e.preventDefault();
        
        if(selectedIngredients.length === 0) return;
        const selectedIngredientsString = selectedIngredients.map(ingredient => ingredient.name).join(",");

        const findByIngredientURL = "https://api.spoonacular.com/recipes/findByIngredients"
        const params = new URLSearchParams({
            apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
            ingredients: selectedIngredientsString,
            ranking: 2,
            ignorePantry: true,
            number: exactTolerance == true && tolerance >= 1 ? 100 : 12,
        })
        
        //First fetch -> Only fetch selected recipes
        let dataWithTolerance;

        try {
            const numberOfRecipesToShow = 12;
            const response = await fetch(`${findByIngredientURL}?${params.toString()}`)
            const basicSelectedData = await response.json();
            
            dataWithTolerance = basicSelectedData
            .filter(recipe => exactTolerance ? recipe.missedIngredientCount === tolerance : recipe.missedIngredientCount <= tolerance)
            .slice(0, numberOfRecipesToShow)
            
            setSelectedRecipes(dataWithTolerance);
            console.log(dataWithTolerance)
        }
        catch(error){
            console.error(error)
            setSelectedIngredients([]);
        }

        //Second fetch -> Get more details about each recipe in order to show fill recipe card
        const severalRecipesURL = "https://api.spoonacular.com/recipes/informationBulk"
        const selectedRecipesStringIDs = dataWithTolerance.map(data => data.id).join(",")
        const severalRecipersParams = new URLSearchParams({
            apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
            ids: selectedRecipesStringIDs
        })

        try {
            const detailedResponse = await fetch (`${severalRecipesURL}?${severalRecipersParams}`)
            const detailedSelectedData = await detailedResponse.json()
            
            const combinedData = detailedSelectedData.map( detailedRecipe => {
                const someDataFromFirstFetch = dataWithTolerance.find(recipe => recipe.id === detailedRecipe.id)

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

    const sendRecipeDataToOtherPage = useCallback((data) => {
                navigate(`/recipe/${data.id}`, { state: data})
    },[navigate])

    const listSelectedRecipes = useCallback(() => { 
        if (!hasDetailedRecipes) return <p className={styles.loadingText}>No recipe found</p>;

        return  selectedRecipes.map((selectedRecipe) => {

                        return <RecipeCard 
                            onClick={() => sendRecipeDataToOtherPage(selectedRecipe)}
                            key={selectedRecipe.id}
                            name={selectedRecipe.title} 
                            alternativeText={selectedRecipe.title} 
                            image={selectedRecipe.image} 
                            description={selectedRecipe.summary} 
                            type={selectedRecipe.dishTypes[0]} 
                            readyInMinutes={selectedRecipe.readyInMinutes || null} 
                            iconColor={"#27AE60"}
                            missedIngredients={selectedRecipe.missedIngredientCount}
                            usedIngredients={selectedRecipe.usedIngredientCount}
                            missedIngredientsContainer = {true}
                            />
                });
    }, [hasDetailedRecipes, selectedRecipes, sendRecipeDataToOtherPage])

    const modifyTolerance = useCallback((e) => {
        setTolerance(e.target.value)
    }, [])

    return(
        <>
            <h1 className={styles.titlePage}>Find out awesome recipes with ingredients you have in your kitchen!</h1>
            <form method="get" className={styles.form}>
                <SelectedIngredientsActionsContext.Provider value={{makeIngredientBecomeSelected, removeIngredientsFromSelectedList, modifyTolerance, tolerance}}>
                    <SelectedIngredientsStateContext.Provider value={selectedIngredients}>
                        <KitchenSearchSection className={`${styles.kitchenSearchSection} ${styles.shadowBox}`}
                        />
                        <SelectedIngredientsSection 
                        className={`${styles.selectedIngredientsSection} ${styles.shadowBox}`}
                        />
                    </SelectedIngredientsStateContext.Provider>
                    <ToleranceSection classNameFromParent={`${styles.toleranceSection} ${styles.shadowBox}`}/>
                </SelectedIngredientsActionsContext.Provider>
               
                <button 
                type="submit" 
                onClick={fetchRecipesWithSelectedIngredients} 
                className={styles.btnSubmit}>Search recipes</button>
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