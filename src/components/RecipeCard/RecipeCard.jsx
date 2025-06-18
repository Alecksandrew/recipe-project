import { FaRegClock } from "react-icons/fa";

import { GiSaucepan, GiHotMeal, GiSlicedBread } from "react-icons/gi";
import { LuSoup, LuDessert, LuSalad, LuPopcorn  } from "react-icons/lu";
import { MdDining, MdLocalDining, MdFreeBreakfast } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { FaCoffee, FaHandLizard } from "react-icons/fa";
import { FaShrimp } from "react-icons/fa6";
import { IoRestaurant } from "react-icons/io5";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { MdLunchDining } from "react-icons/md";


import { FaRegBookmark } from "react-icons/fa6";; //vazio
import { FaBookmark } from "react-icons/fa"; // preenchido

import { useState } from "react";

import "./RecipeCard.css";


const recipeTypesIcons = {
  "main course": GiHotMeal, 
  "side dish": TbBowlSpoonFilled,
  "lunch": MdLunchDining,
  "dessert": LuDessert,
  "appetizer": FaShrimp,
  "antipasti": FaShrimp,
  "salad": LuSalad,
  "bread": GiSlicedBread,
  "breakfast": MdFreeBreakfast,
  "morning meal": MdFreeBreakfast,
  "soup": LuSoup,
  "beverage": BiSolidDrink,
  "drink": BiSolidDrink,
  "sauce": GiSaucepan,

  'marinade': null,
  'fingerfood': FaHandLizard,
  'snack': LuPopcorn,
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
        <p className="description" dangerouslySetInnerHTML={{__html: description}}></p>
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