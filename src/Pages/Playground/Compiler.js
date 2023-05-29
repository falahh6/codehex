import React, { useRef, useState } from "react";
import axios from "axios";
import styles from "./Compiler.module.css";
import Logo from "../../utils/Logo";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion } from "react-bootstrap";
import { Helmet } from "react-helmet";
const Compiler = () => {
  const [outputLoading, setOutputLoading] = useState(false);
  const [lineNumbers, setLineNumbers] = useState("");
  let outputCheck;
  const codeRef = useRef();
  const selectRef = useRef();
  const [output, setOutput] = useState("");
  const executeCodeHandler = async (userCode) => {
    const options = {
      method: "POST",
      url: "https://onecompiler-apis.p.rapidapi.com/api/v1/run",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_COMPILER_API,
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      data: {
        language: "javascript",
        stdin: "Peter",
        files: [
          {
            name: "index.js",
            content: userCode,
          },
        ],
      },
    };

    try {
      const response = await axios.request(options);
      outputCheck = response.data;
      console.log(outputCheck);
    } catch (error) {
      console.log(error);
    }

    console.log(outputCheck.stdout);
    setOutput(outputCheck.stdout);
    console.log("executing");
    setOutputLoading(false);
  };

  const submitHandler = (event) => {
    setOutputLoading(true);
    event.preventDefault();
    setLineNumbers(
      event.target.value.split("\n").map((_, i) => <span key={i}>{i + 1}</span>)
    );

    const userCode = codeRef.current.value;
    const selectedOption = selectRef.current.selectedOptions[0];
    const extension = selectedOption.value;
    const language = selectedOption.text;

    console.log(userCode, language, extension);

    // executeCodeHandler(userCode);

    setOutputLoading(false);
  };

  // Array of programming languages
  const programmingLanguages = [
    "Select the programming language",
    "Ada95",
    "ASM (NASM)",
    "ASM (NASM)",
    "Awk (gawk)",
    "Awk (mawk)",
    "Bash",
    "BC",
    "Brainf*ck",
    "C",
    "C",
    "C (Clang)",
    "C++",
    "C++",
    "C++",
    "C++ (ASM GCC)",
    "C++ (Clang)",
    "Clojure",
    "CLIPS",
    "Cobol",
    "Cobol",
    "CoffeeScript",
    "Common Lisp (CLISP)",
    "Common Lisp (SBCL)",
    "CPP",
    "CPP",
    "D",
    "D",
    "D (Clang)",
    "D (DMD)",
    "Dart",
    "Elixir",
    "Erlang",
    "FORTRAN",
    "F#",
    "Forth",
    "Groovy",
    "Gosu",
    "GPC",
    "Haskell",
    "Icon",
    "INTERCAL",
    "Java",
    "Java",
    "JavaScript",
    "JavaScript (Rhino)",
    "Julia",
    "Kotlin",
    "Lua",
    "LabVIEW",
    "Lisp",
    "Lisp",
    "Logo",
    "Matlab",
    "Nemerle",
    "Nice",
    "Node.js",
    "Nim",
    "Objective-C",
    "Objective-C (Clang)",
    "Octave",
    "OCaml",
    "Pascal",
    "Pascal (FPC)",
    "Perl",
    "Perl",
    "PHP",
    "Pico Lisp",
    "Pike",
    "Prolog",
    "Prolog",
    "Python",
    "Python",
    "Python (PyPy)",
    "Python 3",
    "Python 3",
    "R",
    "R",
    "Racket",
    "Ruby",
    "Rust",
    "Scala",
    "Scheme",
    "Scheme",
    "Scheme (Chicken)",
    "Shell",
    "Smalltalk",
    "SQL",
    "SQLite",
    "Swift",
    "Tcl",
    "Unlambda",
    "VB",
    "VB.NET",
    "Visual Basic",
    "Whitespace",
  ];

  const extensions = [
    "",
    "adb",
    "asm",
    "asm",
    "awk",
    "awk",
    "sh",
    "bc",
    "bf",
    "c",
    "c",
    "c",
    "cpp",
    "cpp",
    "cpp",
    "asm",
    "cpp",
    "clj",
    "clp",
    "cob",
    "cob",
    "coffee",
    "lisp",
    "lisp",
    "cpp",
    "cpp",
    "d",
    "d",
    "m",
    "d",
    "dart",
    "ex",
    "erl",
    "f90",
    "fs",
    "fr",
    "groovy",
    "gs",
    "gpc",
    "hs",
    "icn",
    "i",
    "java",
    "java",
    "js",
    "js",
    "jl",
    "kt",
    "lua",
    "vi",
    "lisp",
    "lisp",
    "logo",
    "m",
    "n",
    "nice",
    "js",
    "nim",
    "m",
    "m",
    "m",
    "swift",
    "tcl",
    "uni",
    "vb",
    "vb",
    "bas",
    "ws",
  ];

  const languageSelection = programmingLanguages.map((language, index) => (
    <option key={index} value={extensions[index]}>
      {language}
    </option>
  ));

  return (
    <div>
      <Helmet>
        <title>Compiler</title>
      </Helmet>
      <div className={styles.headDiv}>
        <Logo />
      </div>
      <div className={styles.mainDiv}>
        <form onSubmit={submitHandler} action="" className={styles.form}>
          {/* <div className={styles["line-numbers"]}></div> */}
          <div className={styles.actions}>
            <select
              className={styles.langSelect}
              ref={selectRef}
              name="test"
              id="test"
            >
              {languageSelection}
            </select>

            <button className={styles.runButton}>
              <FontAwesomeIcon icon={faPlay} />
              <span>Run </span>
            </button>
          </div>
          <div className={styles.codeBlock}>
            <h4 className={styles.fileName}>main.c</h4>
            <textarea ref={codeRef} type="text" id="code" placeholder="" />
          </div>
        </form>
        <div className={styles.output}>
          <h4>stdout</h4>
          <div>
            <Accordion defaultActiveKey="0" flush alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Accordion Item #3</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
