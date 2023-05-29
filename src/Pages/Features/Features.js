import styles from "./Features.module.css";
import testimage1 from "../../assets/images/test1.png";
import { Element } from "react-scroll";
const Features = () => {
  return (
    <Element id="features" name="features">
      <div className={styles.mainDiv}>
        <h1>
          How <span>codehex</span> helps you learn?
        </h1>
        <div>
          <div className={styles.featureOne}>
            <div className={styles.f1h2}>
              {" "}
              <h2>Smart code suggestion</h2>{" "}
            </div>
            <div className={styles.f1i1}>
              <img src={testimage1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Features;
