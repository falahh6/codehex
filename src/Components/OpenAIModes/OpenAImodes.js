import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import styles from "./OpenAImodes.module.css";
import DropdownComponent from "../UI/Dropdown/DropdownComponent";
import { alternativeCode } from "../../store/openai-slice";
import { useDispatch } from "react-redux";
import useDropdown from "../../hooks/useDropdown";
import { TypeAnimation } from "react-type-animation";
import AlternativeCodeResponse from "./AlternativeCodeResponse";

const OpenAImodes = (props) => {
  const [mode, setMode] = useState("");
  const [modeDisplay, setModeDisplay] = useState(null);
  const dispatch = useDispatch();
  const userCode = useState(props.code)[0];
  const modeDropdown = useDropdown("1");

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
    console.log(modeItems.find((item) => item.label === selectedOption.label));
    console.log(selectedOption.label);
  };

  const promptHandler = async () => {
    const payload = {
      mode,
      userCode,
    };

    dispatch(alternativeCode(payload));
  };

  const er = "error detection and fix";
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
              <AlternativeCodeResponse />

              {/* <button onClick={props.codeReplaceHandlerProp}>
                {" "}
                Replace code
              </button> */}
            </div>
          )}
          {modeDisplay === "1" && (
            <TypeAnimation sequence={["code explanation"]} cursor={false} />
          )}
          {modeDisplay === "2" && (
            <TypeAnimation sequence={[er]} cursor={false} />
          )}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
