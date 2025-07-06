import { useState } from "react";

function useSearchRecipesByIngredients() {
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [hasDetailedRecipes, setHasDetailedRecipes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  async function fetchRecipesWithSelectedIngredients({
    selectedIngredients,
    basicIngredients,
    exactTolerance,
    tolerance,
  }) {
    
    if (selectedIngredients.length === 0) return;

    setIsLoading(true);
    setSelectedRecipes([]);

    const selectedIngredientsString = selectedIngredients
      .map((ingredient) => ingredient.name)
      .join(",");

    const findByIngredientURL =
      "https://api.spoonacular.com/recipes/findByIngredients";
    const params = new URLSearchParams({
      apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
      ingredients: selectedIngredientsString,
      ranking: 2,
      ignorePantry: basicIngredients,
      number: exactTolerance == true && tolerance >= 1 ? 100 : 12,
    });

    //First fetch -> Only fetch selected recipes
    let dataWithTolerance;

    try {
      const numberOfRecipesToShow = 12;
      const response = await fetch(
        `${findByIngredientURL}?${params.toString()}`
      );

      if (!response.ok) {
        if(response.status === 402) {
            setApiError(true);
            setIsLoading(false);
            return;
        }
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const basicSelectedData = await response.json();

      if(basicSelectedData.length === 0) {
        setSelectedRecipes([]);
        return;
      }

      dataWithTolerance = basicSelectedData
        .filter((recipe) =>
          exactTolerance
            ? recipe.missedIngredientCount === tolerance
            : recipe.missedIngredientCount <= tolerance
        )
        .slice(0, numberOfRecipesToShow);

      setSelectedRecipes(dataWithTolerance);
    } catch (error) {
      console.error(error);
      setSelectedRecipes([]);
    }

    //Second fetch -> Get more details about each recipe in order to show fill recipe card
    const severalRecipesURL =
      "https://api.spoonacular.com/recipes/informationBulk";
    const selectedRecipesStringIDs = dataWithTolerance
      .map((data) => data.id)
      .join(",");
    const severalRecipersParams = new URLSearchParams({
      apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
      ids: selectedRecipesStringIDs,
    });

    try {
      const detailedResponse = await fetch(
        `${severalRecipesURL}?${severalRecipersParams}`
      );

      if (!detailedResponse.ok) {
        if(detailedResponse.status === 402) {
            setApiError(true);
            setIsLoading(false);
            return;
        }
        throw new Error(
          `${detailedResponse.status} ${detailedResponse.statusText}`
        );
      }

      const detailedSelectedData = await detailedResponse.json();

      const combinedData = detailedSelectedData.map((detailedRecipe) => {
        const someDataFromFirstFetch = dataWithTolerance.find(
          (recipe) => recipe.id === detailedRecipe.id
        );

        return {
          ...detailedRecipe,
          missedIngredientCount: someDataFromFirstFetch.missedIngredientCount,
          usedIngredientCount: someDataFromFirstFetch.usedIngredientCount,
        };
      });

      setSelectedRecipes(combinedData);
      setHasDetailedRecipes(true);
    } catch (error) {
      console.log(error);
      setSelectedRecipes([]);
    } finally {
        setIsLoading(false);
    }
    
  }

  return {
    selectedRecipes,
    hasDetailedRecipes,
    isLoading,
    setApiError,
    apiError,
    fetchRecipesWithSelectedIngredients,
  };
}

export default useSearchRecipesByIngredients;
