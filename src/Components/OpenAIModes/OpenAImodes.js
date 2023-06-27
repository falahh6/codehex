import { useState } from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import styles from "./OpenAImodes.module.css";
import DropdownComponent from "../UI/Dropdown/DropdownComponent";
import { alternativeCode } from "../../store/compiler-slice";
import { useDispatch, useSelector } from "react-redux";
import useDropdown from "../../hooks/useDropdown";
import { Highlight, themes } from "prism-react-renderer";

const OpenAImodes = (props) => {
  const [mode, setMode] = useState("");
  const dispatch = useDispatch();
  const [userCode, setUserCode] = useState(props.code);
  const [showRes, setShowRes] = useState(false);
  const alternativeCodeIni = useSelector(
    (state) => state.compiler.alternativeCodeIni.response
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

  const promptHandler = async () => {
    console.log(userCode);
    dispatch(alternativeCode(userCode));
    setShowRes(true);
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
          {showRes ? (
            <div>
              <p>Here is your alternative code :</p>
              <Highlight
                theme={themes.nightOwlLight}
                code={alternativeCodeIni}
                language="tsx"
              >
                {({
                  className,
                  style,
                  tokens,
                  getLineProps,
                  getTokenProps,
                }) => (
                  <pre className={styles.codeSnippet} style={style}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>

              <button onClick={props.codeReplaceHandlerProp}>
                {" "}
                Replace code
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
