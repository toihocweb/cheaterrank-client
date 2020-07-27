import React, { useState, useRef, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/ace";

import classes from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { gettingResult, gettingLoading } from "../actions";

const initialCode = `function solution(input){
  // your code here
}`;

const CodeEditor = () => {
  const [code, setCode] = useState(initialCode);
  const [currentTest, setCurrentTest] = useState(null);
  const dispatch = useDispatch();
  const currentTesta = useSelector((state) => state.testReducer.currentTest);
  const loading = useSelector((state) => state.resultReducer.isLoading);
  const result = useSelector((state) => state.resultReducer.results);
  const error = useSelector((state) => state.errorReducer.error);
  const refs = useRef([]);
  refs.current = [];

  useEffect(() => {
    setCurrentTest(currentTesta);
    setCode(initialCode);
    return () => {};
  }, [currentTesta]);

  const addToRefs = (el) => {
    if (el && !refs.current.includes(el)) {
      el.style.display = "none";
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
      if (loading) {
        return (
          <FontAwesomeIcon
            className={classes.rotate}
            style={{
              marginLeft: 10,
            }}
            color="white"
            size="lg"
            icon={faSpinner}
          />
        );
      } else {
        return result.failed_cases.includes(index + 1)
          ? renderIcon(false)
          : renderIcon(true);
      }
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
    dispatch(gettingLoading(true));
    const regex = /\{((.|\n)*)(.*?)\}/gm;
    const refactor_code = regex.exec(code);
    if (refactor_code !== null) {
      const userCode = {
        ...currentTest,
        code: refactor_code[1],
      };
      dispatch(gettingResult(userCode));
    } else {
      dispatch(gettingLoading(false));
      setCode(initialCode);
    }
  };

  return (
    <div
      style={{
        marginLeft: 220,
        paddingRight: 40,
        paddingTop: 40,
        paddingBottom: 100,
      }}
    >
      {currentTest && (
        <>
          <div
            className={classes.question}
            style={{ background: "#333", color: "white" }}
          >
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
                <button
                  onClick={handleSubmit}
                  style={{ pointerEvents: loading ? "none" : "" }}
                >
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
                        <span>
                          {JSON.stringify(
                            JSON.parse(currentTest.outputs)[index]
                          )}
                        </span>

                        {result && (
                          <>
                            <p style={{ marginTop: 20 }}>Your Result</p>
                            <span
                              style={{
                                color: result.failed_cases.includes(index + 1)
                                  ? "#e74c3c"
                                  : "#e67e22",
                              }}
                            >
                              {typeof result.code_result[index] !== "undefined"
                                ? JSON.stringify(result.code_result[index])
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
          {error && renderErr(error)}
        </>
      )}
    </div>
  );
};

export default CodeEditor;
