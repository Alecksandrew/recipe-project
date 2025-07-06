import RecipeCard from "../components/RecipeCard/RecipeCard.jsx";

import styles from "../pages/Home.module.css";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import Warning from "../components/Warning/Warning.jsx";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [recipesData, setRecipesData] = useState(null);
  const [apiError, setApiError] = useState(false);

  //first fetch to show random recipes
  useEffect(() => {
    const randomRecipesURL = "https://api.spoonacular.com/recipes/random";
    const randomRecipesParams = new URLSearchParams({
      apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
      number: 12,
    });

    fetch(`${randomRecipesURL}?${randomRecipesParams.toString()}`)
      .then((response) => {
        if (response.status === 402) return setApiError(true);
        response.json();
      })
      .then((data) => {
        setRecipesData(data.recipes);
      })
      .catch((error) => console.log(error));
  }, []);

  function sendRecipeDataToOtherPage(data) {
    navigate(`recipe/${data.id}`, { state: data });
  }

  const listRecipeCardsWithData = useCallback((data) => {
    if (!data)
      return <p className={styles.loadingText}>Carregando receitas...</p>;

    return data.map((recipe) => {
      return (
        <RecipeCard
          onClick={() => sendRecipeDataToOtherPage(recipe)}
          key={recipe.id}
          name={recipe.title}
          alternativeText={recipe.title}
          image={recipe.image}
          description={recipe.summary}
          type={recipe.dishTypes[0]}
          readyInMinutes={recipe.readyInMinutes}
          iconColor={"#27AE60"}
        />
      );
    });
  }, []);

  const fetchSpecificRecipes = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    e.target.reset();

    //first basic fetch
    const params = new URLSearchParams(formData);
    params.append("number", 12);

    const apiKey = "6b0d610fe5cf4296b3dd9023ae8150fb";
    const basicURL = `https://api.spoonacular.com/recipes/complexSearch?${params}&apiKey=${apiKey}`;

    fetch(basicURL)
      .then((response) => {
        if (response.status === 402) return setApiError(true);
        response.json();
      })
      .then((data) => {
        //second detailed fetch

        const stringWithIDS = data.results.map((recipe) => recipe.id).join(",");
        const detailedURL = `https://api.spoonacular.com/recipes/informationBulk?ids=${stringWithIDS}&apiKey=${apiKey}`;

        fetch(detailedURL)
          .then((response) => {
            if (response.status === 402) return setApiError(true);
            response.json();
          })
          .then((data) => {
            setRecipesData(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleOnCloseWarning() {
    setApiError(false);
  }

  return (
    <>
      <main className={styles.main}>
        {apiError && (
          <Warning
            title={"Request limit exceeded!"}
            text={
              "Please try again later. Requests reset every day at 9pm"
            }
            onClose={handleOnCloseWarning}
          />
        )}
        <h1 className={styles.h1}>Inspiration for your next recipe</h1>
        <p className={styles.mainP}>
          Discover thousands tasty recipes and find out the perfect inspiration
          for each situation
        </p>
        <SearchBar
          placeHolder="Search recipes by ingredients, nationalities.."
          onSubmit={fetchSpecificRecipes}
        />
        <div className="overlay blur shadow"></div>
      </main>
      <section className={styles.popularRecipes}>
        <h2 className={styles.h2}>Popular Recipes</h2>
        <div className={styles.recipeGridHome}>
          {listRecipeCardsWithData(recipesData)}
        </div>
      </section>
    </>
  );
}

export default Home;
