import { FaRegClock } from "react-icons/fa";

import { GiMeal } from "react-icons/gi";
import { LuDessert } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { LuSandwich } from "react-icons/lu";

import { FaRegSquarePlus } from "react-icons/fa6"; //vazio
import { FaSquarePlus } from "react-icons/fa6"; // preenchido

import { useState } from "react";
import "./RecipeCard.css";


function RecipeType({nameType, iconColor}) {
  
  if( nameType === "Main meal") {
    return (
      <>
        <GiMeal color={iconColor}/>   
      </>
    )
  }

  if( nameType === "Dessert") {
    return (
      <>
        <LuDessert color={iconColor}/>
      </>
    )
  }

  if( nameType === "Drink") {
    return (
      <>
        <RiDrinks2Line color={iconColor}/>
      </>
    )
  }

  if( nameType === "Snack") {
    return (
      <>
        <LuSandwich color={iconColor}/>
      </>
    )
  }

  return null;
};


function RecipeCard({name = "Escondidinho de Batata", alternativeText, image, description = "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiu smod tempor incididunt ut labore et dolore magna aliqua. ashudau duashdus ahdua hduasdh ashdadsasda asdadsad", type, readyInMinutes = "30", iconColor = "#000"}) {
  
  const [ isWishlisted, setIsWishlisted ] = useState(false);

  function handleWishlistClick() {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="recipe-card">
      
      <div className="container-recipe-image-and-icon">
        <span className="container-wishlist-icon" onClick={handleWishlistClick}>
          { isWishlisted ? <FaRegSquarePlus className="wishlist-icon empty"/> : <FaSquarePlus className="wishlist-icon filled" /> }
        </span>
        <img src={image} alt={alternativeText}/>
      </div>
      
      <div className="container-all-recipe-info">
        <h2 className="name">{name}</h2>
        <p className="description">{description}</p>
        <div className="container-recipe-type-and-ready-in-minutes">
          <div className="container-recipe-type">
            <RecipeType nameType={type} iconColor = {iconColor}/>
            <span>{type}</span>
          </div>
          <div className="container-ready-in-minutes">
            <FaRegClock className="recipe-icon clock"  color = {iconColor}/>
            <time className="ready-in-minutes" dateTime={`PT${readyInMinutes}M`}>{`${readyInMinutes} min`}</time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;