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
              <span className={styles.logoname}>codehex</span> uses GPT - 3.5
              Turbo
            </h1>
            <p>to optimise the code with 175 billion parameters</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Home;
