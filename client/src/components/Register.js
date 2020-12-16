import React, { useState, useRef, useEffect } from "react";
import AuthService from "../service/AuthService";
import { Form, Input, Row, Col, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import Logo from "./utils/Logo";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  });

  const onSubmit = (values) => {
    const user = {
      username: values.username,
      password: values.password,
      role: "user",
    };
    AuthService.register(user).then((data) => {
      const { msg } = data;
      console.log(msg);
      setMessage(msg.body);
      resetForm();
      if (!msg.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  console.log(user);
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={20} sm={16} md={12} lg={8} xl={4}>
        <Link to="/login">
          <Logo paddingTop="2vh" />
        </Link>

        <ResigerForm onFinish={onSubmit} />
      </Col>
    </Row>
  );
};

const ResigerForm = ({ onFinish }) => {
  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          className="rounded-corners"
          name="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          name="password"
          className="rounded-corners"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          block
          type="primary"
          htmlType="submit"
          size="large"
          className="rounded-corners"
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
