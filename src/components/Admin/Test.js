import React, { useEffect, useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Button,
  Select,
  Space,
  message,
} from "antd";
import { apiUrl } from "../../utils/api";
import Axios from "axios";
import { useForm } from "antd/lib/form/Form";
import { Link } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;
const columns = [
  {
    title: "Inputs",
    dataIndex: "inputs",
    key: "inputs",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Outputs",
    dataIndex: "outputs",
    key: "outputs",
  },
  {
    title: "Description",
    dataIndex: "desc",
    key: "desc",
  },
  {
    title: "Level",
    dataIndex: "level",
    key: "level",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <a>Update</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const Test = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [level, setLevel] = useState(0);
  const [lang, setLang] = useState("javascript");

  const onFinish = async (values) => {
    const { desc } = values;
    const inputs = [];
    const outputs = [];

    if (values?.testcases) {
      for (let caseObj of values.testcases) {
        inputs.push(caseObj.input);
        outputs.push(caseObj.output);
      }
    }
    const dataPost = {
      language: lang,
      level,
      inputs: `[${String(inputs)}]`,
      outputs: `[${String(outputs)}]`,
      desc,
    };
    const res = await Axios.post(`${apiUrl}/api/v1/cheaterrank/test`, dataPost);
    if (res) {
      message.success("Post Test Successfully!");
    }
  };

  const handleChangeLevel = (values) => {
    setLevel(values);
  };
  const handleChangeLang = (values) => {
    setLang(values);
  };

  const onFinishFailed = (errorInfo) => {};
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    let customData = [];

    const getTests = async () => {
      const res = await Axios.get(`${apiUrl}/api/v1/cheaterrank/tests`);
      for (let index = 0; index < res.data.length; index++) {
        let { inputs, outputs, desc, level, _id } = res.data[index];
        customData = [
          ...customData,
          { inputs, outputs, desc, level, key: _id },
        ];
      }
      setData(customData);
    };
    getTests();
    return () => {};
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button type="primary" onClick={showModal}>
          Add Test
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Add new test"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ marginTop: -50 }}
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{ background: "white" }}
          form={form}
        >
          <Form.Item label="Level" name="level">
            <Select defaultValue="0" value={level} onChange={handleChangeLevel}>
              <Option value="0">Easy</Option>
              <Option value="1">Hard</Option>
              <Option value="2">Expert</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Language" name="language">
            <Select
              defaultValue="javascript"
              value={lang}
              onChange={handleChangeLang}
            >
              <Option value="javascript" selected>
                Javascript
              </Option>
              <Option value="c">C++</Option>
            </Select>
          </Form.Item>
          <Form.List name="testcases">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space
                      key={field.key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="start"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, "input"]}
                        fieldKey={[field.fieldKey, "input"]}
                        rules={[
                          { required: true, message: "Missing test case" },
                        ]}
                      >
                        <Input placeholder="input" />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "output"]}
                        fieldKey={[field.fieldKey, "output"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing expected output",
                          },
                        ]}
                      >
                        <Input placeholder="output" />
                      </Form.Item>

                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <PlusOutlined /> Add Case
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Form.Item name="desc" rules={[{ required: true }]}>
            <TextArea placeholder="Test Description" allowClear rows="5" />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ width: "100%" }}
              size="large"
              type="primary"
              htmlType="submit"
              // disabled={loading ? "disabled" : ""}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Test;
