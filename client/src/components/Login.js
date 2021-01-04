import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import { Form, Input, Row, Col, Button, Layout } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../components/utils/Logo";

const { Content } = Layout;

const Login = (props) => {
  const [status, setStatus] = useState(null);
  const authContext = useContext(AuthContext);
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
    };
    setStatus("validating");
    setTimeout(() => {
      AuthService.login(user).then((data) => {
        const { isAuthenticated, user } = data;
        if (isAuthenticated) {
          setStatus("success");
          timerID = setTimeout(() => {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            props.history.push("/");
          }, 750);
        } else {
          setStatus("error");
        }
      });
    }, 500);
  };

  return (
    <Layout>
      <Content>
        <div style={{ paddingTop: "2rem", textAlign: "center" }}>
          <Row justify="center">
            <Col xs={20} sm={16} md={12} lg={8} xl={6} xxl={4}>
              <Logo />
              <LoginForm onFinish={onSubmit} status={status} />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

const LoginForm = ({ onFinish, status = null }) => {
  return (
    <Form name="normal_login" onFinish={onFinish}>
      <Form.Item
        name="username"
        help={status === "error" ? "Please input the correct username" : null}
        hasFeedback={status}
        rules={[
          { required: true, message: "Please input your username!" },
          {
            type: "string",
            pattern: "^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$",
            message: "Please input a valid username!",
          },
        ]}
        validateStatus={status}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon bk-primary " />}
          placeholder="Username"
          type="text"
          name="username"
          className="rounded-corners"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
        className="gradient-primary rounded-corners"
        help={status === "error" ? "Please input the correct password" : null}
        hasFeedback={status}
        validateStatus={status}
      >
        <Input.Password
          prefix={
            <LockOutlined className="site-form-item-icon bk-primary rounded-corners" />
          }
          type="password"
          name="password"
          placeholder="Password"
          className="rounded-corners"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        {"   "}Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
