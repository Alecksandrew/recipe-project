import RecipeCard from '../components/RecipeCard/RecipeCard.jsx';

import "../pages/Home.css";
import SearchBar from "../components/SearchBar/SearchBar.jsx"
import { useEffect } from 'react';
import { useState } from 'react';

function Home() {

    const [bgURL, setBgURL] = useState(null);

    const randomRecipesURL = "https://api.spoonacular.com/recipes/random";
    const randomRecipesParams = new URLSearchParams({
        apiKey:"6b0d610fe5cf4296b3dd9023ae8150fb",
        number: 13
    })

    useEffect(() => {
        fetch("spoonURL")
        .then((response) => response.json())
        .then((data) => 
            data.recipes.map((recipe, index) => {
                            
                if(index === 0 ) {
                    setBgURL(recipe.img)
                }
                else {
                    <RecipeCard name={recipe.title} alternativeText={recipe.title} image={recipe.image} description={recipe.summary}/>
                }
            }
        ))
        .catch((error) => "")

    }, [])


    function listRecipeCardsWithData() {

    }


    return(
        <>
            <main style={{backgroundImage: bgURL ? `url(${bgURL})` : undefined}}>
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