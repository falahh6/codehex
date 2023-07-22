import React, { useState } from "react";
import styles from "./Response.module.css";
import { Copy, Check } from "lucide-react";
import "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
const Response = (props) => {
  const response = props.response;
  const [isCopied, setIsCopied] = useState(false);

  const codeBlocks = response?.split(/(```[\w-]*\n[\s\S]*?\n```)/);
  const formattedBlocks = codeBlocks.map((block, index) => ({
    content: block,
    type: `${block.includes("```") ? "code" : "string"}`,
    key: index,
  }));

  let updatedCodeBlock;
  const replacedCodeBlocks = formattedBlocks.map((block) => {
    if (block.type === "code") {
      const lines = block.content.split("\n");

      lines.splice(0, 1);

      updatedCodeBlock = lines.join("\n");

      return { ...block, content: updatedCodeBlock };
    } else {
      return block;
    }
  });
  const codeBlockStyles = {
    backgroundColor: "#f6f8fa",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "4px",
    overflowX: "auto",
    marginLeft: "0",
    paddingLeft: "4px",
    marginTop: "0",
  };

  const codeStyles = {
    fontFamily: "Menlo, Monaco, monospace",
    fontSize: "12px",
    lineHeight: "1.7",
    color: "#333",
    maxWidth: "fit-content",
    fontWeight: "bold",
  };

  const paraStyles = {
    fontSize: "12px",
    fontWeight: "bold",
    letterSpacing: "0.5px",
  };

  const copyHandler = () => {
    const codeToCopy = updatedCodeBlock.replace("```", "");
    navigator.clipboard.writeText(codeToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  // const languageName = "c";
  return (
    <>
      {replacedCodeBlocks.map((block) =>
        block.type === "string" ? (
          <p style={paraStyles}>{block.content}</p>
        ) : (
          <div key={block.key} className={styles.codeSnippet}>
            <pre style={codeBlockStyles}>
              <span className={styles.codeSnippetHead}>
                <span></span>
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
              <code style={codeStyles} className="language-javascript">
                {block.content.replace("```", "")}
              </code>
            </pre>
          </div>
        )
      )}
    </>
  );
};

export default Response;
