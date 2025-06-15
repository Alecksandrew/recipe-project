import "./FilterSearchBar.css";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup.jsx";

function FilterSearchBar({legendsOptions = ["LegendOne", "Legend2"], arrayInputNameOptions = [["firstOptionFirstSection", "secondOptionFirstSection"], ["firstOptionSecondSection"]]}) {

    return (
        <div className="filter-search-bar">
           <div className="all-checkbox-groups">
               {legendsOptions.map((legend, index) => {
                    return (
                    
                        <CheckboxGroup optionsTitle={legend}
                        inputNameOptions={arrayInputNameOptions[index] || ["UNDEFINED OPTION"]}
                        key={legend}/>
                    );
                })
                }
            </div>
            <button type="submit" className="apply-filters">Apply filters</button>
        </div>



    );


}

export default FilterSearchBar;