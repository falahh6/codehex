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
  alternativeCode,
  compilerOutput,
  initialExecutionForInput,
} from "../../store/compiler-slice";
import { compilerActions } from "../../store/compiler-slice";
import MonacoEditor from "react-monaco-editor/lib/editor";
import "./editor.css";
import PreLoader from "../../Components/UI/PreLoader";
import useDropdown from "../../hooks/useDropdown";
import DropdownComponent from "../../Components/UI/Dropdown/DropdownComponent";
import OpenAImodes from "../../Components/OpenAIModes/OpenAImodes";
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
  const [extensionState, setExtension] = useState();
  const [userCode, setUserCode] = useState("");
  const [language, setLanguage] = useState("");

  const output = useSelector((state) => state.compiler.output);
  const finalOutput = useSelector((state) => state.compiler.finalOutput);
  const [outputState, setOutputState] = useState(output);
  const [finalOutputState, setFinalOutputState] = useState(finalOutput);
  const [switchTab, setSwitchTab] = useState("output");
  const [programTakingInput, setProgramTakingInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const alternativeCodeIni = useSelector(
    (state) => state.compiler.alternativeCodeIni.response
  );
  const languageDropdown = useDropdown("1");

  const handlerLanguageSelect = (selectedOption) => {
    setExtension(selectedOption.extension);
    setLanguage(selectedOption.label);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  const inputRef = useRef();

  const languagesItems = programmingLanguages.map((language, index) => ({
    key: `${index}`,
    label: language,
    extension: extensions[index],
  }));

  const submitHandler = (event) => {
    event.preventDefault();

    const extension = extensionState;
    const Selectedlanguage = language;

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

    console.log(payload);

    dispatch(initialExecutionForInput(payload));
    setOutputState(output);
  };

  const consoleInputFormOnSubmit = (e) => {
    e.preventDefault();

    const newInput = inputRef.current.value;
    const extension = extensionState;
    const Selectedlanguage = language;

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

  const codeReplacehandler = () => {
    setUserCode(alternativeCodeIni);
  };

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
                    <DropdownComponent
                      items={languagesItems}
                      dropdownHook={languageDropdown}
                      dropdownStyle={styles.langSelect}
                      maxMenuHeight="90vh"
                      onOptionSelect={handlerLanguageSelect}
                    />
                    <button className={styles.runButton}>
                      <FontAwesomeIcon icon={faPlay} />
                      <span> Run </span>
                    </button>
                  </div>
                  <div className={styles.codeBlock}>
                    <h4 className={styles.fileName}>
                      main<span>{extensionState}</span>
                    </h4>
                    <div className={styles.codeInput}>
                      <MonacoEditor
                        value={userCode}
                        language="javascript"
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
                        <p className={styles.output}>{output}</p>
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

                  {switchTab === "openAI" && (
                    <OpenAImodes
                      code={[userCode, setUserCode]}
                      codeReplaceHandlerProp={codeReplacehandler}
                    />
                  )}
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
