import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
const Header = () => {
  const navigate = useNavigate();
  const redirectHandler = () => {
    navigate("/");
  };
  return (
    <header className={styles.header}>
      <Logo redirect={redirectHandler} />
      {/* <div className={styles.leftItems}> */}
      <ul className={styles.mainItems}>
        <ScrollLink to="features" smooth={true} duration={600}>
          <li>Features</li>
        </ScrollLink>
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
      {/* </div> */}
      <ul className={styles.authItems}>
        <li>Login</li>
        <li>Get Started</li>
      </ul>
      <div className={styles.hamburger}>test</div>
    </header>
  );
};

export default Header;
