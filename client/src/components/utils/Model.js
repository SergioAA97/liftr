import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Avatar, Row, Col } from "antd";

import Logo from "../../components/utils/Logo";
import NavButton from "../utils/NavButton";

import { Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function Model({ children }) {
  const authContext = useContext(AuthContext);
  console.log(authContext, authContext.user);

  return (
    <Layout style={{ height: "100%" }} className="transparent-bk">
      <Header className="header transparent-bk" style={{ padding: 0 }}>
        <Row>
          <Col xs={8} sm={5} md={6} lg={8} xl={10}></Col>
          <Col xs={8} sm={14} md={12} lg={8} xl={4}>
            <Logo
              fontSize="24pt"
              paddingTop="0"
              marginLeft="0"
              marginRight="0"
            />
          </Col>
          <Col xs={8} sm={5} md={6} lg={8} xl={10}>
            <div style={{ textAlign: "right", paddingRight: "1.5rem" }}>
              <span style={{ color: "white", marginRight: "1.5rem" }}>
                {authContext.user.username}
              </span>
              <Avatar size={32} icon={<UserOutlined />} />
            </div>
          </Col>
        </Row>
      </Header>
      <Layout className="transparent-bk">
        <Layout style={{ padding: "0 24px 24px" }} className="transparent-bk">
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
            <div style={{ height: "6rem" }}></div>
          </Content>
        </Layout>
      </Layout>

      <NavButton />
    </Layout>
  );
}
