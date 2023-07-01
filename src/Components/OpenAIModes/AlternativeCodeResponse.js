import { useSelector } from "react-redux";
import { Highlight, themes } from "prism-react-renderer";
import { TypeAnimation } from "react-type-animation";
import styles from "./OpenAImodes.module.css";
const AlternativeCodeResponse = () => {
  const alternativeCodeIni = useSelector(
    (state) => state.openai.alternativeCodeIni.response
  );

  const codeBlocks = alternativeCodeIni.split(/(```[\w-]*\n[\s\S]*?\n```)/);

  const formattedResponse = codeBlocks.map((block, index) => {
    if (index % 2 === 1) {
      const language = codeBlocks[index - 1];
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

export default AlternativeCodeResponse;
