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
import { alternativeCode } from "../../store/compiler-slice";
// import { OpenAIApi, Configuration } from "openai";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const Compiler = () => {
  const dispatch = useDispatch();
  const [extensionDisplay, setExtensionDisplay] = useState();
  const codeRef = useRef();
  const selectRef = useRef();
  const output = useSelector((state) => state.compiler.output);
  const [selectedkeysState, setSelectedKeys] = useState("0");
  const [promptResponse, setPromptResponse] = useState("");

  const OnChangePLHandler = ({ key }) => {
    setSelectedKeys(key);
    // console.log(selectedkeysState);
  };

  useEffect(() => {
    setExtensionDisplay(extensions[selectedkeysState]);
  }, [selectedkeysState]);

  const items = programmingLanguages.map((language, index) => ({
    key: `${index}`,
    label: language,
    extension: extensions[index],
  }));

  const getResponseHandler = async () => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You: tell me a joke" },
          { role: "user", content: "Assistant: Knock, knock" },
          { role: "assistant", content: "User: Who's there?" },
        ],
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userCode = codeRef.current.value;
    const selectedOption = items.filter(
      (item) => item.key === selectedkeysState
    );
    const extension = selectedOption[0].extension;
    const Selectedlanguage = selectedOption[0].label;

    console.log(Selectedlanguage, extension);

    const payload = {
      Selectedlanguage,
      extension,
      userCode,
    };
    dispatch(compilerOutput(payload));
  };

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
                    itemRef: selectRef,
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
                  main<span>{extensionDisplay}</span>
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
                    <Accordion.Body style={{ fontWeight: "bolder" }}>
                      {"> "}
                      {output}
                      <span className={styles.textCursor}> &nbsp;</span>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>OpenAI</Accordion.Header>
                    <Accordion.Body>
                      <div className={styles.accbody}>
                        <span>
                          <button onClick={getResponseHandler}>hey</button>
                        </span>{" "}
                        <p>{promptResponse}</p>
                      </div>
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
