import DataInColumn from "../components/dataInColumn/dataInColumn";
import ExpandableDescription from "../components/ExpandableDescription/ExpandableDescription";

import styles from "./RecipeDetails.module.css"

import { useFetchRecipeDetailsByID } from "../hooks/useFetchDataByID"; 
import { useOrganizeData } from "../hooks/useOrganizeData";


function RecipeDetails() {
    
    const { recipeData, isLoading } = useFetchRecipeDetailsByID();
    const { organizedIngredients, organizedInstructions, organizedMoreInfos } = useOrganizeData(recipeData)

    if (isLoading) {
        return <div>Loading...</div>;
    }

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