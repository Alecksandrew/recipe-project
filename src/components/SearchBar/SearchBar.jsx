import FilterSearchBar from "../FilterSearchBar/FilterSearchBar"
import "./SearchBar.css"
import { useState } from "react";

function SearchBar({ placeHolder }) {
    const [isDropDownOpen, setisDropDownOpen] = useState(false);

    function handleClickFilterButton() {
        setisDropDownOpen(!isDropDownOpen);
    };

    return(
        <form className="search-bar" method="get">
            <input type="search" placeholder={placeHolder} name="search"/>
            <span className="container-filter">
                <button onClick={handleClickFilterButton} type="button" className="first-filter-button">Filter</button>
                { isDropDownOpen ? <FilterSearchBar legendsOptions={["Type", "Nationality", "Restriction", "Ready in"]} arrayInputNameOptions={[["Main meal", "Snack", "Dessert", "Drink"], ["Brazilian", "Mexican", "Japanese", "Indian"], ["No gluten", "Vegan", "Vegetarian", "No lactose"], ["Less than 30 min", "30 - 60 min", "60 - 90 min", "More than 90 min"]]}/> : null }
            </span>
            <button type="submit" className="search-button">Search</button>            
        </form>
    )
}

export default SearchBar;