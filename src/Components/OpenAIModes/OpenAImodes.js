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
import { TypeAnimation } from "react-type-animation";

const OpenAImodes = (props) => {
  const [mode, setMode] = useState("");
  const [modeDisplay, setModeDisplay] = useState(null);
  const dispatch = useDispatch();
  const userCode = useState(props.code)[0];
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
    setTimeout(() => {
      setShowRes(true);
    }, 1500);
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
          {showRes && modeDisplay === "0" && (
            <div>
              <TypeAnimation
                sequence={["Here is your alternative code :"]}
                cursor={false}
              />
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
                          <TypeAnimation
                            key={key}
                            sequence={[token.content]}
                            cursor={false}
                          />
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
          {showRes && modeDisplay === "1" && (
            <TypeAnimation sequence={["code explanation"]} cursor={false} />
          )}
          {showRes && modeDisplay === "2" && (
            <TypeAnimation sequence={[er]} cursor={false} />
          )}
        </div>
      </div>
    </>
  );
};

export default OpenAImodes;
