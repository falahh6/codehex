import { useState } from "react";
import React from "react";
import styles from "./OpenAImodes.module.css";
import DropdownComponent from "../UI/Dropdown/DropdownComponent";
import {
  alternativeCode,
  codeExplanation,
  codeRefactor,
  errorDnF,
  codeTranslation,
} from "../../store/openai-slice";
import { useDispatch, useSelector } from "react-redux";
import useDropdown from "../../hooks/useDropdown";
import Response from "./Response";
import { SendOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const OpenAImodes = (props) => {
  const [mode, setMode] = useState({ key: "", label: "" });
  const dispatch = useDispatch();
  const userCode = useState(props.code)[0];
  const [toLangauge, setToLangauge] = useState("");
  const modeDropdown = useDropdown("1");
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni
  );
  const codeExplanationIni = useSelector(
    (state) => state.openai.codeExplanationIni
  );
  const codeRefactorIni = useSelector((state) => state.openai.codeRefactorIni);
  const errorDnFIni = useSelector((state) => state.openai.errorDnFIni);
  const codeTranslationIni = useSelector(
    (state) => state.openai.codeTranslationIni
  );
  const modeItems = [
    {
      key: 0,
      label: "Alternative code",
    },
    {
      key: 1,
      label: "code explanation",
    },
    {
      key: 2,
      label: "error detection and fix",
    },
    {
      key: 3,
      label: "code refactoring suggestions",
    },
    {
      key: 4,
      label: "code translation",
    },
  ];

  const handlerModeSelect = (selectedOption) => {
    // setMode({
    //   key: modeItems.find((item) => item.label === selectedOption.label).key,
    //   label: selectedOption.label,
    // });
    console.log(selectedOption);
    setMode({
      key: modeItems[selectedOption].key,
      label: modeItems[selectedOption].label,
    });
  };

  const toLangauageHandler = (event) => {
    const languageName = event.target.value.trim();
    setToLangauge(languageName);
  };

  console.log(mode);

  const promptHandler = async () => {
    const payload = {
      mode,
      userCode,
      toLangauge,
    };

    if (userCode.length > 0) {
      if (mode.label === "Alternative code") {
        dispatch(alternativeCode(payload));
      } else if (mode.label === "code explanation") {
        dispatch(codeExplanation(payload));
      } else if (mode.label === "error detection and fix") {
        dispatch(errorDnF(payload));
      } else if (mode.label === "code refactoring suggestions") {
        dispatch(codeRefactor(payload));
      } else if (mode.label === "code translation") {
        dispatch(codeTranslation(payload));
      }
    } else {
      toast.error("you need to write the code first!");
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
            placeHolder={"select your mode"}
          />
          <div className={styles.sendBtn}>
            <SendOutlined onClick={promptHandler} />
          </div>
        </div>
        <div className={styles.openAIresponse}>
          {mode.key === "0" && (
            <div>
              {alternativeCodeIni.status === "pending" ? (
                <span className={styles.textCursor}></span>
              ) : (
                ""
              )}
              <Response response={alternativeCodeIni.response} />
            </div>
          )}
          {mode.key === "1" && (
            <div>
              {codeExplanationIni.status === "pending" ? (
                <span className={styles.textCursor}></span>
              ) : (
                ""
              )}

              <Response response={codeExplanationIni.response} />
            </div>
          )}
          {mode.key === "2" && (
            <div>
              {errorDnFIni.status === "pending" ? (
                <span className={styles.textCursor}></span>
              ) : (
                ""
              )}
              <Response response={errorDnFIni.response} />
            </div>
          )}
          {mode.key === "3" && (
            <div>
              {codeRefactorIni.status === "pending" ? (
                <span className={styles.textCursor}></span>
              ) : (
                ""
              )}

              <Response response={codeRefactorIni.response} />
            </div>
          )}
          {mode.key === "4" && (
            <>
              <span> Enter the langauge in which you want to translate : </span>{" "}
              <input
                type="text"
                maxLength="20"
                onChange={toLangauageHandler}
                className={styles.langaugeToInput}
              />
              <hr />
              <div>
                {codeTranslationIni.status === "pending" ? (
                  <span className={styles.textCursor}></span>
                ) : (
                  ""
                )}
                <Response response={codeTranslationIni.response} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
