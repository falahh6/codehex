import Logo from "../../utils/Logo";
import styles from "./PreLoader.module.css";
const PreLoader = () => {
  return (
    <div className={styles.preLoader}>
      <Logo />
    </div>
  );
};

export default PreLoader;
