import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerHeader}>Connect with me on</p>
      <div>
        <a href="https://github.com/vleads">
          <i className="fab fa-github" aria-hidden="true"></i>
        </a>
        <a href="https://twitter.com/vishalk01234">
          <i className="fab fa-twitter" aria-hidden="true"></i>
        </a>
        <a href="https://www.linkedin.com/in/vishalkumar28/">
          <i className="fab fa-linkedin" aria-hidden="true"></i>
        </a>
        <a href="mailto:leader.vishalkumar@gmail.com">
          <i className="fas fa-envelope" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  );
};

export { Footer };
