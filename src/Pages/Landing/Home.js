import styles from "./Home.module.css";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import workingStructure from "../../assets/images/landing-page-tr.svg";
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
            <img src={workingStructure} alt="workingStructure" />
            <h1>
              What <span className={styles.logoname}>codehex</span> does?
            </h1>
            <p>
              {" "}
              <span className={styles.logoname}>codehex</span> is a powerful
              tool that helps optimize, provide alternative solutions, explain
              your code, detect errors, refactor your code, and even translate
              your code to different programming languages. It's designed to
              enhance your coding experience and improve the quality of learning
              new programming langauges. <br /> Explore the possibilities and
              take your projects to the next level with CodeHex.
            </p>
            <button className={styles.exploreBtn}>Explore now !!</button>

            <div className={styles.features}>
              <div className={styles.test}></div>
              <div className={styles.test}></div>
              <div className={styles.test}></div>
              <div className={styles.test}></div>
              <div className={styles.test}></div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Home;
