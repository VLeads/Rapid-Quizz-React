import React from "react";
import styles from "./Header.module.css";
const Header = () => {
  return (
    <nav className={styles.quizNavbar}>
      <div className={styles.logo}>
        <a href="#" className={styles.quizNavbarText}>
          <span className={styles.fontFamilyKaushan}>R</span>apid
          <span className={styles.fontFamilyKaushan}>Q</span>uizz
        </a>
      </div>
    </nav>
  );
};

export { Header };
