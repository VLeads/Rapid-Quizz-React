import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <nav className={styles.quizNavbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.quizNavbarText}>
          <span className={styles.fontFamilyKaushan}>R</span>apid
          <span className={styles.fontFamilyKaushan}>Q</span>uizz
        </Link>
      </div>
    </nav>
  );
};

export { Header };
