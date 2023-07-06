import styles from "./Home.module.css";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import codesnippet from "../../assets/images/code-snipet.svg";
const Home = () => {
  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className={styles.main}>
            <TypeAnimation
              className={styles.h1}
              sequence={[
                "Wanna Learn Coding?",
                3000,
                "Looking for a Perfect Compiler?",
                3000,
              ]}
              speed={30}
              repeat={Infinity}
            />
            <p>
              {" "}
              "Unlock the Power of Intelligent Coding with codehex : The
              AI-Powered Compiler"
            </p>
            <div className={styles.ctaWrap}>
              <NavLink to="/compiler" className={styles.cta}>
                Start writing code
              </NavLink>
            </div>
          </div>
          <div className={styles.about}>
            <div className={styles.codeDemo}>
              <div>
                <div>
                  <img
                    className={styles.codesnippet}
                    src={codesnippet}
                    alt="your code"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Home;
