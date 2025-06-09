import { FaRegClock } from "react-icons/fa";

import { GiMeal } from "react-icons/gi";
import { LuDessert } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { LuSandwich } from "react-icons/lu";

import { FaRegSquarePlus } from "react-icons/fa6"; //vazio
import { FaSquarePlus } from "react-icons/fa6"; // preenchido


function RecipeType({nameType}) {
  
  if( nameType === "Main meal") {
    return (
      <>
        <GiMeal />
        <span>{nameType}</span>
      </>
    )
  }

  if( nameType === "Dessert") {
    return (
      <>
        <LuDessert />
        <span>{nameType}</span>
      </>
    )
  }

  if( nameType === "Drink") {
    return (
      <>
        <RiDrinks2Line />
        <span>{nameType}</span>
      </>
    )
  }

  if( nameType === "Snack") {
    return (
      <>
        <LuSandwich />
        <span>{nameType}</span>
      </>
    )
  }

  return alert("Nome do tipo de receita inválido. Por favor, verifique o nome do tipo de receita e tente novamente.");
};


function RecipeCard({name = "Random recipe name", alternativeText, image, description = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", type, cookingTimeInMinutes = "30"}) {
  
  return (
    <div className="recipe-card">
      <div className="container-recipe-image-and-icon">
        <FaRegSquarePlus/>
        <img src={image} alt={alternativeText}/>
      </div>
      
      <h2>{name}</h2>  
      <p>{description}</p>
      <div>
        <div className="container-recipe-type">
          <RecipeType nameType={type}/>
        </div>
        <div className="container-cooking-time">
          <FaRegClock />
          <time className="cooking-minutes" dateTime={`PT${cookingTimeInMinutes}M`}>{`${cookingTimeInMinutes} min`}</time>
        </div>

      </div>
    </div>
  );
};

export default RecipeCard;