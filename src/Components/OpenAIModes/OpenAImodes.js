import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import styles from "./OpenAImodes.module.css";
import DropdownComponent from "../UI/Dropdown/DropdownComponent";
import { alternativeCode } from "../../store/compiler-slice";
import { useDispatch, useSelector } from "react-redux";
import useDropdown from "../../hooks/useDropdown";
const OpenAImodes = () => {
  const [mode, setMode] = useState("");
  const dispatch = useDispatch();
  const alternativeCodeIni = useSelector(
    (state) => state.compiler.alternativeCodeIni
  );

  const modeDropdown = useDropdown("1");

  const modeItems = [
    {
      key: "0",
      label: "smart code suggestion",
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
    console.log(selectedOption.label);
  };

  const promptHandler = () => {
    console.log(mode + " testing mode selection...");
    dispatch(alternativeCode());
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
          <p className={styles.genCode}>{alternativeCodeIni}</p>
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
