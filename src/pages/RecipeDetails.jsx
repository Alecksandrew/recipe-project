import DataInColumn from "../components/dataInColumn/dataInColumn";
import styles from "./RecipeDetails.module.css"
import { useLocation, useParams } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useFetchRecipeDetailsByID } from "../hooks/useFetchDataByID"; 
import ExpandableDescription from "../components/ExpandableDescription/ExpandableDescription";


function RecipeDetails() {
    
    const { recipeData, isLoading } = useFetchRecipeDetailsByID();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const ingredients = recipeData.extendedIngredients;
    const organizedIngredients = ingredients.map(ingredientInfo => {
        return [ingredientInfo.original.toLowerCase()]
    });

    const instructionsSteps = recipeData?.analyzedInstructions?.[0]?.steps || [] ;

    const organizedInstructions = instructionsSteps.flatMap(step => {
        const stepText = step.step;

        const isThereMoreThanOneStepTogether = /\.\s*[A-Z]/.test(stepText)

        if (isThereMoreThanOneStepTogether) {
            const stepsArray = stepText.trim()
            .split(".")
            .filter(singleStep => singleStep.trim() !== "")
            .map(singleStep => singleStep.trim());

            stepsArray.forEach((singleStep, index) => stepsArray[index] = [singleStep])
            return stepsArray
        }
        
        return [[stepText]]
    })


    const organizedMoreInfos = [
        ["Dish type", `${recipeData.dishTypes[0]}`],
        ["Ready in:", `${recipeData.readyInMinutes} min`], 
        ["Servings", `${recipeData.servings}`], 
        ["Nationality", recipeData.cuisine ? `${recipeData.cuisine}` : `Unknown`], 
        ["Restrictions", recipeData.diets.length > 0 ? `${recipeData.diets.join(" /\n ")}` : <span>None</span>]

    ];

    return (
        <div className={styles.containerWholePage}>
            <div className={styles.containerMainContent}>
                <h1 className={styles.h1}>{recipeData.title}</h1>
                <ExpandableDescription 
                description={recipeData.summary}
                descriptionClassName={styles.description}
                btnClassName={styles.btnReadMore}
                />
            </div>
            <div className={styles.containerFoodImage}>
                <img className={styles.foodImage} src={`${recipeData.image}`} alt={`Imagem do ${recipeData.title}`} />
            </div>

            <div className={styles.data01}>
                <DataInColumn title={"Ingredients"} arrayOptionsKeyValue={organizedIngredients}/>
            </div>
            <div  className={styles.data02}>
                <DataInColumn title={"Instructions"} arrayOptionsKeyValue={organizedInstructions}/>
            </div>
            <div  className={styles.data03}>
                <DataInColumn title={"More infos"} arrayOptionsKeyValue={organizedMoreInfos}/>
            </div>

        </div>


    )
}

export default RecipeDetails;