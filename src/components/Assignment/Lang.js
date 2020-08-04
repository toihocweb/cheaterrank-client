import React, { useState, useEffect } from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import openSocket from "socket.io-client";
import { Button } from "antd";

const Lang = () => {
  const [loading, setLoading] = useState(false);
  const currentTestFromStore = useSelector(
    (state) => state.testReducer.currentTest
  );

  const currentUser = useSelector((state) => state.authReducer.currentUser);

  useEffect(() => {
    if (currentTestFromStore) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } else {
      setLoading(true);
    }
    return () => {};
  }, [currentTestFromStore]);

  // useEffect(() => {
  //   const socket = openSocket("http://localhost:8000");

  //   socket.emit("user", currentUser.name);
  //   socket.on("get online users", (data) => console.log(JSON.parse(data)));
  //   return () => {};
  // }, []);

  const renderLoading = () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HashLoader size={80} color={"lime"} loading={loading} />
    </div>
  );

  return !loading ? (
    <>
      <Aside />
      <CodeEditor currentTestFromStore={currentTestFromStore} />
    </>
  ) : (
    renderLoading()
  );
};

export default Lang;
