import DataInColumn from "../components/dataInColumn/dataInColumn";
import styles from "./RecipeDetails.module.css"
import { useLocation } from 'react-router-dom';


function RecipeDetails() {
    const location = useLocation();
    const recipeData = location.state;
    console.log(recipeData);

    const organizedIngredients = recipeData.extendedIngredients.map(ingredientInfo => {
        return [ingredientInfo.original]
    });

    const organizedInstructions = recipeData.analyzedInstructions[0].steps.map(step => {
        return [step.step]
    })

    const organizedMoreInfos = [
        ["Dish type", `${recipeData.dishTypes[0]}`],
        ["Ready in:", `${recipeData.readyInMinutes} min`], 
        ["Servings", `${recipeData.servings}`], 
        ["Nationality", `${recipeData.cuisine}`], 
        ["Restrictions", `${recipeData.diets.join(" /\n ")}`]
];

    return (
        <>
            <div className={styles.containerMainContent}>
                <h1 className={styles.h1}>{recipeData.title}</h1>
                <p className={styles.description} dangerouslySetInnerHTML={{__html: recipeData.summary}}></p>
                <button>Read More</button>
            </div>
            <img src={`${recipeData.image}`} alt={`Imagem do ${recipeData.title}`} />
            <DataInColumn title={"Ingredients"} arrayOptionsKeyValue={organizedIngredients}/>
            <DataInColumn title={"Instructions"} arrayOptionsKeyValue={organizedInstructions}/>
            <DataInColumn title={"More infos"} arrayOptionsKeyValue={organizedMoreInfos}/>
        </>


    )
}

export default RecipeDetails;