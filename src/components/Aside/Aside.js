import React, { useEffect } from "react";
import classes from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchingTests, gettingTest } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

const Aside = () => {
  const dispatch = useDispatch();
  const tests = useSelector((state) => state.testReducer.tests);
  const currentTest = useSelector((state) => state.testReducer.currentTest);

  useEffect(() => {
    dispatch(fetchingTests());
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleClick = (id) => {
    dispatch(gettingTest(id));
  };
  return (
    <aside className={classes.Aside}>
      <nav>
        <ul>
          {tests &&
            tests.map((val, index) => (
              <li
                onClick={() => handleClick(val._id)}
                key={val._id}
                className={
                  currentTest && currentTest._id === val._id
                    ? classes.active
                    : ""
                }
              >
                Câu {index + 1}
                <FontAwesomeIcon
                  className={classes.rotate}
                  style={{
                    marginLeft: 10,
                  }}
                  color="rgb(0, 255, 0)"
                  size="sm"
                  icon={faCode}
                />
              </li>
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(Aside);
