import React from "react";
import classes from "./style.module.scss";
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Button } from "antd";
import { logoutUser } from "../actions";
const { SubMenu } = Menu;

const Header = ({ history }) => {
  const currentUser = useSelector((state) => state.authReducer.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(history));
  };
  return (
    <header className={classes.header}>
      <div className="container">
        <div className={classes.sub}>
          <h2>
            <Link to="/">Logo</Link>
          </h2>
          <Button
            onClick={() =>
              window.open(
                "https://www.youtube.com/playlist?list=PLCQCYoV4-dL0BpuzG9ibjqC6Y3Z6mGSvT",
                "_blank"
              )
            }
            type="dashed"
            ghost
          >
            Learn Js
          </Button>
          <nav style={{ display: "flex", alignItems: "center" }}>
            {currentUser ? (
              <Menu mode="vertical-right">
                <SubMenu
                  title={
                    <img
                      width="36"
                      height="36"
                      style={{ borderRadius: "50%" }}
                      src={currentUser.avatar}
                      alt="avatar"
                    />
                  }
                >
                  <Menu.Item>{`Welcome, ${currentUser.name}`}</Menu.Item>
                  <Menu.Item>Setting</Menu.Item>
                  <Menu.Item onClick={handleLogout}>Logout</Menu.Item>
                </SubMenu>
              </Menu>
            ) : (
              <ul style={{ display: "flex", alignItems: "center", margin: 0 }}>
                <li>
                  <Link className={classes.BtnRegister} to="/register">
                    Register
                  </Link>
                </li>
                <li>
                  <Link className={classes.BtnLogin} to="/login">
                    Login
                  </Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Header);
