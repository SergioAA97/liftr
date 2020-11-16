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

  let span = Math.ceil(24/children.length);
  let xsSpan = span;
  let mdSpan = span - 1;
  let lgSpan = span - 5;

  let key = 0;

  return (
    <div style={divStyle} className={divClass}>
      <h2>
        <b>{title}</b>
      </h2>
      <Row justify="center" style={{ marginTop: "1rem" }}>
        {children &&
          children.map((child) => <Col key={key++} xs={xsSpan} md={mdSpan} lg={lgSpan} >{child}</Col>)}
      </Row>
    </div>
  );
};
