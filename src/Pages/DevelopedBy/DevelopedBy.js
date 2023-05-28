import styles from "./DevelopedBy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const DevelopedBy = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.main}>
          <h1 className={styles.h1}>Mohammed Falah</h1>
          <hr />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt,
            veritatis velit ipsam repudiandae necessitatibus vel adipisci quasi
            deleniti quisquam commodi! Aut fuga beatae unde! Suscipit, saepe.
            Ipsam assumenda molestiae ullam illo esse, doloremque rerum, debitis
            beatae, accusamus vel suscipit voluptate ducimus aliquid. Ad ex
            doloribus recusandae aut, voluptate nihil excepturi rerum harum amet
            enim? Error ut eveniet reiciendis ullam aliquam recusandae
            consectetur deserunt omnis voluptates, corrupti ad ratione assumenda
            cumque!
          </p>
          <div className={styles.socials}>
            <a title="twitter" href="https://www.twitter.com/ffalah_">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a title="instagram" href="https://www.instagram.com/falah6_">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a title="github" href="https://www.github.com/falahh6">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DevelopedBy;
