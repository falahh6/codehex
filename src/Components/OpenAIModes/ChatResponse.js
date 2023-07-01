import { useSelector } from "react-redux";
import { Highlight, themes } from "prism-react-renderer";
import { TypeAnimation } from "react-type-animation";
import styles from "./OpenAImodes.module.css";
const ChatResponse = () => {
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni.response
  );

  const codeBlock = alternativeCodeIni.split(/(```[\w-]*\n[\s\S]*?\n```)/);

  console.log(codeBlock);
  const formattedResponse = codeBlock.map((block, index) => {
    if (index % 2 === 1) {
      const language = codeBlock[index - 1];
      return (
        <Highlight
          theme={themes.nightOwlLight}
          code={block}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
      );
    }

    return <TypeAnimation sequence={[block]} speed={100} cursor={false} />;
  });

  return <>{formattedResponse}</>;
};

export default ChatResponse;
