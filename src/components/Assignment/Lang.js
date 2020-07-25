import React, { useEffect, useState } from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";

const Lang = ({ match }) => {
  const [currentTest, setCurrentTest] = useState({
    id: 1,
    lang: "javascript",
    desc: "Tính tổng số lượng các sản phẩm",
    inputs:
      '[[{"name": "Dress" , "quantity": 10} , {"name": "Hat" , "quantity": 20}], [{"name": "Shirt"} , {"name": "Coat" , "quantity": 20}]]',
    outputs: "[30 , 20]",
  });

  return (
    <>
      <Aside />
      <CodeEditor currentTest={currentTest} />
    </>
  );
};

export default Lang;
