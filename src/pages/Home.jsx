import RecipeCard from '../components/RecipeCard.jsx';
import "../pages/Home.css";

function Home() {

    return(
        <div className="recipe-grid-home">
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
            <RecipeCard/>
        </div>
        
    )

}

export default Home;