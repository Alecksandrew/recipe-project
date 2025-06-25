import DataInColumn from "../components/dataInColumn/dataInColumn";
import styles from "./RecipeDetails.module.css"
import { useLocation } from 'react-router-dom';


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
        if (instructionsSteps.length === 1) {
            const bigStringWithAllSteps = step.step;
            const stepsArray = bigStringWithAllSteps
            .split(".")
            .map(separetedStep => [separetedStep])

            return stepsArray;
        }
        
        return [[step.step.toLowerCase()]]
    })


    const organizedMoreInfos = [
        ["Dish type", `${recipeData.dishTypes[0]}`],
        ["Ready in:", `${recipeData.readyInMinutes} min`], 
        ["Servings", `${recipeData.servings}`], 
        ["Nationality", `${recipeData.cuisine}`], 
        ["Restrictions", `${recipeData.diets.join(" /\n ")}`]
];

    return (
        <div className={styles.containerWholePage}>
            <div className={styles.containerMainContent}>
                <h1 className={styles.h1}>{recipeData.title}</h1>
                <p className={styles.description} dangerouslySetInnerHTML={{__html: recipeData.summary}}></p>
                <button className={styles.btnReadMore} >Read More</button>
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