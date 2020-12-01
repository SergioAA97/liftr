import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useTimer } from "./utils/Timer";

const { Title } = Typography;

export default () => {
  const location = useLocation();

  const workout = location.state;

  return (
    <>
      <Row justify="center" className="gradient-primary">
        <Col>
          <Title level={3} className="inv-font mt-2">
            Timer
          </Title>
        </Col>
      </Row>
      <Timer />
      <Row justify="center" className="gradient-primary">
        <Col>
          <Title level={3} className="inv-font mt-2">
            Exercises
          </Title>
        </Col>
      </Row>
      <Row>
        {workout &&
          workout.exercises.map((item) => (
            <Col className="bk-white rounded-corners p-1" span={22} offset={1}>
              <Title level={4}>{item.exercise}</Title>
              <Row justify="space-between">
                <Col>Description</Col>
                <Col>
                  <EditOutlined style={{ fontSize: "15pt" }} />
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </>
  );
};

const Timer = () => {
  const [time, startTimer, stopTimer, resetTimer] = useTimer();

  let dateTime = new Date(time);

  return (
    <>
      <Row justify="center" className="inv-font">
        <TimeSlot value={dateTime.getMinutes()} label="m" />
        <TimeSlot value={dateTime.getSeconds()} label="s" />
        <TimeSlot value={dateTime.getMilliseconds()} label="ms" />
      </Row>
      <Row>
        <button onClick={startTimer}> Start/Resume </button>
        <button onClick={stopTimer}> Stop </button>
        <button onClick={resetTimer}> Reset </button>
      </Row>
    </>
  );
};

const TimeSlot = ({ value, label, labelStyle, valueStyle }) => {
  const labelStyleStart = {
    fontSize: "18pt",
    fontWeight: "600",
  };
  const valueStyleStart = {
    fontSize: "24pt",
    fontWeight: "800",
  };
  return (
    <Col xs={6} md={4} lg={2}>
      <Space
        direction="horizontal"
        align="center"
        size={10}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <span style={{ ...valueStyleStart, ...labelStyle }}>{value}</span>
        <span style={{ ...labelStyleStart, ...valueStyle }}>{label}</span>
      </Space>
    </Col>
  );
};
