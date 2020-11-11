import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import DiaryService from "../service/DiaryService.js";
import { Card, Divider, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;

export default function Diary() {
  const authContext = useContext(AuthContext);

  const text = "Some text";

  const entries = [
    {
      type: "Breakfast",
      item: {
        ref: "Banana",
        quantity: 120,
        unit: "gr",
      },
    },
    {
      type: "Breakfast",
      item: {
        ref: "Milk",
        quantity: 8,
        unit: "fl. oz.",
      },
    },
    {
      type: "Breakfast",
      item: {
        ref: "Granola",
        quantity: 200,
        unit: "gr",
      },
    },
    {
      type: "Lunch",
      item: {
        ref: "Ground Beef",
        quantity: 120,
        unit: "gr",
      },
    },
    {
      type: "Lunch",
      item: {
        ref: "White Potatoes",
        quantity: 200,
        unit: "gr",
      },
    },
    {
      type: "Lunch",
      item: {
        ref: "Wine (White)",
        quantity: 200,
        unit: "ml",
      },
    },
    {
      type: "Dinner",
      item: {
        ref: "Tuna",
        quantity: 120,
        unit: "gr",
      },
    },
    {
      type: "Dinner",
      item: {
        ref: "Lettuce",
        quantity: 150,
        unit: "gr",
      },
    },
  ];

  DiaryService.getToday().then((x) => console.log(x));

  return (
    <>
      <>
        <DiarySection name="Breakfast" data={entries} />
      </>
      <>
        <DiarySection name="Lunch" data={entries} />
      </>
      <>
        <DiarySection name="Dinner" data={entries} />
      </>
      <>
        <DiarySection name="Snacks" data={entries} />
      </>
      <>
        <Divider plain>Add</Divider>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Link to="/diary/new">
            <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
          </Link>
        </div>
      </>
    </>
  );
}

const DiarySection = ({ name = "Breakfast", data }) => {
  let key = 1;
  const containerStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  };
  const entries = data.filter((x) => x.type === name);
  return (
    <div style={containerStyle}>
      <Title level={2}>{name}</Title>
      {entries.length > 0 && (
        <Card bordered={false}>
          {entries.map((x) => (
            <Row key={key++}>
              <Col span={8}>
                <b>{x.item.ref}</b>
              </Col>
              <Col span={8} offset={8} style={{ textAlign: "right" }}>
                {x.item.quantity} - {x.item.unit}
              </Col>
            </Row>
          ))}
        </Card>
      )}
    </div>
  );
};
