import React, { useState } from "react";
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
  const onChange = (newValue) => {
    setCode(newValue);
  };
  const handleSubmit = async () => {
    const regex = /\{((.|\n)*)(.*?)\}/gm;
    console.log(JSON.parse(currentTest.inputs));
    const refactor_code = regex.exec(code);
    if (refactor_code !== null) {
      const userCode = {
        ...currentTest,
        code: refactor_code[1],
      };
      console.log(userCode.inputs);
      const res = await axios.post("http://localhost:5000/test", userCode);
      setResult(eval("(" + res.data + ")"));
    }
  };
  return (
    <div style={{ marginLeft: 220, paddingRight: 40, marginTop: 40 }}>
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
              <li>
                <div className={classes.caseTitle}>
                  Test Case {index + 1}
                  <FontAwesomeIcon
                    style={{ marginLeft: 10 }}
                    color="#e74c3c"
                    size="lg"
                    icon={faTimes}
                  />
                </div>
                <div style={{ display: "none" }}>
                  <div className="case-detail">
                    <p>Inputs</p>
                    <p>{JSON.stringify(val)}</p>
                  </div>
                </div>
                {/* {JSON.stringify(val)}{" "}
                <FontAwesomeIcon
                  color="rgb(0, 255, 0)"
                  size="lg"
                  icon={faCheck}
                /> */}
                {/* <FontAwesomeIcon color="#e74c3c" size="lg" icon={faTimes} /> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
