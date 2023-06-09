import React, { useRef, useEffect, useState } from "react";
import programmingLanguages from "../../utils/languages";
import extensions from "../../utils/extensions";
import styles from "./Compiler.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { compilerOutput } from "../../store/compiler-slice";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Typography, Space } from "antd";
import { alternativeCode } from "../../store/compiler-slice";
import MonacoEditor from "react-monaco-editor/lib/editor";

const Compiler = () => {
  const dispatch = useDispatch();
  const [extensionDisplay, setExtensionDisplay] = useState();
  const [userCode, setUserCode] = useState("");
  const selectRef = useRef();
  const output = useSelector((state) => state.compiler.output);
  const alternativeCodeGenerated = useSelector(
    (state) => state.compiler.alternativeCode
  );
  const [selectedkeysState, setSelectedKeys] = useState("0");

  const OnChangePLHandler = ({ key }) => {
    setSelectedKeys(key);
  };

  useEffect(() => {
    setExtensionDisplay(extensions[selectedkeysState]);
  }, [selectedkeysState]);

  const items = programmingLanguages.map((language, index) => ({
    key: `${index}`,
    label: language,
    extension: extensions[index],
  }));

  const [editorWidth, setEditorWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setEditorWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const getResponseHandler = async () => {
    dispatch(alternativeCode());

    // setPromptResponse(alternativeCodeGenerated);
  };

  const submitHandler = (event) => {
    event.preventDefault();

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
    console.log(userCode);
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
          {/* <div className={styles.headDiv}>
            <Logo />
          </div> */}
          <div className={styles.mainDiv}>
            <form onSubmit={submitHandler} action="" className={styles.form}>
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
                <div className={styles.codeInput}>
                  <MonacoEditor
                    value={userCode}
                    language="javascript"
                    theme="vs-dark"
                    height="450"
                    width={editorWidth > 768 ? "550px" : "200px"}
                    onChange={(value) => {
                      setUserCode(value);
                    }}
                    options={{
                      acceptSuggestionOnCommitCharacter: true,
                      automaticLayout: true,
                      cursorBlinking: "solid",
                      cursorStyle: "block",
                      fontSize: "12px",
                      fontWeight: "800",
                      letterSpacing: "1",
                      glyphMargin: true,
                      padding: {
                        top: 10,
                        bottom: 10,
                      },
                      folding: true,
                    }}
                  />
                </div>
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
                          <button onClick={getResponseHandler}>
                            alternative code
                          </button>
                        </span>{" "}
                        <pre>
                          {" "}
                          <code>{alternativeCodeGenerated}</code>{" "}
                        </pre>
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
