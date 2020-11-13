import React from "react";
import { Row, Col } from "antd";

export const BlockCard = ({ title, inv = false, children }) => {
  let divStyle = {
    textAlign: "center",

    paddingTop: "1.3rem",
    paddingBottom: "1.3rem",
  };
  let divClass = "";
  if (inv) {
    divClass = divClass + "gradient-primary inv-font";
  }

  return (
    <div style={divStyle} className={divClass}>
      <h2>
        <b>{title}</b>
      </h2>
      <Row justify="center" style={{ marginTop: "1rem" }}>
        {children &&
          children.map((child) => <Col span={children.length}>{child}</Col>)}
      </Row>
    </div>
  );
};
