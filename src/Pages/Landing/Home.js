import { useEffect, useState } from "react";
import Features from "../Features/Features";
import styles from "./Home.module.css";

const Home = () => {
  const [texts, setTexts] = useState([
    "Wanna Learn Coding?",
    "Looking for a Perfect Compiler?",
  ]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <>
      <div className={styles.main}>
        <h1>{texts[index]}</h1>
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
