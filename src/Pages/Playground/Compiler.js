import React, { useRef } from "react";
import programmingLanguages from "../../utils/languages";
import extensions from "../../utils/extensions";
import styles from "./Compiler.module.css";
import Logo from "../../utils/Logo";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { compilerOutput } from "../../store/compiler-slice";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Typography, Space, Menu } from "antd";
import { useState } from "react";
import { useEffect } from "react";
const Compiler = () => {
  const dispatch = useDispatch();
  const [extensionDisplay, setExtensionDisplay] = useState();
  const codeRef = useRef();
  const selectRef = useRef();
  const output = useSelector((state) => state.compiler.output);
  const [selectedkeysState, setSelectedKeys] = useState("1");

  const OnChangePLHandler = ({ key }) => {
    setSelectedKeys(key);
    // console.log(selectedkeysState);
  };

  useEffect(() => {
    console.log(selectedkeysState);
    console.log();
    setExtensionDisplay(extensions[selectedkeysState]);
  }, [selectedkeysState]);

  const submitHandler = (event) => {
    event.preventDefault();

    const userCode = codeRef.current.value;
    const selectedOption = selectRef.current.selectedOptions[0];
    const extension = selectedOption.value;
    const language = selectedOption.text;

    dispatch(compilerOutput({ language, extension, userCode }));
  };

  const items = programmingLanguages.map((language, index) => ({
    key: `${index}`,
    label: language,
    extension: extensions[index],
  }));

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div>
          <Helmet>
            <title>Compiler</title>
          </Helmet>
          <div className={styles.headDiv}>
            <Logo />
          </div>
          <div className={styles.mainDiv}>
            <form onSubmit={submitHandler} action="" className={styles.form}>
              {/* <div className={styles["line-numbers"]}></div> */}
              <div className={styles.actions}>
                <Dropdown
                  menu={{
                    items,
                    selectable: true,
                    selectedKeys: selectedkeysState,
                    onClick: OnChangePLHandler,
                  }}
                  autoAdjustOverflow
                  overlayStyle={{
                    overflowY: "scroll",
                    maxHeight: "75.6vh",
                    border: "1px solid lightgrey",
                    borderRadius: "4px",
                  }}
                >
                  <Typography.Link>
                    <Space>
                      {
                        items.find((item) => item.key === selectedkeysState)
                          .label
                      }
                      <DownOutlined />
                    </Space>
                  </Typography.Link>
                </Dropdown>
                <button className={styles.runButton}>
                  <FontAwesomeIcon icon={faPlay} />
                  <span> Run </span>
                </button>
              </div>
              <div className={styles.codeBlock}>
                <h4 className={styles.fileName}>
                  main.<span>{extensionDisplay}</span>
                </h4>
                <textarea
                  className={styles.codeInput}
                  ref={codeRef}
                  type="text"
                  id="code"
                  placeholder=""
                />
              </div>
            </form>
            <div className={styles.output}>
              <div>
                <Accordion defaultActiveKey="0" flush alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Output</Accordion.Header>
                    <Accordion.Body>{output}</Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Accordion Item #2</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Accordion Item #3</Accordion.Header>
                    <Accordion.Body>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Compiler;
