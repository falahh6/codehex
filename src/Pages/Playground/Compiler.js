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
import PreLoader from "../../Components/UI/PreLoader";
import useDropdown from "../../hooks/useDropdown";
import DropdownComponent from "../../Components/UI/Dropdown/DropdownComponent";
import OpenAImodes from "../../Components/OpenAIModes/OpenAImodes";
import { Tabs } from "antd";
import CodeEditor from "../../Components/CodeEditor.js/CodeEditor";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "sonner";

// const checkingIfInputNeeded = (userCode) => {
//   const inputPatterns = [
//     /prompt\(/i,
//     /readline\(/i,
//     /input\(/i,
//     /raw_input\(/i,
//     /sys.stdin.readline\(/i,
//     /Scanner\s*\w+\s*=\s*new\s*Scanner\(System\.in\)/i,
//     /gets\(/i,
//     /STDIN.gets\(/i,
//   ];

//   let inputCount = 0;
//   for (const pattern of inputPatterns) {
//     const matches = userCode.match(pattern);
//     if (matches) {
//       inputCount += matches.length;
//     }
//   }
//   return inputCount;
// };

export const languagesItems = programmingLanguages.map((language, index) => ({
  key: `${index}`,
  label: language,
  extension: extensions[index],
}));

const Compiler = () => {
  const dispatch = useDispatch();
  const [extensionState, setExtension] = useState();
  const [userCode, setUserCode] = useState(``);
  const [language, setLanguage] = useState("");

  const output = useSelector((state) => state.compiler.output);
  const finalOutput = useSelector((state) => state.compiler.finalOutput);
  const [finalOutputState, setFinalOutputState] = useState(finalOutput);
  const [programTakingInput, setProgramTakingInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni.response
  );
  const isLoadingState = useSelector((state) => state.compiler.isLoading);
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

  const submitHandler = async (event) => {
    event.preventDefault();

    const extension = extensionState;
    const Selectedlanguage = language;

    console.log(Selectedlanguage, extension);
    console.log(userCode);

    const payload = {
      Selectedlanguage,
      extension,
      userCode,
    };

    if (userCode.length === 0 && Selectedlanguage.length === 0) {
      toast.error("look at the fields, you dumb!!");
    }

    dispatch(initialExecutionForInput(payload));
  };

  const consoleInputFormOnSubmit = (e) => {
    e.preventDefault();

    const newInput = inputRef.current.value;
    const extension = extensionState;
    const Selectedlanguage = language;
    const payload = {
      Selectedlanguage,
      extension,
      userCode,
      newInput,
    };

    dispatch(compilerOutput(payload));
    setFinalOutputState(finalOutput);
  };

  const codeReplacehandler = () => {
    setUserCode(alternativeCodeIni);
  };
  const handleCode = (code) => {
    setUserCode(code);
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
                      {isLoadingState ? (
                        <LoadingOutlined />
                      ) : (
                        <FontAwesomeIcon icon={faPlay} />
                      )}
                      <span> Run </span>
                    </button>
                  </div>
                  <div className={styles.codeBlock}>
                    <h4 className={styles.fileName}>
                      main<span>{extensionState}</span>
                    </h4>
                    <div className={styles.codeInput}>
                      <CodeEditor language={language} onCode={handleCode} />
                    </div>
                  </div>
                </form>
                <div className={styles.outputComponent}>
                  <Tabs
                    tabBarStyle={{
                      paddingLeft: "0.5rem",
                      marginBottom: "0",
                      fontWeight: "500",
                    }}
                    items={[
                      {
                        label: "Output",
                        key: 1,
                        children: (
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
                        ),
                      },
                      {
                        label: "OpenAI",
                        key: 2,
                        children: (
                          <OpenAImodes
                            code={[userCode, setUserCode]}
                            codeReplaceHandlerProp={codeReplacehandler}
                          />
                        ),
                      },
                    ]}
                  />
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
