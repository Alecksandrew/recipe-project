import "./FilterSearchBar.css";
import CheckboxGroup from "../CheckboxGroup/CheckboxGroup.jsx";

function FilterSearchBar({legendsOptions = ["LegendOne", "Legend2"], arrayInputNameOptions = [["firstOptionFirstSection", "secondOptionFirstSection"], ["firstOptionSecondSection"]]}) {

    return (

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



    );


}

export default FilterSearchBar;