import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const redirectHandler = () => {
    navigate("/");
  };

  const navLinkClickHanlder = () => {
    const featuresSection = document.getElementById("features");

    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className={styles.header}>
      <Logo redirect={redirectHandler} />
      <ul className={styles.mainItems}>
        <Link to="/" onClick={navLinkClickHanlder}>
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
        <li>Login</li>
        <li>Get Started</li>
      </ul>
      <div className={styles.hamburger}>test</div>
    </header>
  );
};

export default Header;
