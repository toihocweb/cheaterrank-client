import React, { useState, useEffect } from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

const Lang = () => {
  const [loading, setLoading] = useState(false);
  const currentTestFromStore = useSelector(
    (state) => state.testReducer.currentTest
  );
  const currentUserFromStore = useSelector(
    (state) => state.authReducer.currentUser
  );

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

  const renderLoading = () => (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HashLoader size={80} color={"#1DA57A"} loading={loading} />
    </div>
  );

  return !loading ? (
    <>
      <Aside />
      <CodeEditor
        currentUserFromStore={currentUserFromStore}
        currentTestFromStore={currentTestFromStore}
      />
    </>
  ) : (
    renderLoading()
  );
};

export default Lang;
