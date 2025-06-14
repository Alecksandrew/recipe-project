import "./FilterSearchBar.jsx";

function FilterSearchBar({optionsTitle1 = "Recipe Type", optionsTitle2 = "Nationality", optionsTitle3 = "Restriction", optionsTitle4 = "Apenas teste" }) {

    return (
        <button>
           <div className="all-checkbox-groups">
                <fieldset className="checkbox-group">
                    <legend>{optionsTitle1}</legend>

                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Main meal
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Snack
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Dessert
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Drink
                    </label>

                </fieldset>

                <fieldset className="checkbox-group">
                    <legend>{optionsTitle2}</legend>

                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Main meal
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Snack
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Dessert
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Drink
                    </label>

                </fieldset>

                <fieldset className="checkbox-group">
                    <legend>{optionsTitle3}</legend>

                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Main meal
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Snack
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Dessert
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Drink
                    </label>

                </fieldset>

                <fieldset className="checkbox-group">
                    <legend>{optionsTitle4}</legend>

                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Main meal
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Snack
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Dessert
                    </label>
                    <label>
                        <input type="checkbox" name="recipe_type" />
                        Drink
                    </label>

                </fieldset>
            </div>
        </button>


    );


}

export default FilterSearchBar;