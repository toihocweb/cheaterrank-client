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

const initialCode = `function solution(input){
  // your code here
}`;

const CodeEditor = ({ currentTest }) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const renderResult = (index) => {
    if (result) {
      return result.failed_cases.includes(index + 1)
        ? renderIcon(false)
        : renderIcon(true);
    }
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
    setLoading(true);
    setResult(null);
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
        console.log(eval("(" + res.data + ")"));
        setLoading(false);
      } catch (err) {
        setErr(res.data);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setResult(null);
      setCode(initialCode);
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
        <h3>Yêu Cầu</h3>
        <p>{currentTest.desc}</p>
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
            <button onClick={handleSubmit}>
              {loading ? "Đang kiểm  tra" : "Kiểm tra"}
            </button>
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
                  {renderResult(index)}
                </div>
                <div ref={addToRefs} style={{ display: "none" }}>
                  <div className={classes.caseDetail}>
                    <p>Input</p>
                    <span>{JSON.stringify(val)}</span>
                    <p style={{ marginTop: 20 }}>Output</p>
                    <span>{JSON.parse(currentTest.outputs)[index]}</span>

                    {result && (
                      <>
                        <p style={{ marginTop: 20 }}>Your Result</p>
                        <span
                          style={{
                            color: result.failed_cases.includes(index + 1)
                              ? "#e74c3c"
                              : "rgb(0, 255, 0)",
                          }}
                        >
                          {typeof result.code_result[index] !== "undefined"
                            ? result.code_result[index].toString()
                            : "undefined"}
                        </span>
                      </>
                    )}
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
