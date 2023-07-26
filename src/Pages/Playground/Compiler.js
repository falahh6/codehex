import React, { useRef, useEffect, useState } from "react";
import programmingLanguages from "../../utils/languages";
import extensions from "../../utils/extensions";
import styles from "./Compiler.module.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { initialExecutionForInput } from "../../store/compiler-slice";
import PreLoader from "../../Components/UI/PreLoader";
import useDropdown from "../../hooks/useDropdown";
import DropdownComponent from "../../Components/UI/Dropdown/DropdownComponent";
import OpenAImodes from "../../Components/OpenAIModes/OpenAImodes";
import { Tabs, Button, Input, Divider } from "antd";
import CodeEditor from "../../Components/CodeEditor.js/CodeEditor";
import { LoadingOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { Computer, Share } from "lucide-react";
import ShareModal from "../../Components/ShareModal/ShareModal";
import { NavLink } from "react-router-dom";

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
  const [userCode, setUserCode] = useState("");
  const [language, setLanguage] = useState("");

  const output = useSelector((state) => state.compiler.output);
  const finalOutput = useSelector((state) => state.compiler.finalOutput);
  const [finalOutputState] = useState(finalOutput);
  const [isLoading, setIsLoading] = useState(true);
  const [modal2Open, setModal2Open] = useState(false);
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni.response
  );
  let isLoadingState = useSelector((state) => state.compiler.isLoading);
  const languageDropdown = useDropdown("1");
  const handlerLanguageSelect = (selectedOption) => {
    console.log(selectedOption);
    setExtension(languagesItems[selectedOption].extension);
    setLanguage(languagesItems[selectedOption].label);
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

    const userInput = inputRef.current.input.value;

    const payload = {
      Selectedlanguage,
      extension,
      userCode,
      userInput,
    };

    if (userCode.length === 0 && Selectedlanguage.length === 0) {
      toast.error("look at the fields, you dumb!!");
      isLoadingState = false;
    }

    dispatch(initialExecutionForInput(payload));
  };

  const codeReplacehandler = () => {
    setUserCode(alternativeCodeIni);
  };
  const handleCode = (code) => {
    setUserCode(code);
  };
  const keySubmitHandler = (event) => {
    if ((event.metaKey || event.crtlKey) && event.key === "Enter") {
      console.log("key pressed");
    }
  };

  const shareHandler = () => {
    setModal2Open(true);
  };
  return (
    <div>
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
              <div className={styles.mainDivRes}>
                <div>
                  <p>It's recommeneded to use our compiler only on PC</p>
                  <Divider className={styles.divider}>
                    <Computer size={12} />
                  </Divider>
                  <p>The responsive version of our compiler is coming soon!!</p>
                  <Button>
                    <NavLink to={"/"}>Go Back</NavLink>
                  </Button>
                </div>
              </div>
              <div className={styles.mainDiv}>
                <form action="" className={styles.form}>
                  <div className={styles.actions}>
                    <DropdownComponent
                      items={languagesItems}
                      dropdownHook={languageDropdown}
                      dropdownStyle={styles.langSelect}
                      maxMenuHeight="85vh"
                      onOptionSelect={handlerLanguageSelect}
                      placeHolder="Select a Language"
                    />
                    <div>
                      <Button
                        className={styles.shareButton}
                        onClick={shareHandler}
                      >
                        <Share size={15} />
                        <span> Share </span>
                      </Button>
                      <Button
                        type="primary"
                        onClick={submitHandler}
                        className={styles.runButton}
                      >
                        {isLoadingState ? (
                          <LoadingOutlined
                            size={18}
                            style={{ marginLeft: "0" }}
                          />
                        ) : (
                          <FontAwesomeIcon icon={faPlay} />
                        )}
                        <span> Run </span>
                      </Button>
                    </div>
                    <ShareModal
                      onModalOpen={modal2Open}
                      onModalClose={() => setModal2Open(false)}
                      userCode={userCode}
                      codeOutput={output}
                    />
                  </div>
                  <div className={styles.codeBlock}>
                    <h4 className={styles.fileName}>
                      main<span>{extensionState}</span>
                    </h4>
                    <div className={styles.codeInput}>
                      <CodeEditor
                        onKeyDown={keySubmitHandler}
                        language={language}
                        onCode={handleCode}
                      />
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
                            <Input
                              placeholder="Your input here"
                              className={styles.userInputField}
                              ref={inputRef}
                            />
                            <div className={styles.outputForConsole}>
                              <span className={styles.promptLabel}>$</span>
                              <p className={styles.output}>{output}</p>
                              <span></span>
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
    </div>
  );
};

export default Compiler;
