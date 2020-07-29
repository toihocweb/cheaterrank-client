import React from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";
import { useSelector } from "react-redux";

const Lang = () => {
  const currentTestFromStore = useSelector(
    (state) => state.testReducer.currentTest
  );

  return (
    <>
      <Aside />
      <CodeEditor currentTestFromStore={currentTestFromStore} />
    </>
  );
};

export default Lang;
