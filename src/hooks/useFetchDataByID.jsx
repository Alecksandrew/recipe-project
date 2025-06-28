import { useEffect, useState} from "react";
import { useLocation, useParams} from "react-router-dom"

export const useFetchRecipeDetailsByID = function(){
    const location = useLocation();
    const [ recipeData, setRecipeData ] = useState(location.state);
    const [ isLoading, setIsLoading ] = useState(false)

    const { id } = useParams();

    useEffect(() => {
        if(!recipeData) {
            setIsLoading(true);

            fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=6b0d610fe5cf4296b3dd9023ae8150fb`)
            .then(response => response.json())
            .then(data => {
                setRecipeData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching recipe", error);
                setRecipeData(null);
                setIsLoading(false);
            })
        }
            
    }, []);

    return { recipeData, isLoading }

}