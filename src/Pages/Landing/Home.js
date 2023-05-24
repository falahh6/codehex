import Features from "../Features/Features";
import styles from "./Home.module.css";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  return (
    <>
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
          "Unlock the Power of Intelligent Coding with codehex : The AI-Powered
          Compiler"
        </p>
        <div className={styles.ctaWrap}>
          <button className={styles.cta}>Start writing code</button>
        </div>
      </div>
      <hr />
      <Features />
    </>
  );
};

export default Home;
