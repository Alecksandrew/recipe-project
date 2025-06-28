import styles from "./WhatsInYourKitchen.module.css"
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react"
import DropdownIngredients from "../components/DropdownIngredients/DropdownIngredients";
import IngredientCard from "../components/IngredientCard/IngredientCard.jsx"



function WhatsInYourKitchen() {
    
    const [autocompleteData, setAutocompleteData] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [ selectedIngredients, setSelectedIngredients] = useState([]);
    const [ isLoading, setIsLoading] = useState(false);

    console.log(searchValue)
    console.log(autocompleteData)

    useEffect(() => {
        async function autocompleteIngredients() {
            
            if(!searchValue || searchValue.trim === "") {
                setAutocompleteData(null)
                return;
            }

            try {
                setIsLoading(true);
                const autocompletEndpoint = "https://api.spoonacular.com/food/ingredients/autocomplete"
                const params = new URLSearchParams({
                    query: searchValue,
                    apiKey: "6b0d610fe5cf4296b3dd9023ae8150fb",
                    number: 3
                })
            
                const response = await fetch(`${autocompletEndpoint}?${params.toString()}`)
                const data = await response.json();
                setAutocompleteData(data);
            }
            catch(error) {
                console.error(error)
                setAutocompleteData(null) 
            }
            finally {
                setIsLoading(false)
            }
            
        }

        autocompleteIngredients()
        
    }, [searchValue])


    function listAutocompletedIngredients(data) {
        if(!data) return

        return data.map((ingredient, index) => {
                    if(!searchValue || searchValue.trim() ==="") return
                    
                    return <li key={index}>
                                <DropdownIngredients
                                imageURL={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                                imageAlt={ingredient.name}
                                ingredientName={ingredient.name}
                                onSelect={makeIngredientBecomeSelected}
                                />
                            </li>
                            

                })
    }

    function makeIngredientBecomeSelected(ingredient) {
        setSelectedIngredients( prevSelected => [...prevSelected, ingredient])
    }


    function listSelectedIngredients(selectedIngredients) {
        if(!selectedIngredients) return

        return selectedIngredients.map((selectedIngredient, index) => {
            return <li key={index}>
                < IngredientCard 
                name={selectedIngredient.name} 
                image={selectedIngredient.image}
                onRemove={() => removeIngredientsFromSelectedList(selectedIngredient)}
                />
            </li>
        })
    }

    function removeIngredientsFromSelectedList(ingredientObjToRemove) {
        setSelectedIngredients(prevSelectedIngredients => prevSelectedIngredients.filter(ingredientObj => ingredientObj.name !== ingredientObjToRemove.name))
    }




    return(
        <>
            <h1 className={styles.titlePage}>Find out awesome recipes with ingredients you have in your kitchen!</h1>
            <form method="get" className={styles.form}>
                <section className={styles.sectionAutocomplet}>
                    <div className={styles.searchBar}>
                        <FaSearch className={styles.searchIcon}/>
                        <input
                        placeholder="Search your ingredients"
                        type="search"
                        id="ingredientsName"
                        name="ingredientsName"
                        className={styles.inputSearch}
                        autoComplete="off"
                        onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    <ul className={`${styles.containerAutocompletedIngredients} ${!searchValue || searchValue.trim() === "" ? styles.hidden : ""}`}>
                        {searchValue && autocompleteData && autocompleteData.length === 0 && !isLoading ? <li key={"notFound"} id={styles.notFound}>Ingredient not found!</li> : 
                        listAutocompletedIngredients(autocompleteData)}
                    </ul>

                </section>
                <section className={styles.section}>
                    <h2>Selected ingredients</h2>
                    <ul className={styles.selectedIngredientsContainer}>
                        {listSelectedIngredients(selectedIngredients)}
                        
                    </ul>
                </section>
                <section className={styles.section}>
                    <h2>Tolerance Control</h2>
                    <p>It will show recipes with some ingredients you dont have in your kitchen</p>
                    <div className={styles.toleranceContainer}>
                        <label htmlFor="tolerance" className={styles.labelTolerance}>
                            <span>Tolerance level:0</span>
                        </label>
                        <input type="range" min={0} max={6} step={1} id="tolerance" name="tolerance"/>
                    </div>
                </section>
                <button type="submit">Search recipes</button>
            </form>
            <h2>Selected recipes</h2>
        </>
    )

}

export default WhatsInYourKitchen;