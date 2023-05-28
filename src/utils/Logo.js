import Codehex from "../assets/images/codehex-logo.svg";
import styles from "./Logo.module.css";
const Logo = (props) => {
  return (
    <img
      className={styles.logo}
      onClick={props.redirect}
      src={Codehex}
      alt="codehex-logo"
    />
  );
};

export default Logo;
