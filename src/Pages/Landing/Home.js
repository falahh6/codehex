import styles from "./Home.module.css";

const Home = () => {
  return (
    <>
      <div className={styles.main}>
        <h1> Wanna learn coding?</h1>
        <p>
          {" "}
          "Unlock the Power of Intelligent Coding with CodeHex: The AI-Powered
          Compiler"
        </p>
        <button className={styles.cta}>start writing code</button>
      </div>
    </>
  );
};

export default Home;
