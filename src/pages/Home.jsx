import RecipeCard from '../components/RecipeCard/RecipeCard.jsx';

import "../pages/Home.css";
import SearchBar from "../components/SearchBar/SearchBar.jsx"
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {

    const [recipesData, setRecipesData] = useState(null);

    /*
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
    */

    function listRecipeCardsWithData() { 
        if (!recipesData) return <p>Carregando receitas...</p>;
        
        return  recipesData.map((recipe) => {
           
             return <RecipeCard 
                    key={recipe.title}
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


    return(
        <>
            <main>
                <h1>Inspiration for your next recipe</h1>
                <p>Discover thousands tasty recipes and find out the perfect inspiration for each situation</p>
                <SearchBar/>
                <div className="overlay-main"></div>
            </main>
            <section className="popular-recipes">
                <h2>Popular Recipes</h2>
                <div className="recipe-grid-home">
                    {listRecipeCardsWithData()}
                </div>
            </section>
        </>
        
    )

}

export default Home;