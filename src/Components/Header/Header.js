import Logo from "../../utils/Logo";
import styles from "./Header.module.css";
import { Link as ScrollLink } from "react-scroll";
const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      {/* <div className={styles.leftItems}> */}
      <ul className={styles.mainItems}>
        <ScrollLink to="features" smooth={true} duration={600}>
          <li>Features</li>
        </ScrollLink>
        <li>About</li>
        <li>Developed by</li>
      </ul>
      {/* </div> */}
      <ul className={styles.authItems}>
        <li>Login</li>
        <li>Get Started</li>
      </ul>
    </header>
  );
};

export default Header;
