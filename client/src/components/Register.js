import React, { useState, useRef, useEffect } from "react";
import AuthService from "../service/AuthService";
import { Form, Input, Row, Col, Button, Switch, InputNumber } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Logo from "./utils/Logo";
import { Link } from "react-router-dom";


const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [status, setStatus] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  });

  const onSubmit = (values) => {
    console.log(values);
    const user = {
      username: values.username,
      password: values.password,
      biometrics: {
        weight: values.weight,
        height: values.height,
        gender: values.gender ? "Male" : "Female",
        age: values.age,
      },
      role: "user",
    };
    setStatus("validating");

    AuthService.register(user).then((data) => {
      const { msg } = data;
      console.log(msg);
      if (!msg.msgError) {
        setStatus("success");
        timerID = setTimeout(() => {
          resetForm();
          props.history.push("/login");
        }, 1000);
      } else {
        setStatus("error");
      }
    });
  };

  const resetForm = () => {
    setUser({ username: "", password: "", role: "" });
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col xs={20} sm={18} md={18} lg={8} xl={6}>
        <Link to="/login">
          <Logo paddingTop="0vh" />
        </Link>

        <RegisterForm onFinish={onSubmit} status={status} />
      </Col>
    </Row>
  );
};

const RegisterForm = ({ onFinish, status }) => {
  const [isMale, setIsMale] = useState(false);

  const onChange = (val) => {
    console.log("change", val);
    setIsMale(!val);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{
        ["gender"]: true,
      }}
      onFinish={(values) => {
        onFinish({ ...values, gender: isMale });
      }}
    >
      <Form.Item
        name="username"
        help={status === "error" ? "Please input the correct username" : ""}
        className="gradient-primary rounded-corners"
        rules={[
          { required: true, message: "Please input your username!" },
          {
            type: "string",
            pattern: "^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$",
            message: "Please input a valid username!",
          },
        ]}
        validateStatus={status}
        hasFeedback={status}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          name="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        className="gradient-primary rounded-corners"
        rules={[
          { required: true, message: "Please input your password!" },
          {
            type: "string",
            pattern: "^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$",
            message: "Please input a valid password! (more than 8 characters)",
          },
        ]}
        hasFeedback={status}
        validateStatus={status}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          name="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item name="gender" validateStatus={status}>
        <Switch onChange={onChange} defaultChecked={true} />
        <span style={{ padding: "0rem 0.5rem" }}>
          {isMale ? "Male" : "Female"}
        </span>
      </Form.Item>
      <Form.Item
        name="weight"
        className="gradient-primary rounded-corners"
        rules={[
          { required: true, message: "This value cannot be empty" },
          { type: "integer", message: "Weight can´t have decimals" },
        ]}
        validateStatus={status}
        hasFeedback={status}
      >
        <InputNumber
          style={{ width: "100%" }}
          size="large"
          min={30}
          max={350}
          placeholder="Weight"
        />
      </Form.Item>

      <Form.Item
        name="height"
        className="gradient-primary rounded-corners"
        rules={[
          { required: true, message: "This value cannot be empty" },
          { type: "integer", message: "Height can´t have decimals" },
        ]}
        hasFeedback={status}
        validateStatus={status}
      >
        <InputNumber
          style={{ width: "100%" }}
          size="large"
          min={60}
          max={300}
          placeholder="Height"
        />
      </Form.Item>
      <Form.Item
        name="age"
        className="gradient-primary rounded-corners"
        rules={[
          { required: true, message: "This value cannot be empty" },
          {
            type: "integer",
            min: 13,
            max: 150,
            message: "Age must be at least 13",
          },
        ]}
        validateStatus={status}
        hasFeedback={status}
      >
        <InputNumber
          style={{ width: "100%" }}
          size="large"
          min={13}
          max={150}
          placeholder="Age"
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
