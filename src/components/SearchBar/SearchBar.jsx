import FilterSearchBar from "../FilterSearchBar/FilterSearchBar"
import "./SearchBar.css"
import { useState } from "react";

function SearchBar({ placeHolder }) {
    const [isDropDownOpen, setisDropDownOpen] = useState(false);

    function handleClickFilterButton() {
        setisDropDownOpen(!isDropDownOpen);
    };

    return(
        <form>
            <input type="search" placeholder={placeHolder} name="search"/>
            <span className="container-filter">
                <button onClick={handleClickFilterButton} type="button">Filter</button>
                { isDropDownOpen ? <FilterSearchBar legendsOptions={["Type", "Nationality", "Restriction", "Ready in"]} arrayInputNameOptions={[["Main meal", "Snack", "Dessert", "Drink"], ["Brazilian", "Mexican", "Japanese", "Indian"], ["No gluten", "Vegan", "Vegetarian", "No lactose"], ["until 30 min", "60 min"]]}/> : null }
            </span>
            <button type="submit">Search</button>            
        </form>
    )
}

export default SearchBar;