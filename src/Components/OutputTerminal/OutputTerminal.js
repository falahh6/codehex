import { useEffect, useState, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

const XTerminal = () => {
  const terminalRef = useRef(null);
  const [terminal, setTerminal] = useState(null);

  useEffect(() => {
    const xterm = new Terminal();
    setTerminal(xterm);
    xterm.open(terminalRef.current);
    const fitAddon = new FitAddon();
    xterm.loadAddon(fitAddon);
    xterm.focus();
    fitAddon.fit();

    const handleCommand = (e) => {
      if (e.key === "Enter") {
        const command = xterm._core.buffer.translateBufferLineToString(
          xterm._core.buffer.ybase + xterm._core.buffer.y
        );
        xterm.writeln(""); // Add a new line after the command
        xterm._core.buffer.y++; // Move the cursor to the next line
        executeCommand(command);
      }
    };

    const executeCommand = (command) => {
      // Process the command and perform actions accordingly
      // For example, you can handle different commands using a switch statement
      switch (command.trim()) {
        case "hello":
          xterm.writeln("Hello, world!");
          break;
        case "date":
          const date = new Date().toLocaleString();
          xterm.writeln(date);
          break;
        default:
          xterm.writeln(`Unknown command: ${command}`);
      }
    };

    xterm.onKey((e) => {
      if (e.domEvent.key === "Enter") {
        handleCommand(e.domEvent);
      }
    });

    return () => {
      xterm.dispose();
    };
  }, []);

  return <div ref={terminalRef} />;
};

export default XTerminal;
