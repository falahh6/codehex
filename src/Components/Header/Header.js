import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const redirectHandler = () => {
    navigate("/");
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  return (
    <header className={styles.header}>
      <Logo redirect={redirectHandler} />
      <ul className={styles.mainItems}>
        {/* <Link to="/features">
          <li>Features</li>
        </Link> */}
        {/* <li>About</li> */}
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
        {isLoggedIn ? (
          user
        ) : (
          <>
            <NavLink to="login">Login</NavLink>
            <NavLink to="sign-up">Get Started</NavLink>
          </>
        )}
      </ul>
      <div className={styles.hamburger}>test</div>
    </header>
  );
};

export default Header;
