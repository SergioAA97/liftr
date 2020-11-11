import React from "react";
import { Row, Space } from "antd";
import iHome from "../../img/static/home-solid.svg";
import iWorkout from "../../img/static/dumbbell-solid.svg";
import iGoal from "../../img/static/bullseye-solid.svg";
import iFood from "../../img/static/hamburger-solid.svg";

import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

export default function NavButton(props) {
  const iconStyle = { color: "white", cursor: "pointer", fontSize: "18pt" };
  const textStyle = { color: "white", fontWeight: 800 };
  return (
    <Footer
      className="gradient-primary rounded-corners-top"
      style={{
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
          <Link to="/">
            <img src={iHome} style={iconStyle} />
            <div style={textStyle}>Home</div>
          </Link>
          <Link to="/goals">
            <img src={iGoal} style={iconStyle} />
            <div style={textStyle}>Goals</div>
          </Link>
          <Link to="/workout">
            <img src={iWorkout} style={iconStyle} />
            <div style={textStyle}>Workout</div>
          </Link>
          <Link to="/diary">
            <img src={iFood} style={iconStyle} />
            <div style={textStyle}>Food</div>
          </Link>
        </Space>
      </Row>
    </Footer>
  );
}
