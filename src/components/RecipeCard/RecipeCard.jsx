import { FaRegClock } from "react-icons/fa";

import { GiMeal, GiHotMeal, GiSlicedBread } from "react-icons/gi";
import { LuSoup } from "react-icons/lu";
import { MdDining, MdLocalDining } from "react-icons/md";
import { BiDish, BiDrink } from "react-icons/bi";
import { FaCoffee, FaCookie } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";

import { FaRegBookmark } from "react-icons/fa6";; //vazio
import { FaBookmark } from "react-icons/fa"; // preenchido

import { useState } from "react";
import PropTypes from "prop-types";
import "./RecipeCard.css";


const recipeTypesIcons = {
  "main course": GiMeal,
  "side dish": BiDish,
  "dessert": FaCookie,
  "appetizer": MdLocalDining,
  "salad": MdDining,
  "bread": GiSlicedBread,
  "breakfast": GiHotMeal,
  "soup": LuSoup,
  "beverage": BiDrink,
  "sauce": IoRestaurant,
  "drink": FaCoffee
};
function showRecipeTypeAndIcon(nameType, iconColor) {
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