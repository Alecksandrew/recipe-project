import styles from "./WhatsInYourKitchen.module.css";

import { OrbitProgress } from "react-loading-indicators";

//Hooks
import { useNavigate } from "react-router-dom";
import { useReducer, useCallback } from "react";
import useSearchRecipesByIngredients from "../hooks/useSearchRecipesByIngredients.jsx";

//Contexts
import { SelectedIngredientsStateContext } from "../contexts/selectedIngredientsStateContext.js";
import { SelectedIngredientsActionsContext } from "../contexts/selectedIngredientsActionsContext.js";

//Components
import KitchenSearchSection from "../components/KitchenSearchSection/KitchenSearchSection.jsx";
import SelectedIngredientsSection from "../components/SelectedIngredientsSection/SelectedIngredientsSection.jsx";
import ToleranceSection from "../components/ToleranceSection/ToleranceSection.jsx";
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx";
import ToggleButton from "../components/ToggleButton/ToggleButton.jsx";
import SnackBar from "../components/SnackBar/SnackBar.jsx";

function kitchenReducer(state, action) {
  switch (action.type) {
    case "SET_TOLERANCE":
      return { ...state, tolerance: action.payload };
    case "SET_EXACT_TOLERANCE":
      return { ...state, exactTolerance: !state.exactTolerance };
    case "ADD_TO_SELECTED_INGREDIENTS":
      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    case "REMOVE_FROM_SELECTED_INGREDIENTS":
      return {
        ...state,
        selectedIngredients: state.selectedIngredients.filter(
          (ingredientObj) => ingredientObj.name !== action.payload.name
        ),
      };
    case "SET_BASIC_INGREDIENTS":
      return { ...state, basicIngredients: !state.basicIngredients };

    case "INCREMENT_COUNT_SELECTED_TIMES":
      return { ...state, countSelectedTimes: state.countSelectedTimes + 1 };
    default:
      throw new Error();
  }
}

function WhatsInYourKitchen() {
  const navigate = useNavigate();

  const initialState = {
    selectedIngredients: [],
    basicIngredients: false,
    tolerance: 0,
    exactTolerance: false,
    countSelectedTimes: 0,
  };
  const [state, dispatch] = useReducer(kitchenReducer, initialState);

  const {
    selectedRecipes,
    hasDetailedRecipes,
    isLoading,
    fetchRecipesWithSelectedIngredients,
  } = useSearchRecipesByIngredients();
  function handleFetchSelectedRecipe(e) {
    e.preventDefault();

    fetchRecipesWithSelectedIngredients({
      selectedIngredients: state.selectedIngredients,
      basicIngredients: state.basicIngredients,
      exactTolerance: state.exactTolerance,
      tolerance: state.tolerance,
    });
  }

  const sendRecipeDataToOtherPage = useCallback(
    (data) => {
      navigate(`/recipe/${data.id}`, { state: data });
    },
    [navigate]
  );

  const listSelectedRecipes = useCallback(() => {
    if (!hasDetailedRecipes)
      return (
        <p className={styles.loadingText}>
          Select some ingredients and hit the search button!
        </p>
      );

    if (selectedRecipes.length === 0 || !selectedRecipes)
      return <p>No recipe found! Try to use other search options!</p>;

    return selectedRecipes.map((selectedRecipe) => {
      return (
        <RecipeCard
          onClick={() => sendRecipeDataToOtherPage(selectedRecipe)}
          key={selectedRecipe.id}
          name={selectedRecipe.title}
          alternativeText={selectedRecipe.title}
          image={selectedRecipe.image}
          description={selectedRecipe.summary}
          type={selectedRecipe.dishTypes?.[0] || "Unknown"}
          readyInMinutes={selectedRecipe.readyInMinutes || null}
          iconColor={"#27AE60"}
          missedIngredients={selectedRecipe.missedIngredientCount}
          usedIngredients={selectedRecipe.usedIngredientCount}
          missedIngredientsContainer={true}
        />
      );
    });
  }, [hasDetailedRecipes, selectedRecipes, sendRecipeDataToOtherPage]);

  return (
    <>
      <h1 className={styles.titlePage}>
        Find out awesome recipes with ingredients you have in your kitchen!
      </h1>
      <form method="get" className={styles.form}>
        <SelectedIngredientsActionsContext.Provider value={dispatch}>
          <SelectedIngredientsStateContext.Provider value={state}>
            <KitchenSearchSection
              className={`${styles.kitchenSearchSection} ${styles.shadowBox}`}
            />
            <SelectedIngredientsSection
              className={`${styles.selectedIngredientsSection} ${styles.shadowBox}`}
            />
          </SelectedIngredientsStateContext.Provider>
          <div className={styles.toleranceAndSearch}>
            <ToleranceSection
              classNameFromParent={`${styles.toleranceSection} ${styles.shadowBox}`}
            />
            <div className={styles.containerSearch}>
              <label
                className={styles.containerBasicIngredients}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: "SET_BASIC_INGREDIENTS" });
                }}
              >
                <span>Include basic ingredients</span>
                <ToggleButton
                  className={styles.containerToggle}
                  isChecked={state.basicIngredients}
                />
              </label>
              <button
                type="submit"
                onClick={handleFetchSelectedRecipe}
                className={styles.btnSubmit}
                disabled={isLoading}
              >
                Search recipes
              </button>
            </div>
          </div>
        </SelectedIngredientsActionsContext.Provider>
      </form>
      <section className={styles.containerH2SelectedRecipes}>
        <h2>Selected recipes</h2>
        {isLoading ? (
          <div className={styles.containerLoading}>
            <OrbitProgress
              variant="track-disc"
              dense
              color="var(--Paleta01)"
              size="medium"
            />
          </div>
        ) : (
          <div className={styles.containerSelectedRecipes}>
            {listSelectedRecipes()}
          </div>
        )}
      </section>
      <SnackBar
        popup={state.countSelectedTimes > 1}
        className={styles.snackBar}
        text={"This ingredient have already been choosen!"}
      />
    </>
  );
}

export default WhatsInYourKitchen;
