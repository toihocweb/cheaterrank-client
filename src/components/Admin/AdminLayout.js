import React, { useState } from "react";
import { Menu, Button, Table, Tag, Space } from "antd";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from "@ant-design/icons";
import Admin from "./Admin";
import { Route, Link, Switch, NavLink } from "react-router-dom";
import Test from "./Test";
import User from "./User";

const AdminLayout = () => {
  return (
    <div>
      <div
        style={{
          width: 200,
          height: "100vh",
          background: "white",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="light"
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <NavLink to="/admin/user">Users</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <NavLink to="/admin/test">Tests</NavLink>
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ marginLeft: 210, paddingTop: 20, paddingRight: 30 }}>
        <Switch>
          <Route component={User} path="/admin/user" exact />
          <Route component={Test} path="/admin/test" exact />
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
