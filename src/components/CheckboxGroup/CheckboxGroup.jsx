import styles from "./checkboxGroup.module.css";

function CheckboxGroup({ optionsTitle = "Crazy", inputNameOptions = ["optionOne, optionTwo"]/*WRITE AN ARRAY WITH ALL OPTION*/ }) {
    
    const nameAttribute = optionsTitle.trim().toLowerCase().replace(" ", '_');   

    return (
        <fieldset className={styles.checkboxGroup}>
            <legend>{optionsTitle}</legend>
            { inputNameOptions.map((option) => {
                return (
                <label key={option}>
                    <input type="checkbox" name={nameAttribute} value={option}/>
                    {option}
                </label>
                )
            }) }
        </fieldset>
    );
};

export default CheckboxGroup;