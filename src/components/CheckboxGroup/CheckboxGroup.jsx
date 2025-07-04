import styles from "./CheckboxGroup.module.css";

function CheckboxGroup({nameAttribute, optionsTitle = "Crazy", inputNameOptions = ["optionOne, optionTwo"]/*WRITE AN ARRAY WITH ALL OPTION*/ }) {

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