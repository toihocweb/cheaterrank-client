import React from "react";
import classes from "./style.module.scss";

const Aside = () => {
  return (
    <aside className={classes.Aside}>
      <nav>
        <ul>
          <li className={classes.active}>
            <a href="">Câu 1</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
