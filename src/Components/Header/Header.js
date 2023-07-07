import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const redirectHandler = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <Logo redirect={redirectHandler} />
      <ul className={styles.mainItems}>
        <Link to="/features">
          <li>Features</li>
        </Link>
        <li>About</li>
        <li>
          {" "}
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : undefined)}
            to="developer"
          >
            Developed by
          </NavLink>
        </li>
      </ul>
      <ul className={styles.authItems}>
        <NavLink to="login">Login</NavLink>
        <NavLink to="sign-up">Get Started</NavLink>
      </ul>
      <div className={styles.hamburger}>test</div>
    </header>
  );
};

export default Header;
