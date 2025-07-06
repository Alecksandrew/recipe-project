import FilterSearchBar from "../FilterSearchBar/FilterSearchBar";
import styles from "./SearchBar.module.css";
import { useState, memo } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowRoundUp } from "react-icons/io";

const SearchBar = memo(({ placeHolder, onSubmit }) =>{
  const [isDropDownOpen, setisDropDownOpen] = useState(false);

  function handleClickFilterButton() {
    setisDropDownOpen(!isDropDownOpen);
  }

  function cssInlineArrowIcon() {
    return {
      transform: isDropDownOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease",
    };
  }

  const filterSectionStyle = {
    display: isDropDownOpen ? 'block' : 'none',
    position: "relative"
  };

  return (
    <form className={styles.searchBar} onSubmit={onSubmit}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="search"
        placeholder={placeHolder}
        name="query"
        autoComplete="off"
        className={styles.inputSearch}
      />
      <span className={styles.containerFilter}>
        <button
          onClick={handleClickFilterButton}
          type="button"
          className={styles.firstFilterButton}
        >
          Filter
          <IoIosArrowRoundUp style={cssInlineArrowIcon()} />
        </button>
          <div style={filterSectionStyle}>
            <FilterSearchBar
              nameAtributte={["type", "cuisine", "intolerances", "maxReadyTime"]}
              legendsOptions={["Type", "Cuisine", "Restriction", "Ready by"]}
              arrayInputNameOptions={[
                 [
                  { label: "Main meal", value: "main course" },
                  { label: "Snack", value: "snack" },
                  { label: "Dessert", value: "dessert" },
                  { label: "Drink", value: "drink" },
                ],
                [
                  { label: "Brazilian", value: "Brazilian" },
                  { label: "Mexican", value: "Mexican" },
                  { label: "Japanese", value: "Japanese" },
                  { label: "Indian", value: "Indian" },],
                [
                  { label: "No gluten", value: "gluten" },
                  { label: "No lactose", value: "lactose" },
                ],
                [
                  { label: "15 min", value: 15 },
                  { label: "30 min", value: 30 },
                  { label: "60 min", value: 60 },
                  { label: "90 min", value: 90 },
                ],
              ]}
            />
          </div>
      </span>
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
})

export default SearchBar;
