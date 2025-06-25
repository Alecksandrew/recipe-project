import { FaRegClock } from "react-icons/fa";

import { GiSaucepan, GiHotMeal, GiSlicedBread } from "react-icons/gi";
import { LuSoup, LuDessert, LuSalad, LuPopcorn  } from "react-icons/lu";
import { MdFreeBreakfast } from "react-icons/md";
import { BiSolidDrink } from "react-icons/bi";
import { FaHandLizard } from "react-icons/fa";
import { FaShrimp } from "react-icons/fa6";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { MdLunchDining } from "react-icons/md";


import { FaRegBookmark } from "react-icons/fa6";; //vazio
import { FaBookmark } from "react-icons/fa"; // preenchido

import { useState } from "react";
import { Link } from 'react-router-dom';

import styles from "./RecipeCard.module.css";


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


function RecipeCard({name, alternativeText, image, description, type, readyInMinutes, iconColor, onClick}) {
  
  const [ isWishlisted, setIsWishlisted ] = useState(false);

  function handleWishlistClick() {
    setIsWishlisted(!isWishlisted);
  };

  return (
      <div className={styles.recipeCard} onClick={onClick}>
        
        <div className={styles.containerRecipeImageAndIcon}>
          <span className={styles.containerWishlistIcon} onClick={handleWishlistClick} data-testid = "container-bookmark">
            { isWishlisted ? <FaBookmark style={{color: "#2CA849"}} className={`${styles.bookmarkIcon} ${styles.filled}`} data-testid = "bookmark-filled"/> : <FaRegBookmark  className={`${styles.bookmarkIcon} ${styles.empty}`} data-testid = "bookmark-empty" /> }
          </span>
          <img src={image} alt={alternativeText}/>
        </div>
        
        <div  className={styles.containerAllRecipeInfo}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
          <div className={styles.containerRecipeTypeAndReadyInMinutes}>
            <div className={styles.containerRecipeType}>
              {showRecipeTypeAndIcon(type, iconColor)}
              <span>{type}</span>
            </div>
            <div className={styles.containerReadyInMinutes}>
              <FaRegClock className={`${styles.recipeIcon} ${styles.clock}`}  color = {iconColor}/>
              <time className={styles.readyInMinutes} dateTime={`PT${readyInMinutes}M`}>{`${readyInMinutes} min`}</time>
            </div>
          </div>
        </div>
      </div>
  );
};


export default RecipeCard;