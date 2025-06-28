import styles from "./KitchenSearchSection.module.css"
import { useState, useEffect} from "react"
import { FaSearch } from "react-icons/fa";
import DropdownIngredients from "../DropdownIngredients/DropdownIngredients";


function KitchenSearchSection({onIngredientSelect}) {
 
    const [autocompleteData, setAutocompleteData] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    const [ isLoading, setIsLoading] = useState(false);

    
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
                                onSelect={onIngredientSelect}
                                />
                            </li>
                            

                })
    }

    return(
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
    )

}


export default KitchenSearchSection;