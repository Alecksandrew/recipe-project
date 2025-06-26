import DataInColumn from "../components/dataInColumn/dataInColumn";
import styles from "./RecipeDetails.module.css"
import { useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';


function RecipeDetails() {
    const location = useLocation();
    const recipeData = location.state;
    console.log(recipeData);

    const ingredients = recipeData.extendedIngredients;
    const organizedIngredients = ingredients.map(ingredientInfo => {
        return [ingredientInfo.original.toLowerCase()]
    });

    const instructionsSteps = recipeData.analyzedInstructions[0].steps;

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


    // Logic to show more or less of the description
    const readMoreButton = useRef(null);
    const descriptionTag = useRef(null);
    const [ isExpanded, setIsExpanded ] = useState(false);

    useEffect(() => {
        const isOverflowing = descriptionTag.current.scrollHeight > descriptionTag.current.clientHeight;
        
        isOverflowing ? readMoreButton.current.style.display = "block" : readMoreButton.current.style.display = "none";
    }, []);

    function handleReadMoreClick() {
        if (!isExpanded) {
            readMoreButton.current.innerText = "Read Less";
            descriptionTag.current.style.cssText = `
                display: block;
                -webkit-line-clamp: unset;
                line-clamp: unset;
                -webkit-box-orient: unset;
                overflow: visible;
                text-overflow: unset;
            `;
        }
        else {
            readMoreButton.current.innerText = "Read More";
            descriptionTag.current.style.cssText = `
                display :-webkit-box;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            `;
        }

        setIsExpanded(!isExpanded) 
    }

    return (
        <div className={styles.containerWholePage}>
            <div className={styles.containerMainContent}>
                <h1 className={styles.h1}>{recipeData.title}</h1>
                <p className={styles.description} dangerouslySetInnerHTML={{__html: recipeData.summary}} ref={descriptionTag}></p>
                <button className={styles.btnReadMore} ref={readMoreButton} onClick={handleReadMoreClick}>Read More</button>
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