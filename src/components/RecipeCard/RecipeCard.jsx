import { FaRegClock } from "react-icons/fa";

import { GiMeal, GiHotMeal, GiSlicedBread, GiSoupBowl, GiSauce } from "react-icons/gi";
import { LuDessert, LuSandwich } from "react-icons/lu";
import { RiDrinks2Line } from "react-icons/ri";
import { MdRiceBowl } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { PiCookieFill } from "react-icons/pi";

import { FaRegBookmark } from "react-icons/fa6";; //vazio
import { FaBookmark } from "react-icons/fa"; // preenchido

import { useState } from "react";
import PropTypes from "prop-types";
import "./RecipeCard.css";


const recipeTypesIcons = {
  "main course": "GiMeal",        // prato principal
  "side dish":   "BiDish",        // acompanhamento
  "dessert":     "LuDessert",     // sobremesa
  "appetizer":   "PiCookieFill",  // aperitivo
  "salad":       "MdRiceBowl",    // salada
  "bread":       "GiSlicedBread", // pão
  "breakfast":   "GiHotMeal",     // café da manhã
  "soup":        "GiSoupBowl",    // sopa
  "beverage":    "RiDrinks2Line", // bebida
  "sauce":       "GiSauce",       // molho
  "drink":       "RiDrinks2Line"  // drink
};
function showRecipeTypeAndIcon({nameType, iconColor}) {
    const TypeIcon = recipeTypesIcons[nameType];
    return TypeIcon ? <TypeIcon color={iconColor}/> : null
};


function RecipeCard({name, alternativeText, image, description, type, readyInMinutes, iconColor}) {
  
  const [ isWishlisted, setIsWishlisted ] = useState(false);

  function handleWishlistClick() {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="recipe-card">
      
      <div className="container-recipe-image-and-icon">
        <span className="container-wishlist-icon" onClick={handleWishlistClick} data-testid = "container-bookmark">
          { isWishlisted ? <FaBookmark className="bookmark-icon filled" data-testid = "bookmark-filled"/> : <FaRegBookmark className="bookmark-icon empty" data-testid = "bookmark-empty" /> }
        </span>
        <img src={image} alt={alternativeText}/>
      </div>
      
      <div  className="container-all-recipe-info">
        <h2 className="name">{name}</h2>
        <p className="description">{description}</p>
        <div className="container-recipe-type-and-ready-in-minutes">
          <div className="container-recipe-type">
            {showRecipeTypeAndIcon(type, iconColor)}
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