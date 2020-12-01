import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthService from "../../service/AuthService";
import { Avatar, Row, Col, Button } from "antd";

import Logo from "../../components/utils/Logo";
import NavButton from "../utils/NavButton";

import { Layout, Dropdown, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export default function Model({ children, gradient = false, ...props }) {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  let classNames = "bk-white";

  if (gradient) {
    classNames = "gradient-primary";
  }

  return (
    <Layout style={{ height: "100vh" }} className={classNames}>
      <Header
        className="header gradient-primary rounded-corners-bottom"
        style={{ padding: 0 }}
      >
        <Row>
          <Col xs={8} sm={5} md={6} lg={8} xl={2}>
            <Dropdown
              overlay={
                <HeaderMenu
                  setUser={setUser}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
              trigger={["click"]}
            >
              <div style={{ textAlign: "left", paddingLeft: "1.5rem" }}>
                <Avatar size={32} icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </Col>
          <Col xs={8} sm={14} md={12} lg={8} xl={20}>
            <Logo
              fontSize="24pt"
              paddingTop="0"
              marginLeft="0"
              marginRight="0"
              white
            />
          </Col>
          <Col xs={8} sm={5} md={6} lg={8} xl={2}></Col>
        </Row>
      </Header>
      <Layout>
        <Layout className={classNames}>
          <Content
            style={{
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

const HeaderMenu = ({ setUser, setIsAuthenticated }) => {
  function logout() {
    AuthService.logout().then((data) => {
      if (data.success) {
        setIsAuthenticated(false);
        setUser(data.user);
      }
    });
  }

  return (
    <Menu>
      <Menu.Item key="0">
        {" "}
        <Button block type="primary" onClick={logout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
};
