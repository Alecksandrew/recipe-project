import FilterSearchBar from "../FilterSearchBar/FilterSearchBar"
import "./SearchBar.css"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";

function SearchBar({ placeHolder }) {
    const [isDropDownOpen, setisDropDownOpen] = useState(false);

    function handleClickFilterButton() {
        setisDropDownOpen(!isDropDownOpen);
    };

    function cssInlineArrowIcon() {
        return {
                transform: isDropDownOpen ? "rotate(180deg)" : "rotate(0deg)", 
                transition: "transform 0.2s ease"
               }
    };

    return(
        <form className="search-bar" method="get">
            <FaSearch className="search-icon"/>
            <input type="search" placeholder={placeHolder} name="search" autoComplete="off"/>
            <span className="container-filter">
                <button onClick={handleClickFilterButton} type="button" className="first-filter-button">Filter<IoIosArrowRoundUp style={cssInlineArrowIcon()}/></button>
                { isDropDownOpen ? <FilterSearchBar legendsOptions={["Type", "Nationality", "Restriction", "Ready in"]} arrayInputNameOptions={[["Main meal", "Snack", "Dessert", "Drink"], ["Brazilian", "Mexican", "Japanese", "Indian"], ["No gluten", "Vegan", "Vegetarian", "No lactose"], ["Less than 30 min", "30 - 60 min", "60 - 90 min", "More than 90 min"]]}/> : null }
            </span>
            <button type="submit" className="search-button">Search</button>            
        </form>
    )
}

export default SearchBar;