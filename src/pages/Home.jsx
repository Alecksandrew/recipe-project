import RecipeCard from '../components/RecipeCard/RecipeCard.jsx';

import styles from "../pages/Home.module.css";
import SearchBar from "../components/SearchBar/SearchBar.jsx"
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [recipesData, setRecipesData] = useState(null);

    useEffect(() => {
            const randomRecipesURL = "https://api.spoonacular.com/recipes/random";
            const randomRecipesParams = new URLSearchParams({
                apiKey:"6b0d610fe5cf4296b3dd9023ae8150fb",
                number: 12
            })

            fetch(`${randomRecipesURL}?${randomRecipesParams.toString()}`)
            .then((response) => response.json())
            .then((data) => {
                    setRecipesData(data.recipes)
                    })
            .catch((error) => console.log(error))
    }, []);

    function sendRecipeDataToOtherPage(data) {
        navigate(`recipe/${data.id}`, { state: data})
    };
    
    function listRecipeCardsWithData() { 
        if (!recipesData) return <p className={styles.loadingText}>Carregando receitas...</p>;
        console.log(recipesData);
        return  recipesData.map((recipe) => {
             return <RecipeCard 
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
                });    
    };

    function fetchSpecificRecipes(e) {
        e.preventDefault()

        const formData = new FormData(e.target);
        const params = new URLSearchParams(formData);
        params.append("number", 12);
        const apiKey = "6b0d610fe5cf4296b3dd9023ae8150fb";
        const url = `https://api.spoonacular.com/recipes/complexSearch?${params}&apiKey=${apiKey}`

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setRecipesData(data.results);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <>
            <main className={styles.main}>
                <h1 className={styles.h1}>Inspiration for your next recipe</h1>
                <p className={styles.mainP}>Discover thousands tasty recipes and find out the perfect inspiration for each situation</p>
                <SearchBar placeHolder="Search recipes by ingredients, nationalities.." onSubmit={fetchSpecificRecipes}/>
                <div className="overlay blur shadow"></div>
            </main>
            <section className={styles.popularRecipes}>
                <h2 className={styles.h2}>Popular Recipes</h2>
                <div className={styles.recipeGridHome}>
                    {listRecipeCardsWithData()}
                </div>
            </section>
        </>
        
    )
}

export default Home;