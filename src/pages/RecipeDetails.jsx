import { useLocation } from 'react-router-dom';

function RecipeDetails() {
    const location = useLocation();
    const recipeData = location.state;

    return (
        <>
            <h1>{recipeData.title}</h1>
            <p dangerouslySetInnerHTML={{__html: recipeData.summary}}></p>
        </>


    )
}

export default RecipeDetails;