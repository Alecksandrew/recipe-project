import styles from "./CheckboxGroup.module.css";

function CheckboxGroup({
  nameAttribute,
  optionsTitle = "Crazy",
  inputNameOptions = [
    { label: "labelOne", value: "optionOne" },
    { label: "labelTwo", value: "optionTwo" },
  ] /*WRITE AN ARRAY WITH ALL OPTION*/,
}) {
  function renderOptions() {
    return inputNameOptions.map((option) => {
      const { label, value } = option;

      return (
        <label key={label}>
          <input type="checkbox" name={nameAttribute} value={value} />
          {label}
        </label>
      );
    });
  }
  return (
    <fieldset className={styles.checkboxGroup}>
      <legend>{optionsTitle}</legend>
      {renderOptions()}
    </fieldset>
  );
}

export default CheckboxGroup;
