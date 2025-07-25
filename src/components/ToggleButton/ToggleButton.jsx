import styles from "./ToggleButton.module.css";

function ToggleButton({
  className,
  trackColor = "var(--Paleta06)",
  ballColor = "var(--Paleta02)",
  checkedColor = "var(--Paleta01)",
  isChecked
}) {
    
  const componentStyles = {
    "--track-color": trackColor,
    "--ball-color": ballColor,
    "--checked-color": checkedColor,
  };

  return (
    <label className={`${styles.toggle} ${className}`} style={componentStyles}>
      <input type="checkbox" checked={isChecked}/>
      <span className={styles.slider}></span>
    </label>
  );
}

export default ToggleButton;
