import styles from "./Error.module.css";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
const error = () => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Helmet>
            <title>Error</title>
          </Helmet>
          <div className={styles.error}>
            <h3>404 | Error</h3>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default error;
