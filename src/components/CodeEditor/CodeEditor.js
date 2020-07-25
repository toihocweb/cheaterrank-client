import React, { useState, useRef } from "react";
import AceEditor from "react-ace";
import axios from "axios";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/ace";

import classes from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const CodeEditor = ({ currentTest }) => {
  const [code, setCode] = useState(`function solution(input){
    // your code here
}`);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const refs = useRef([]);
  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  const onChange = (newValue) => {
    setCode(newValue);
  };

  const renderIcon = (passed) => {
    return passed ? (
      <FontAwesomeIcon
        style={{ marginLeft: 10 }}
        color="rgb(0, 255, 0)"
        size="lg"
        icon={faCheck}
      />
    ) : (
      <FontAwesomeIcon
        style={{ marginLeft: 10 }}
        color="#e74c3c"
        size="lg"
        icon={faTimes}
      />
    );
  };

  const handleActive = (idx) => {
    if (refs.current[idx].style.display !== "none") {
      refs.current[idx].style.display = "none";
    } else {
      refs.current[idx].style.display = "block";
    }
  };

  const renderErr = (msg) => <div className={classes.err}>{msg}</div>;

  const handleSubmit = async () => {
    setErr("");
    const regex = /\{((.|\n)*)(.*?)\}/gm;
    const refactor_code = regex.exec(code);
    if (refactor_code !== null) {
      const userCode = {
        ...currentTest,
        code: refactor_code[1],
      };
      const res = await axios.post("http://localhost:5000/test", userCode);
      try {
        setResult(eval("(" + res.data + ")"));
      } catch (err) {
        setErr(res.data);
      }
    }
  };
  return (
    <div
      style={{
        marginLeft: 220,
        paddingRight: 40,
        marginTop: 40,
        paddingBottom: 100,
      }}
    >
      <div className={classes.question}>
        <h3>Test 1</h3>
        <p>Find the biggest number</p>
      </div>
      <div style={{ display: "flex" }} className="wrapper">
        <div className="editor">
          <AceEditor
            name="editor"
            mode="javascript"
            theme="monokai"
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            width="650px"
          />
          <div className={classes.btnActions}>
            <button onClick={handleSubmit}>Run Test</button>
          </div>
        </div>
        <div style={{ marginLeft: 20 }} className={classes.cases}>
          <ul>
            {JSON.parse(currentTest.inputs).map((val, index) => (
              <li key={index}>
                <div
                  onClick={() => handleActive(index)}
                  className={classes.caseTitle}
                >
                  Test Case {index + 1}
                  {result && result.failed_cases.includes(index + 1)
                    ? renderIcon(false)
                    : renderIcon(true)}
                </div>
                <div ref={addToRefs}>
                  <div className={classes.caseDetail}>
                    <p>Inputs</p>
                    <span>{JSON.stringify(val)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {err && renderErr(err)}
    </div>
  );
};

export default CodeEditor;
