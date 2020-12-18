import { Button, Col, Input, Row, Form, Switch } from "antd";

import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import UtilService from "../service/UtilService";

export default function UserSettings() {
  const diaryContext = useContext(DiaryContext);
  const { biometrics, setBiometrics } = diaryContext;
  const [isMale, setIsMale] = useState();

  const history = useHistory();

  const onChange = (val) => {
    setIsMale(!val);
    console.log("change");
  };

  const onSubmit = (values) => {
    try {
      let finalValues = { ...values, gender: isMale ? "Male" : "Female" };

      UtilService.updateUserSettings(finalValues).then((x) => {
        setBiometrics(finalValues);
      });

      history.push("/");
    } catch (err) {}
  };

  const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log(values, errorFields, outOfDate);
  };

  useEffect(() => {
    setIsMale(biometrics.gender === "Male");
  }, [biometrics.gender]);

  return (
    <Row justify="center" align="middle">
      <Col xs={20} md={10} lg={6}>
        <Form
          name="settings"
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          className="inv"
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          initialValues={{
            ["weight"]: biometrics.weight,
            ["height"]: biometrics.height,
            ["age"]: biometrics.age,
            ["gender"]: biometrics.gender === "Male",
          }}
        >
          <Form.Item label="Gender" name="gender">
            <Switch
              className="inv"
              defaultChecked={isMale}
              onChange={onChange}
            />
            <span style={{ padding: "0rem 0.5rem", color: "white" }}>
              {isMale ? "Male" : "Female"}
            </span>
          </Form.Item>
          <Form.Item
            label="Weight"
            name="weight"
            rules={[{ required: true, message: "This value cannot be empty" }]}
          >
            <Input className="inv" />
          </Form.Item>

          <Form.Item
            label="Height"
            name="height"
            rules={[{ required: true, message: "This value cannot be empty" }]}
          >
            <Input className="inv" />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[{ required: true, message: "This value cannot be empty" }]}
          >
            <Input className="inv" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
}
