import React from "react";
import { Row, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRunning,
  faHamburger,
  faRss,
  faHome,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";

import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

export default function NavButton(props) {
  const iconStyle = { color: "white", cursor: "pointer", fontSize: "18pt" };
  return (
    <Footer
      className=""
      style={{
        background: "#0e185c",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        textAlign: "center",
        color: "white",
      }}
    >
      <Row justify="center">
        <Space size={40}>
          <Link to="/workout">
            <FontAwesomeIcon icon={faRunning} style={iconStyle} />
          </Link>
          <Link to="/diary">
            <FontAwesomeIcon icon={faHamburger} style={iconStyle} />
          </Link>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} style={iconStyle} />
          </Link>
          <Link to="/goals">
            <FontAwesomeIcon icon={faSignal} style={iconStyle} />
          </Link>
          <Link to="/news">
            <FontAwesomeIcon icon={faRss} style={iconStyle} />
          </Link>
        </Space>
      </Row>
    </Footer>
  );
}
