import styles from "./WhatsInYourKitchen.module.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { SelectedIngredientsStateContext } from "../contexts/selectedIngredientsStateContext.js";
import { SelectedIngredientsActionsContext } from "../contexts/selectedIngredientsActionsContext.js";
import useSearchRecipesByIngredients from "../hooks/useSearchRecipesByIngredients.jsx";

import KitchenSearchSection from "../components/KitchenSearchSection/KitchenSearchSection.jsx";
import SelectedIngredientsSection from "../components/SelectedIngredientsSection/SelectedIngredientsSection.jsx";
import ToleranceSection from "../components/ToleranceSection/ToleranceSection.jsx";
import RecipeCard from "../components/RecipeCard/RecipeCard.jsx";
import ToggleButton from "../components/ToggleButton/ToggleButton.jsx";

function WhatsInYourKitchen() {
  const navigate = useNavigate();

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [tolerance, setTolerance] = useState(0);
  const [basicIngredients, setBasicIngredients] = useState(false); //USER CAN DECIDE IF HE WANNA EITHER INCLUDE INGREDIENTS LIKE SALT, FLOUR IN THE SEARCH OR NOT -> IGNORE PANTRY
  const [exactTolerance, setExactTolerance] = useState(false); // Feature which the user can decide either he wanna show only recipes with the exact tolerance or with the exact tolerance and other

  const {
    selectedRecipes,
    hasDetailedRecipes,
    isLoading,
    fetchRecipesWithSelectedIngredients,
  } = useSearchRecipesByIngredients();

  function handleFetchSelectedRecipe(e) {
    e.preventDefault();

    fetchRecipesWithSelectedIngredients({
      selectedIngredients: selectedIngredients,
      basicIngredients: basicIngredients,
      exactTolerance: exactTolerance,
      tolerance: tolerance,
    });
  }

  const makeIngredientBecomeSelected = useCallback((ingredient) => {
    setSelectedIngredients((prevSelected) => [...prevSelected, ingredient]);
  }, []);

  const removeIngredientsFromSelectedList = useCallback(
    (ingredientObjToRemove) => {
      setSelectedIngredients((prevSelectedIngredients) =>
        prevSelectedIngredients.filter(
          (ingredientObj) => ingredientObj.name !== ingredientObjToRemove.name
        )
      );
    },
    []
  );

  const sendRecipeDataToOtherPage = useCallback(
    (data) => {
      navigate(`/recipe/${data.id}`, { state: data });
    },
    [navigate]
  );

  const listSelectedRecipes = useCallback(() => {
    if (!hasDetailedRecipes)
      return <p className={styles.loadingText}>No recipe found</p>;

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

  const modifyTolerance = useCallback((e) => {
    setTolerance(Number(e.target.value));
  }, []);

  function handleBasicIngredients() {
    setBasicIngredients(!basicIngredients);
  }

  function handleExactTolerance() {
    setExactTolerance(!exactTolerance);
  }

  return (
    <>
      <h1 className={styles.titlePage}>
        Find out awesome recipes with ingredients you have in your kitchen!
      </h1>
      <form method="get" className={styles.form}>
        <SelectedIngredientsActionsContext.Provider
          value={{
            makeIngredientBecomeSelected,
            removeIngredientsFromSelectedList,
            modifyTolerance,
            tolerance,
            handleExactTolerance,
            exactTolerance,
          }}
        >
          <SelectedIngredientsStateContext.Provider value={selectedIngredients}>
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
                  handleBasicIngredients();
                }}
              >
                <span>Include basic ingredients</span>
                <ToggleButton
                  className={styles.containerToggle}
                  isChecked={basicIngredients}
                />
              </label>
              <button
                type="submit"
                onClick={handleFetchSelectedRecipe}
                className={styles.btnSubmit}
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
          <OrbitProgress
            variant="track-disc"
            dense
            color="var(--Paleta01)"
            size="medium"
          />
        ) : (
          <div className={styles.containerSelectedRecipes}>
            {listSelectedRecipes()}
          </div>
        )}
      </section>
    </>
  );
}

export default WhatsInYourKitchen;
