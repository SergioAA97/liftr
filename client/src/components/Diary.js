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
      <Row justify="space-around">
        <SectionCol>
          <DiarySection name="Breakfast" data={entries} />
        </SectionCol>
        <SectionCol>
          <DiarySection name="Lunch" data={entries} />
        </SectionCol>
        <SectionCol>
          <DiarySection name="Dinner" data={entries} />
        </SectionCol>
        <SectionCol>
          <DiarySection name="Snacks" data={entries} />
        </SectionCol>
      </Row>
      <>
        <Divider plain>Add</Divider>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Link to="/diary/new/breakfast">
            <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
          </Link>
        </div>
      </>
    </>
  );
}

const SectionCol = ({ children }) => (
  <Col xs={{ span: 24 }} md={{ span: 20 }} lg={{ span: 9 }} xl={{ span: 5 }}>
    {children}
  </Col>
);

const DiarySection = ({ name = "Breakfast", data }) => {
  let key = 1;
  const containerStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  };

  const cardStyle = {
    borderRadius: "7px",
  };
  const entries = data.filter((x) => x.type === name);
  return (
    <>
      {
        <div style={containerStyle} className="inv-font">
          <Card
            bordered={false}
            style={cardStyle}
            title={name}
            className="gradient-primary"
          >
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
        </div>
      }
    </>
  );
};
