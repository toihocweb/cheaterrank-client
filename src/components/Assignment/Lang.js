import React, { useState, useEffect } from "react";
import Aside from "../Aside/Aside";
import CodeEditor from "../CodeEditor/CodeEditor";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import openSocket from "socket.io-client";
import { Button, Popover, message } from "antd";
import sound from "./alo.mp3";
const Lang = () => {
  const [loading, setLoading] = useState(false);
  const currentTestFromStore = useSelector(
    (state) => state.testReducer.currentTest
  );
  const [online, setOnline] = useState([]);
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

  useEffect(() => {
    // const socket = openSocket("https://toihocweb.net/socket.io/");
    let socket;
    if (process.env.REACT_APP_ENV !== "prod") {
      socket = openSocket("http://localhost:8000", { secure: true });
    } else {
      socket = openSocket("http://202.182.100.160:8000", {
        secure: true,
      });
    }
    socket.emit("user", {
      id: currentUserFromStore.id,
      name: currentUserFromStore.name,
    });
    socket.on("test", (data) => {
      if (data.action === "submit") {
        if (data.userId !== currentUserFromStore.id) {
          message.success(data.msg);
          const player = new Audio(sound);
          player.pause();
          player.currentTime = 0;
          var playPromise = player.play();
          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                console.log("audio played auto");
              })
              .catch((error) => {
                console.log("playback prevented");
              });
          }
        }
      }
    });
    socket.on("get online users", (data) => setOnline(data));
    return () => {};
  }, []);

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

  const content = (
    <div>
      {online.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );

  return !loading ? (
    <>
      <Aside />
      <CodeEditor
        currentUserFromStore={currentUserFromStore}
        currentTestFromStore={currentTestFromStore}
      />
      <div style={{ position: "fixed", bottom: 0, right: 0 }}>
        <Popover content={content} trigger="hover">
          <Button type="primary">{`${online.length} users online`}</Button>
        </Popover>
      </div>
    </>
  ) : (
    renderLoading()
  );
};

export default Lang;
