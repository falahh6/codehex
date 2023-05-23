import styles from "./Error.module.css";
import { Helmet } from "react-helmet";
const error = () => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div className={styles.error}>
        <h3>404 | Error</h3>
      </div>
    </>
  );
};

export default error;
