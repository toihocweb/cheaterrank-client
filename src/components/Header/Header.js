import React from "react";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.sub}>
          <h2>
            <Link to="/">Logo</Link>
          </h2>
          <nav>
            <ul>
              <li>
                <Link className={classes.BtnLogin} to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
