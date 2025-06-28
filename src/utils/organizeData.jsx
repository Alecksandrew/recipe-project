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
        ["Dish type", `${recipeData.dishTypes[0]}`],
        ["Ready in:", `${recipeData.readyInMinutes} min`], 
        ["Servings", `${recipeData.servings}`], 
        ["Nationality", recipeData.cuisine ? `${recipeData.cuisine}` : `Unknown`], 
        ["Restrictions", recipeData.diets.length > 0 ? `${recipeData.diets.join(" /\n ")}` : <span>None</span>]

    ];

    return { organizedIngredients, organizedInstructions, organizedMoreInfos}
}