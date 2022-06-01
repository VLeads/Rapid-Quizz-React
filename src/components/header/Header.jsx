import { LogoutIcon, MoonIcon, SunIcon, UserIcon } from "assets/icons/icons";
import { useAuth } from "context/auth-context";
import React from "react";
import { Link } from "react-router-dom";
import { logoutService } from "service/authService";
import styles from "./Header.module.css";
import { toast } from "react-toastify";
import { useTheme } from "context/theme-context";

const Header = () => {
  const { user, setUser } = useAuth();
  const { theme, changeTheme } = useTheme();

  return (
    <nav className={styles.quizNavbar}>
      <div className={styles.logo}>
        <Link to="/" className={styles.quizNavbarText}>
          <span className={styles.fontFamilyKaushan}>R</span>apid
          <span className={styles.fontFamilyKaushan}>Q</span>uizz
        </Link>
      </div>
      <div className={styles.navOption}>
        {theme === "dark" ? (
          <div>
            <SunIcon className={styles.lightmode} onClick={changeTheme} />
          </div>
        ) : (
          <div>
            <MoonIcon className={styles.darkmode} onClick={changeTheme} />
          </div>
        )}

        {user ? (
          <div>
            <LogoutIcon
              className={styles.logoutIcon}
              onClick={() => {
                localStorage.removeItem("user");
                setUser(null);
                logoutService();
                toast.success(`Logged out successfully`);
              }}
            />
          </div>
        ) : (
          <Link to="/login">
            <div>
              <UserIcon className={styles.icon} />
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export { Header };
