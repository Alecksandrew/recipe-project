export const organizeData = function(recipeData){

    if (!recipeData) {
        return {    
                organizedIngredients: [], 
                organizedInstructions: [], 
                organizedMoreInfos: [] 
                };
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
        ["Dish type", recipeData.dishTypes?.length > 0 ? recipeData.dishTypes[0] : "Unknown"],
        ["Ready in:", recipeData.readyInMinutes ? `${recipeData.readyInMinutes} min` : "Unknown"],
        ["Servings", recipeData.servings ? `${recipeData.servings}` : "Unknown"],
        ["Nationality", recipeData.cuisines?.length > 0 ? recipeData.cuisines[0] : "Unknown"],
        ["Restrictions", recipeData.diets?.length > 0 ? recipeData.diets.join(" / ") : "None"]

    ];

    return { organizedIngredients, organizedInstructions, organizedMoreInfos}
}