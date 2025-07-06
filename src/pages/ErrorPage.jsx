import styles from "./ErrorPage.module.css";
import warningImage from "../assets/warning.png";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.warningContainer}>
        <img
          className={styles.warning}
          src={warningImage}
          alt="Warning image"
        />
      </div>
      <h1 className={styles.h1}>Oops! Something went wrong</h1>
      <p className={styles.p}>
        It looks like you found a page that doesn't exist or an unexpected error
        occurred. Don't worry, we'll help you get back on track!
      </p>
      <div className={styles.btnContainer}>
        <Link to="/">
          <button className={styles.btn}>Home Page</button>
        </Link>
        <Link to="/whats-there-in-your-kitchen">
          <button className={styles.btn}>What is there in your kitchen?</button>
        </Link>
      </div>
    </div>
  );
}
