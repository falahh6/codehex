import React, { useRef, useEffect, useState } from "react";
import programmingLanguages from "../../utils/languages";
import extensions from "../../utils/extensions";
import styles from "./Compiler.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  compilerOutput,
  initialExecutionForInput,
} from "../../store/compiler-slice";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Typography, Space } from "antd";
import { alternativeCode } from "../../store/compiler-slice";
import MonacoEditor from "react-monaco-editor/lib/editor";
import "./editor.css";
import PreLoader from "../../Components/UI/PreLoader";

const checkingIfInputNeeded = (userCode) => {
  const inputPatterns = [
    /prompt\(/i,
    /readline\(/i,
    /input\(/i,
    /raw_input\(/i,
    /sys.stdin.readline\(/i,
    /Scanner\s*\w+\s*=\s*new\s*Scanner\(System\.in\)/i,
    /gets\(/i,
    /STDIN.gets\(/i,
  ];

  let inputCount = 0;
  for (const pattern of inputPatterns) {
    const matches = userCode.match(pattern);
    if (matches) {
      inputCount += matches.length;
    }
  }
  return inputCount;
};

const Compiler = () => {
  const dispatch = useDispatch();
  const [extensionDisplay, setExtensionDisplay] = useState();
  const [userCode, setUserCode] = useState("");
  const selectRef = useRef();
  const output = useSelector((state) => state.compiler.output);
  const finalOutput = useSelector((state) => state.compiler.finalOutput);
  const alternativeCodeGenerated = useSelector(
    (state) => state.compiler.alternativeCode
  );
  const [outputState, setOutputState] = useState(output);
  const [finalOutputState, setFinalOutputState] = useState(finalOutput);
  const [switchTab, setSwitchTab] = useState("output");
  const [selectedkeysState, setSelectedKeys] = useState("0");
  const [programTakingInput, setProgramTakingInput] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  const OnChangePLHandler = ({ key }) => {
    setSelectedKeys(key);
  };
  const inputRef = useRef();
  useEffect(() => {
    setExtensionDisplay(extensions[selectedkeysState]);
  }, [selectedkeysState]);

  const items = programmingLanguages.map((language, index) => ({
    key: `${index}`,
    label: language,
    extension: extensions[index],
  }));

  const getResponseHandler = async () => {
    dispatch(alternativeCode());
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedOption = items.filter(
      (item) => item.key === selectedkeysState
    );
    const extension = selectedOption[0].extension;
    const Selectedlanguage = selectedOption[0].label;

    console.log(Selectedlanguage, extension);
    console.log(userCode);
    const doesProgramNeedsInput = checkingIfInputNeeded(userCode);

    if (doesProgramNeedsInput) {
      setProgramTakingInput(true);
    }

    const payload = {
      Selectedlanguage,
      extension,
      userCode,
      doesProgramNeedsInput,
    };

    dispatch(initialExecutionForInput(payload));
    setOutputState(output);
  };

  const consoleInputFormOnSubmit = (e) => {
    e.preventDefault();

    console.log(inputRef.current.value);
    const newInput = inputRef.current.value;
    const selectedOption = items.filter(
      (item) => item.key === selectedkeysState
    );
    const extension = selectedOption[0].extension;
    const Selectedlanguage = selectedOption[0].label;

    const doesProgramNeedsInput = checkingIfInputNeeded(userCode);
    const payload = {
      Selectedlanguage,
      extension,
      userCode,
      newInput,
      doesProgramNeedsInput,
    };
    dispatch(compilerOutput(payload));
    setFinalOutputState(finalOutput);
  };

  const switchToOutput = () => {
    setSwitchTab("output");
  };

  const switchToOpenAI = () => {
    setSwitchTab("openAI");
  };
  const activeStyleForTabs = switchTab === "output" ? "tabActive" : "";

  return (
    <>
      {isLoading ? (
        <PreLoader />
      ) : (
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
              <div className={styles.mainDiv}>
                <form
                  onSubmit={submitHandler}
                  action=""
                  className={styles.form}
                >
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
                        // theme="vs-dark"
                        height="80vh"
                        width="95%"
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
                          glyphMargin: false,
                          padding: {
                            top: 10,
                            bottom: 10,
                          },
                          folding: true,
                          lightbulb: {
                            enabled: true,
                          },
                          overviewRulerBorder: true,
                          extraEditorClassName: "editor",
                        }}
                      />
                    </div>
                  </div>
                </form>
                <div className={styles.outputComponent}>
                  <div className={styles.consoleTabNavs}>
                    <span
                      onClick={switchToOutput}
                      className={activeStyleForTabs}
                    >
                      Output
                    </span>
                    <span onClick={switchToOpenAI}>OpenAI</span>
                  </div>
                  {switchTab === "output" && (
                    <div className={styles.Terminal}>
                      <div className={styles.outputForConsole}>
                        <span className={styles.promptLabel}>$</span>
                        <p className={styles.output}>{outputState.message}</p>
                        <span>
                          {programTakingInput ? (
                            <form
                              className={styles.outputForConsoleForm}
                              onSubmit={consoleInputFormOnSubmit}
                            >
                              <input ref={inputRef} type="text" />
                            </form>
                          ) : null}
                        </span>
                      </div>
                      <p className={styles.commandMessage}>
                        {finalOutputState.message}
                      </p>
                    </div>
                  )}

                  {switchTab === "openAI" && <p className={styles.openAI}></p>}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Compiler;
