import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "./OutputTerminal.css";
import styles from "./OutputTerminal.module.css";
const XTerminal = ({ executeCommand }) => {
  const terminalRef = useRef(null);
  const [terminal, setTerminal] = useState(null);
  const output = useSelector((state) => state.compiler.output);

  useEffect(() => {
    const xterm = new Terminal();
    setTerminal(xterm);
    xterm.open(terminalRef.current);
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xterm.focus();
    fitAddon.fit();
    const promptLabel = "$ ";

    const handleCommand = (command) => {
      xterm.writeln("");
      executeCommand(command);
    };

    const executeCommand = (command) => {
      switch (command.trim()) {
        case "$ hello":
          xterm.writeln("Hello, world!");
          break;
        case "$ date":
          const date = new Date().toLocaleString();
          xterm.writeln(date);
          break;
        case "$ run":
          xterm.writeln(output);
          break;
        default:
          xterm.writeln(`Unknown command: ${command}`);
      }
      xterm.write(promptLabel);
    };

    xterm.onKey((e) => {
      const printable =
        !e.domEvent.altKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
      if (e.domEvent.key === "Enter") {
        const command = xterm._core.buffer.translateBufferLineToString(
          xterm._core.buffer.ybase + xterm._core.buffer.y
        );
        handleCommand(command);
      } else if (e.domEvent.key === "Backspace") {
        const cursorPosition = xterm._core.buffer.x;
        if (cursorPosition > promptLabel.length) {
          xterm.write("\b \b");
        }
      } else if (printable) {
        xterm.write(e.key);
      }
    });

    xterm.write(promptLabel);

    return () => {
      xterm.dispose();
    };
  }, []);

  return <div className={styles.Terminal} ref={terminalRef} />;
};

export default XTerminal;
