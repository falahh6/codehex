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
  const [modeDisplay, setModeDisplay] = useState(null);
  const dispatch = useDispatch();
  const userCode = useState(props.code)[0];
  const [showRes, setShowRes] = useState(true);
  const alternativeCodeIni = useSelector(
    (state) => state.compiler.alternativeCodeIni.response
  );

  const modeDropdown = useDropdown("1");

  const modeItems = [
    {
      key: "0",
      label: "smart code suggestion",
      ui: `<div>
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
    </div>`,
    },
    {
      key: "1",
      label: "code explanation",
      ui: `<p>code ex </p>`,
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
    console.log(userCode);

    const payload = {
      mode,
      userCode,
    };

    dispatch(alternativeCode(payload));
    // setShowRes(true);
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
          {showRes && modeDisplay === "0" && (
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
          )}
          {showRes && modeDisplay === "1" && <p>code explanation</p>}
          {showRes && modeDisplay === "2" && <p>error detection and fix</p>}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
