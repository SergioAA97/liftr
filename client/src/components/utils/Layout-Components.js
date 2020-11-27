import React from "react";
import { Row, Col, Switch, Typography, Slider } from "antd";

const { Title } = Typography;

export const BlockCard = ({ title, inv = false, children }) => {
  let divStyle = {
    textAlign: "center",

    paddingTop: "1.3rem",
    paddingBottom: "1.3rem",
  };

  let colStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  };

  let divClass = "";
  if (inv) {
    divClass = divClass + "gradient-primary inv-font";
  }

  let span = Math.ceil(24 / children.length);
  let xsSpan = span + 4;
  let smSpan = span;
  let mdSpan = span;
  let lgSpan = span - 2;

  let key = 0;

  return (
    <div style={divStyle} className={divClass}>
      <h2>
        <b>{title}</b>
      </h2>
      <Row justify="center" style={{ marginTop: "1rem" }}>
        {children &&
          children.map((child) => (
            <Col
              key={key++}
              xs={xsSpan}
              sm={smSpan}
              md={mdSpan}
              lg={lgSpan}
              style={colStyle}
            >
              {child}
            </Col>
          ))}
      </Row>
    </div>
  );
};
