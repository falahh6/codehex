import Logo from "../../utils/Logo";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      {/* <div className={styles.leftItems}> */}
      <ul className={styles.mainItems}>
        <li>Features</li>
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
