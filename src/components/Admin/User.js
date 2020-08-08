import React, { useEffect, useState } from "react";
import { Table, Space } from "antd";
import { apiUrl } from "../../utils/api";
import Axios from "axios";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Delete</a>
      </Space>
    ),
  },
];

const User = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let customData = [];

    const getUsers = async () => {
      const res = await Axios.get(`${apiUrl}/api/v1/cheaterrank/auth/users`);
      for (let index = 0; index < res.data.length; index++) {
        let { email, name, role, _id } = res.data[index];
        customData = [...customData, { name, role, email, key: _id }];
      }
      setData(customData);
    };
    getUsers();
    return () => {};
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default User;
