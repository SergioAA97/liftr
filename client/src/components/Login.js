import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import AuthService from "../service/AuthService";
import { Form, Input, Row, Col, Button, Checkbox, message as Msg } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "../components/utils/Logo";

const Login = (props) => {
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const error = () => {
    if (message) {
      if (message.msgError) {
        Msg.config({
          duration: 1,
          maxCount: 1,
        });
        Msg.error({
          content: "Wrong username or password",
          className: "",
          style: {
            marginTop: "20vh",
          },
        });
      }
    }
  };

  const onSubmit = (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      } else {
        setMessage(message);
      }
    });
  };

  return (
    <div style={{ paddingTop: "2rem", textAlign: "center" }}>
      <Row justify="center">
        <Col xs={20} sm={16} md={12} lg={8} xl={6} xxl={4}>
          <Logo />
          <LoginForm onFinish={onSubmit} error={error} />
        </Col>
      </Row>
    </div>
  );
};

const LoginForm = ({ onFinish, error }) => {
  return (
    <Form
      name="normal_login"
      className="login-form "
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
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={error}
        >
          Log in
        </Button>
        {"  "}Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
