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
            My name is Mohammed Falah, and I am a passionate developer. I
            specialize in using ReactJS for front-end development, creating
            dynamic and interactive user interfaces. I also leverage the power
            of Supabase for backend development, ensuring seamless data
            management and robust API integration. With my skills and expertise,
            I strive to deliver high-quality and scalable web applications that
            meet the needs of users and businesses alike.
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
