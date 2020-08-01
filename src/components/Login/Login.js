import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";
import classes from "./style.module.scss";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { postingLogin } from "../actions";

const Login = () => {
  const [form] = useForm();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authErrorReducer.error);

  useEffect(() => {
    if (error) {
      const fieldErr = error.field;
      form.setFields([
        {
          name: fieldErr,
          errors: [error.msg],
        },
      ]);
    }
    return () => {};
  }, [error]);

  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(postingLogin({ email, password }));
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className={classes.Wrapper}>
      <div className={classes.Login}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
