import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import styles from "./OpenAImodes.module.css";
import DropdownComponent from "../UI/Dropdown/DropdownComponent";
import {
  alternativeCode,
  codeExplanation,
  OpenAIActions,
} from "../../store/openai-slice";
import { useDispatch, useSelector } from "react-redux";
import useDropdown from "../../hooks/useDropdown";
import { TypeAnimation } from "react-type-animation";
import Response from "./Response";

const OpenAImodes = (props) => {
  const [mode, setMode] = useState("");
  const [modeDisplay, setModeDisplay] = useState(null);
  const dispatch = useDispatch();
  const userCode = useState(props.code)[0];
  const modeDropdown = useDropdown("1");
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni.response
  );
  const codeExplanationIni = useSelector(
    (state) => state.openai.codeExplanationIni.response
  );

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
  ];

  const handlerModeSelect = (selectedOption) => {
    setMode(selectedOption.label);
    setModeDisplay(
      modeItems.find((item) => item.label === selectedOption.label).key
    );
  };

  const promptHandler = async () => {
    const payload = {
      mode,
      userCode,
    };
    console.log(mode);

    setModeDisplay(modeItems.find((item) => item.label === mode).key);
    console.log(modeDisplay);

    if (mode === "Alternative code") {
      dispatch(alternativeCode(payload));
    } else if (mode === "code explanation") {
      dispatch(codeExplanation(payload));
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
          {modeDisplay === "0" && (
            <div>
              <Response response={alternativeCodeIni} />

              {/* <button onClick={props.codeReplaceHandlerProp}>
                {" "}
                Replace code
              </button> */}
            </div>
          )}
          {modeDisplay === "1" && <Response response={codeExplanationIni} />}
          {modeDisplay === "2" && <Response response={"error and fix"} />}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
