import "./checkboxGroup.css";

function CheckboxGroup({ optionsTitle = "Undefined", inputNameOptions = ["eachStringIsAnOption"] }) {
    
    const nameAttribute = optionsTitle.trim().toLowerCase().replace(" ", '_');   
    
    return (
        <fieldset className="checkbox-group">
            <legend>{optionsTitle}</legend>
            { inputNameOptions.map((option) => {
                return (
                <label type="checkbox" key={option}>
                    <input type="checkbox" name={nameAttribute} value={option}/>
                    {option}
                </label>
                );
            }) };
        </fieldset>
    );
};

export default CheckboxGroup;