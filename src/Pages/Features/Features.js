import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Logo from "../../utils/Logo";
import styles from "./Features.module.css";

const Features = () => {
  const handleItemClick = (item) => {};

  const modes = [
    {
      name: "Alternative Code Suggestions",
      code: "altcode",
    },
    {
      name: "Code Explanation",
      code: "codeexpl",
    },
    {
      name: "Error detection and fix",
      code: "codeerr",
    },
    {
      name: "Code Refactor",
      code: "coderef",
    },
    {
      name: "Code Translation",
      code: "codetr",
    },
  ];

  return (
    <>
      <Helmet>
        <title>codehex - features</title>
      </Helmet>
      <main className={styles.rootmain}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.mainDiv}>
          <motion.ul
            className={styles.sidebar}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {modes.map((item) => (
              <motion.li
                onClick={() => handleItemClick(item.code)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {item.name}
              </motion.li>
            ))}
          </motion.ul>
          <div className={styles.contentArea}>
            <h1 className={styles.headingAltcode}>
              {" "}
              <span style={{ color: "#004AAD" }}>#</span> Alternative code
              suggestions
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio
              harum, corrupti nostrum quis labore libero sit explicabo nulla est
              excepturi, laboriosam atque id distinctio ut. Dolore, aliquid
              excepturi saepe officia minima quam quaerat sequi fuga autem
              tempora distinctio ratione iusto temporibus commodi numquam culpa
              veniam ipsa laborum ut quod hic!
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Features;
