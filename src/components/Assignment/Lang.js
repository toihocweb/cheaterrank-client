import React, { useEffect, useState } from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";

const Lang = ({ match }) => {
  const [currentTest, setCurrentTest] = useState({
    id: 1,
    lang: "javascript",
    desc: "description",
    inputs: '[["hello", "aaaaaa"] , ["nhat" , ""]]',
    outputs: '["aaaaaa" , "nhat"]',
  });

  return (
    <>
      <Aside />
      <CodeEditor currentTest={currentTest} />
    </>
  );
};

export default Lang;
