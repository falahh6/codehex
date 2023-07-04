import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import styles from "./OpenAImodes.module.css";
import DropdownComponent from "../UI/Dropdown/DropdownComponent";
import {
  alternativeCode,
  codeExplanation,
  codeRefactor,
  errorDnF,
} from "../../store/openai-slice";
import { useDispatch, useSelector } from "react-redux";
import useDropdown from "../../hooks/useDropdown";
import Response from "./Response";

const OpenAImodes = (props) => {
  const [mode, setMode] = useState({ key: "", label: "" });
  const dispatch = useDispatch();
  const userCode = useState(props.code)[0];
  const modeDropdown = useDropdown("1");
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni
  );
  const codeExplanationIni = useSelector(
    (state) => state.openai.codeExplanationIni
  );
  const codeRefactorIni = useSelector((state) => state.openai.codeRefactorIni);
  const errorDnFIni = useSelector((state) => state.openai.errorDnFIni);
  const modeItems = [
    {
      key: "0",
      label: "Alternative code",
    },
    {
      key: "1",
      label: "code explanation",
    },
    {
      key: "2",
      label: "error detection and fix",
    },
    {
      key: "3",
      label: "code refactoring suggestions",
    },
  ];

  const handlerModeSelect = (selectedOption) => {
    setMode({
      key: modeItems.find((item) => item.label === selectedOption.label).key,
      label: selectedOption.label,
    });
    console.log(mode);
  };

  // useEffect(() => {
  //   if (mode === "Alternative code") {
  //     setModeDisplay("0");
  //   } else if (mode === "code explanation") {
  //     setModeDisplay("1");
  //   } else if (mode === "error detection and fix") {
  //     setModeDisplay("2");
  //   }
  //   console.log(mode, modeDisplay);
  // }, [mode]);

  const promptHandler = async () => {
    const payload = {
      mode,
      userCode,
    };

    if (mode.label === "Alternative code") {
      dispatch(alternativeCode(payload));
    } else if (mode.label === "code explanation") {
      dispatch(codeExplanation(payload));
    } else if (mode.label === "error detection and fix") {
      dispatch(errorDnF(payload));
    } else if (mode.label === "code refactoring suggestions") {
      dispatch(codeRefactor(payload));
    }
  };

  return (
    <>
      <div className={styles.openAI}>
        <div className={styles.prompt}>
          <DropdownComponent
            items={modeItems}
            dropdownHook={modeDropdown}
            dropdownStyle={styles.modeDropdown}
            onOptionSelect={handlerModeSelect}
          />
          <div className={styles.sendBtn}>
            <FontAwesomeIcon onClick={promptHandler} icon={faPaperPlane} />
          </div>
        </div>
        <div className={styles.openAIresponse}>
          {mode.key === "0" && (
            <div>
              {alternativeCodeIni.status === "pending" ? (
                <span className={styles.textCursor}></span>
              ) : (
                <Response response={alternativeCodeIni.response} />
              )}
              {alternativeCodeIni.status === "done" ? (
                ""
              ) : (
                <span className={styles.textCursor}></span>
              )}
            </div>
          )}
          {mode.key === "1" && (
            <div>
              {" "}
              {codeExplanationIni.status === "pending" ? (
                <span className={styles.textCursor}>...</span>
              ) : (
                <Response response={codeExplanationIni.response} />
              )}
              {codeExplanationIni.status === "done" ? (
                ""
              ) : (
                <span className={styles.textCursor}></span>
              )}
            </div>
          )}
          {mode.key === "2" && (
            <div>
              {errorDnFIni.status === "pending" ? (
                <span className={styles.textCursor}>...</span>
              ) : (
                <Response response={errorDnFIni.response} />
              )}
              {codeExplanationIni.status === "done" ? (
                ""
              ) : (
                <span className={styles.textCursor}></span>
              )}
            </div>
          )}
          {mode.key === "3" && (
            <div>
              {codeRefactorIni.status === "pending" ? (
                <span className={styles.textCursor}>...</span>
              ) : (
                <Response response={codeRefactorIni.response} />
              )}
              {codeRefactorIni.status === "done" ? (
                ""
              ) : (
                <span className={styles.textCursor}></span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
