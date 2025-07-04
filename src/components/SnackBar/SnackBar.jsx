import styles from "./SnackBar.module.css";

function SnackBar({
  className,
  popup = false,
  text,
  bgColor = "var(--Paleta01)",
}) {
  return (
    <div
      className={`${styles.container} ${className} ${
        popup ? styles.popup : null
      }`}
      style={{ backgroundColor: bgColor }}
    >
      <p>{text}</p>
    </div>
  );
}

export default SnackBar;
