import React, { useEffect, useState } from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";

const Lang = ({ match }) => {
  const [currentTest, setCurrentTest] = useState({
    id: 1,
    lang: "javascript",
    desc: "description",
    inputs: "[[1, 2, 3],[2, 56, 34, 54]]",
    outputs: "[3,56]",
  });

  return (
    <>
      <Aside />
      <CodeEditor currentTest={currentTest} />
    </>
  );
};

export default Lang;
