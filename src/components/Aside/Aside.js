import React from "react";
import classes from "./style.module.scss";

const Aside = () => {
  return (
    <aside className={classes.Aside}>
      <nav>
        <ul>
          <li className={classes.active}>
            <a href="">Test 1</a>
          </li>
          <li>
            <a href="">Test 2</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
