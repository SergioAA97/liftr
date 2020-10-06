import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function Home() {
  const authContext = useContext(AuthContext);
  console.log(authContext, authContext.user);
  return (
    <Row>
      <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
      <Col xs={20} sm={16} md={12} lg={8} xl={4}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <Avatar size={48} icon={<UserOutlined />} />
          <div style={{ marginLeft: "1rem" }}>
            Welcome back, {authContext.user.username}
          </div>
        </div>
      </Col>
      <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
    </Row>
  );
}
