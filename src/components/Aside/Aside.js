import React, { useEffect, useState } from "react";
import classes from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchingTests, gettingTest } from "../actions";
import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Aside = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.testReducer.tests);
  const currentTest = useSelector((state) => state.testReducer.currentTest);
  const user = useSelector((state) => state.authReducer.currentUser);
  const [level, setLevel] = useState(0);
  const [filterTests, setFilterTests] = useState([]);

  useEffect(() => {
    dispatch(fetchingTests());
    setFilterTests(tests.filter((val) => val.level === level));
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (id) => {
    dispatch(gettingTest(id));
  };

  const filterTest = (level) => {
    setLevel(level);
    setFilterTests(tests.filter((val) => val.level === level));
  };

  const renderCheck = (test) => {
    const isSub = test.submitted_users.findIndex(
      (val) => val.userId._id === user.id
    );
    if (isSub !== -1) {
      return <CheckOutlined style={{ marginLeft: 5 }} />;
    }
  };
  return (
    <aside className={classes.Aside}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 10,
        }}
        className="level"
      >
        <Button
          onClick={() => filterTest(0)}
          size="small"
          type={level === 0 ? "primary" : "dashed"}
        >
          Easy
        </Button>
        <Button
          onClick={() => filterTest(1)}
          size="small"
          type={level === 1 ? "primary" : "dashed"}
        >
          Medium
        </Button>
        <Button
          onClick={() => filterTest(2)}
          size="small"
          type={level === 2 ? "primary" : "dashed"}
        >
          Hard
        </Button>
      </div>
      <nav>
        <ul>
          {filterTests &&
            filterTests.map((val, index) => (
              <li
                onClick={() => handleClick(val._id)}
                key={val._id}
                className={
                  currentTest && currentTest._id === val._id
                    ? classes.active
                    : ""
                }
              >
                Challenge {index + 1}
                {renderCheck(val)}
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(Aside);
