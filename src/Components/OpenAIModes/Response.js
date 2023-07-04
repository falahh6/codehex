import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { Highlight, themes } from "prism-react-renderer";
import { TypeAnimation } from "react-type-animation";
import styles from "./OpenAImodes.module.css";
const Response = (props) => {
  const response = props.response;
  const codeBlocks = response.split(/(```[\w-]*\n[\s\S]*?\n```)/);

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

      return (
        <Highlight
          theme={themes.jettwaveDark}
          code={updatedCodeBlock}
          language={language}
          key={index}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              <div className={styles.codeSnippetHead}>
                <span>{languageName}</span>
                <FontAwesomeIcon icon={faCopy} />
              </div>
              <pre key={index} className={styles.codeSnippet} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <TypeAnimation
                        key={index}
                        sequence={[token.content]}
                        cursor={false}
                      />
                    ))}
                  </div>
                ))}
              </pre>
            </>
          )}
        </Highlight>
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
