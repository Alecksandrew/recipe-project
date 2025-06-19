import DataInColumn from "../components/dataInColumn/dataInColumn";
import "./RecipeDetails.css"
import { useLocation } from 'react-router-dom';


function RecipeDetails() {
    const location = useLocation();
    const recipeData = location.state;

    return (
        <>
            <h1>{recipeData.title}</h1>
            <p dangerouslySetInnerHTML={{__html: recipeData.summary}}></p>
            <img src={`${recipeData.image}`} alt={`Imagem do ${recipeData.title}`} />
            <DataInColumn title={"Ingredientes"} titlePriority={2} />
        </>


    )
}

export default RecipeDetails;