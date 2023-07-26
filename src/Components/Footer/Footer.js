import styles from "./Footer.module.css";
import logo from "../../assets/images/codehex-logo.svg";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr />
      <div className={styles.copyrightsection}>
        <div className={styles.footerInLogo}>
          <img src={logo} alt="logo" />
          <p className={styles.developer}>
            <a href="https://falahh.me" target="_blank">
              Developer
            </a>
          </p>
        </div>

        <div>
          <div style={{ visibility: "hidden" }}>test</div>
          <div>
            <div className={styles.firstsec}>
              <p> &#169; Copyright 2023. All rights resevered</p>
            </div>
            <div className={styles.secondsec}>
              <p>Privicy Policy</p>
              <p>Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
