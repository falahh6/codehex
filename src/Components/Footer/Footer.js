import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div></div>
      <hr />
      <div className={styles.copyrightsection}>
        <div className={styles.firstsec}>
          <p> &#169; Copyright 2023. All rights resevered</p>
        </div>
        <div className={styles.secondsec}>
          <p>Privicy Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
