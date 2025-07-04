import styles from "./FilterSearchBar.module.css";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup.jsx";

function FilterSearchBar({nameAtributte = ["type"], legendsOptions = ["LegendOne", "Legend2"], arrayInputNameOptions = [["firstOptionFirstSection", "secondOptionFirstSection"], ["firstOptionSecondSection"]]}) {
    return (
        <div className={styles.filterSearchBar}>
           <div className={styles.allCheckboxGroups}>
               {legendsOptions.map((legend, index) => {
                    return (
                        <CheckboxGroup 
                        nameAttribute={nameAtributte[index]}
                        optionsTitle={legend}
                        inputNameOptions={arrayInputNameOptions[index] || ["UNDEFINED OPTION"]}
                        key={legend}/>
                    );
                })}
            </div>
            <button type="submit" className={styles.applyFilters}>Apply filters</button>
        </div>
    );
}

export default FilterSearchBar;