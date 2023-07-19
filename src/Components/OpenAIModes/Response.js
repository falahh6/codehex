import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "./Response.module.css";
import { Copy, Check } from "lucide-react";
import "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
const Response = (props) => {
  const response = props.response;
  const codeBlocks = response.split(/(```[\w-]*\n[\s\S]*?\n```)/);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);
  const formattedResponse = codeBlocks.map((block, index) => {
    if (index % 2 === 1) {
      const language = codeBlocks[index - 1];
      const blockLength = block.length;
      console.log(blockLength);

      const code = block.replace(new RegExp("```", "g"), "");
      const languageRegex = /(?<=^|\n)([a-zA-Z]+)(?=\n)/;
      const matches = code.match(languageRegex);
      const languageName = matches && matches[1];
      const updatedCodeBlock = code.replace(languageName, "");
      console.log(languageName);
      console.log(updatedCodeBlock);

      const copyHandler = () => {
        navigator.clipboard.writeText(updatedCodeBlock);
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      };

      return (
        <React.Fragment className={styles.codeSnippet}>
          <pre style={{ padding: "4px" }}>
            <span className={styles.codeSnippetHead}>
              <span>{languageName}</span>
              {isCopied ? (
                <Check size={"15"} />
              ) : (
                <Copy
                  onClick={copyHandler}
                  className={styles.copyIcon}
                  size={"15"}
                />
              )}
            </span>

            <code className="language-javascript">{updatedCodeBlock}</code>
          </pre>
        </React.Fragment>
      );
    }

    return (
      <TypeAnimation
        key={index}
        sequence={[block]}
        speed={100}
        cursor={false}
      />
    );
  });

  return <>{formattedResponse}</>;
};

export default Response;
