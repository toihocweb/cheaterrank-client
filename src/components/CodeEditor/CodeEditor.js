import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/snippets/javascript";

import "ace-builds/src-noconflict/ace";

import classes from "./style.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { gettingResult, gettingLoading, submittingCode } from "../actions";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  SendOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import TestCase from "./TestCase";
import { Button, Popconfirm, message, Modal, Card, Space } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Axios from "axios";
import { sleep } from "../../utils/sleep";
import store from "../../store";

const CodeEditor = ({
  currentTestFromStore,
  currentUserFromStore,
  history,
}) => {
  const [code, setCode] = useState("");
  const [currentTest, setCurrentTest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.resultReducer.isLoading);
  const results = useSelector((state) => state.resultReducer.results);
  const error = useSelector((state) => state.errorReducer.error);
  const [visible, setVisible] = useState(false);
  const [detailUser, setDetailUser] = useState("");
  const [hint, setHint] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setCurrentTest(currentTestFromStore);
    setCurrentUser(currentUserFromStore);
    if (currentTestFromStore !== null) {
      const submitted_users = currentTestFromStore.submitted_users.find(
        (val) => val?.userId?._id === currentUserFromStore.id
      );
      if (submitted_users) {
        setCode(setDesc(submitted_users.code, false));
      } else {
        setCode(setDesc(currentTestFromStore.desc, true));
      }
    }
    return () => {};
  }, [currentTestFromStore]);

  const setDesc = (text = "", isDesc) => {
    let str = text.replace(/^\s+|\s+$/g, "");
    const init = isDesc
      ? `function solution(input){\n/*\n${str}\n*/\n}`
      : `function solution(input){\n${str}\n}`;
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
      setCode(setDesc(currentTestFromStore.desc, true));
    }
  };

  const showModal = () => {
    // setVisible(true);
    if (
      currentUserFromStore.role === "admin" ||
      (results && results?.passed === results?.cases_len)
    ) {
      setVisible(true);
    } else {
      message.warn("Vui lòng pass hết test case để sử dụng chức năng này!");
    }
  };

  const handleOk = (e) => {
    setVisible(false);
    setHint("");
    setDetailUser("");
  };

  const handlePostCode = async () => {
    const regex = /solution\(input\)\{((.|\n)*)(.*?)\}/gm;
    const refactor_code = regex.exec(code);
    if (refactor_code !== null) {
      const dataPost = {
        userId: currentUser.id,
        testId: currentTest._id,
        code: refactor_code[1],
      };
      const userCode = {
        ...currentTest,
        code: refactor_code[1],
      };

      dispatch(gettingResult(userCode));

      await sleep(500);
      const storeState = store.getState();
      const newResult = storeState.resultReducer.results;
      if (newResult && !newResult?.failed_cases.length) {
        dispatch(submittingCode(dataPost));
        setTimeout(() => {
          message.success("Submitted Successfully");
        }, 500);
      } else {
        setTimeout(() => {
          message.warn("Vui lòng pass hết test case để sử dụng chức năng này!");
        }, 500);
      }
    } else {
      setCode(setDesc(currentTestFromStore.desc, true));
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
          color: "#1DA57A",
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
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
              <div className={classes.btnActions}>
                <Button
                  onClick={handleSubmit}
                  style={{
                    pointerEvents: loading ? "none" : "",
                    marginRight: 10,
                  }}
                  size="large"
                  type="primary"
                  icon={<CheckOutlined />}
                >
                  {loading ? "Testing" : "Test"}
                </Button>
                <Popconfirm
                  title="Are you sure submit this code?"
                  onConfirm={handlePostCode}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" size="large" icon={<SendOutlined />}>
                    Submit
                  </Button>
                </Popconfirm>

                <Button
                  type="danger"
                  style={{ marginLeft: "auto" }}
                  size="large"
                  onClick={showModal}
                  icon={<EyeOutlined />}
                >
                  References
                </Button>
              </div>
            </div>
            <TestCase currentTest={currentTest} />
          </div>
          {error && renderErr(error)}
        </>
      )}
      <Modal
        title="Reference Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleOk}
        style={{ marginTop: -50 }}
        width={700}
        className="reference-modal"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {currentTest &&
            currentTest?.submitted_users.map((user, idx) => (
              <Card key={user?.userId} size="small" title={user?.userId?.name}>
                <SyntaxHighlighter language="javascript" style={gruvboxDark}>
                  {user?.code}
                </SyntaxHighlighter>
              </Card>
            ))}
        </Space>
      </Modal>
    </div>
  );
};

export default withRouter(CodeEditor);
