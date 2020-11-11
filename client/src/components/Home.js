import React, { useContext } from "react";
import FoodService from "../service/FoodService";
import { Row, Col } from "antd";
import CustomIcon from "./utils/CustomIcon";

export default function Home() {
  FoodService.openDB();

  return (
    <div>
      <TodaysStats />
    </div>
  );
}

const TodaysStats = (props) => (
  <div style={{ textAlign: "center" }}>
    <h2>
      <b>Today´s stats</b>
    </h2>
    <Row justify="center" style={{ marginTop: "1rem" }}>
      <Col span={3}>
        <CustomIcon text="1000" subText="kcal" foodIcon></CustomIcon>
      </Col>
      <Col span={3}>
        <CustomIcon text="66" subText="min" runningIcon></CustomIcon>
      </Col>
      <Col span={3}>
        <CustomIcon text="10.000" subText="steps" stepsIcon></CustomIcon>
      </Col>
    </Row>
    <Row justify="center" style={{ marginTop: "1rem" }}>
      <Col span={3}>
        <CustomIcon text="1000" subText="kcal" foodIcon></CustomIcon>
      </Col>
      <Col span={3}>
        <CustomIcon text="66" subText="min" runningIcon></CustomIcon>
      </Col>
      <Col span={3}>
        <CustomIcon text="10.000" subText="steps" stepsIcon></CustomIcon>
      </Col>
    </Row>
  </div>
);
