import styles from "./Features.module.css";
import testimage1 from "../../assets/images/test1.png";
import testimage2 from "../../assets/images/test2.png";
import { Element } from "react-scroll";
const Features = () => {
  return (
    <Element name="features">
      <div className={styles.mainDiv}>
        <h1>
          How <span>codehex</span> helps you learn?
        </h1>
        <div>
          <div className={styles.featureOne}>
            <div>
              <img src={testimage1} alt="" />
            </div>
            <div>
              {" "}
              <h2>Smart code suggestion</h2>{" "}
            </div>
          </div>
          <div className={styles.featureTwo}>
            <div>
              <h2>Smart code suggestion</h2>{" "}
            </div>
            <div>
              <img src={testimage2} alt="" />
            </div>
          </div>
          <div className={styles.featureThree}>
            <div>
              <img src={testimage1} alt="" />
            </div>
            <div>
              <h2>Smart code suggestion</h2>{" "}
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Features;
