import styles from "./Home.module.css";
import { TypeAnimation } from "react-type-animation";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import workingStructure from "../../assets/images/landing-page-tr.svg";

import altcodeIcon from "../../assets/features-icons/altcode.svg";
import codexplIcon from "../../assets/features-icons/codexpl.svg";
import errcodeIcon from "../../assets/features-icons/errcode.svg";
import coderefIcon from "../../assets/features-icons/coderef.svg";
import codetrIcon from "../../assets/features-icons/codetr.svg";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userAuthCheck } from "../../store/auth-slice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuthCheck());
  }, [dispatch]);

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
              <span className={styles.logoname}>codehex</span> can help you
              learn coding in a new way
            </h1>
            <p>
              {" "}
              Discover a New Way to Learn Coding with codehex. Gain hands-on
              experience, receive personalized guidance, and unlock creative
              problem-solving skills. Empower yourself with a unique learning
              platform that enhances your coding journey.
            </p>

            <div className={styles.features}>
              <div>
                <img src={altcodeIcon} alt="altcode" />
                <h3>Alterntaive Code solutions</h3>
                <p>
                  Unlock fresh perspectives and creative solutions for code
                  challenges, expanding your problem-solving repertoire and
                  fostering innovation.
                </p>
              </div>
              <div>
                <img src={codexplIcon} alt="codeexplanation" />

                <h3>Code Explanation</h3>
                <p>
                  Gain in-depth insights into complex code constructs,
                  demystifying intricate concepts and enhancing your
                  understanding of programming principles.
                </p>
              </div>
              <div>
                <img src={errcodeIcon} alt="coderr" />
                <h3>Error detection and fix</h3>
                <p>
                  Gain in-depth insights into complex code constructs,
                  demystifying intricate concepts and enhancing your
                  understanding of programming principles.
                </p>
              </div>
              <div>
                <img src={coderefIcon} alt="coderef" />
                <h3>Code refector</h3>
                <p>
                  Streamline and optimize your codebase with expert refactoring
                  suggestions, improving performance, readability, and
                  maintainability for efficient development.
                </p>
              </div>
              <div>
                <img src={codetrIcon} alt="codetr" />
                <h3> Code translation</h3>
                <p>
                  Seamlessly translate your code between programming languages,
                  enabling cross-platform compatibility and facilitating
                  collaboration across diverse tech ecosystems.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Home;
