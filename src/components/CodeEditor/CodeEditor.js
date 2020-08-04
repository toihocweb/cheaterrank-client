import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/ace";

import classes from "./style.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { gettingResult, gettingLoading } from "../actions";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TestCase from "./TestCase";

const initialCode = `function solution(input){
  // your code here
}`;

const CodeEditor = ({ currentTestFromStore, history }) => {
  const [code, setCode] = useState("");
  const [currentTest, setCurrentTest] = useState(null);
  const dispatch = useDispatch();
  // const currentTesta = useSelector((state) => state.testReducer.currentTest);
  const loading = useSelector((state) => state.resultReducer.isLoading);
  const error = useSelector((state) => state.errorReducer.error);

  useEffect(() => {
    setCurrentTest(currentTestFromStore);
    if (currentTestFromStore !== null) {
      setCode(setDesc(currentTestFromStore.desc));
    }
    return () => {};
  }, [currentTestFromStore]);

  const setDesc = (text = "") => {
    const final_desc = text
      .split("\n")
      .map((val) => {
        return `${val}`;
      })
      .join("\n");
    const init = `function solution(input){
/*
${final_desc}
*/

}`;
    return init;
  };

  const onChange = (newValue) => {
    setCode(newValue);
  };

  const renderErr = (msg) => <div className={classes.err}>{msg}</div>;

  const handleSubmit = async () => {
    dispatch(gettingLoading(true));
    const regex = /solution\(input\)\{((.|\n)*)(.*?)\}/gm;
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
        paddingTop: 10,
        paddingBottom: 100,
      }}
    >
      <ArrowLeftOutlined
        style={{
          fontSize: 20,
          color: "lime",
          marginBottom: 10,
          cursor: "pointer",
        }}
        onClick={() => history.push("/")}
      />
      {currentTest && (
        <>
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
            <TestCase currentTest={currentTest} />
          </div>
          {error && renderErr(error)}
        </>
      )}
    </div>
  );
};

export default withRouter(CodeEditor);
