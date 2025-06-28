import styles from "./WhatsInYourKitchen.module.css"
import { FaSearch } from "react-icons/fa";
import DropdownIngredients from "../components/DropdownIngredients/DropdownIngredients";



function WhatsInYourKitchen({placeholderSearch}) {


    

    return(
        <>
            <form method="get" className={styles.form}>
                <section className={`${styles.searchBar} ${styles.section}`}>
                    <FaSearch className={styles.searchIcon}/>
                    <input
                    placeholder={placeholderSearch}
                    type="search"
                    id="ingredientsName"
                    name="ingredientsName"
                    className={styles.inputSearch}
                    autoComplete="off"
                    />
                </section>
                <section className={styles.section}>
                    <h2>Selected ingredients</h2>
                    <ul style={styles.selectedIngredientsContainer}>
                        <li>Each selected ingredient</li>
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
            <h1>Selected recipes</h1>
           <DropdownIngredients/>
            
        </>
    )

}

export default WhatsInYourKitchen;