import Editor from "@monaco-editor/react";
import { useState } from "react";
import styles from "./CodeEditor.module.css";
const CodeEditor = ({ onCode, language }) => {
  const [code, setCode] = useState(
    `<main>
    <Editor
     height='30rem'
     value={value}
     theme="vs-dark"
     defaultLanguage="typescript"
     onChange={(val) => setValue(val)}
   />
   </main>`
  );

  const onChangeHandler = (val) => {
    setCode(val);
    onCode(val);
  };
  return (
    <main>
      <Editor
        height="30rem"
        value={code}
        theme="vs-light"
        className={styles.editor}
        language={language}
        onChange={onChangeHandler}
        options={{
          padding: {
            top: 10,
            bottom: 10,
          },
          folding: true,
          lightbulb: {
            enabled: true,
          },
          overviewRulerBorder: true,
        }}
      />
    </main>
  );
};

export default CodeEditor;
