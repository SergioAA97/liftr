import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import DiaryService from "../service/DiaryService.js";
import { Card, Divider, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CustomIcon from "./utils/CustomIcon";
import { BlockCard } from "./utils/Layout-Components";

export default function FoodDiary() {
  const authContext = useContext(AuthContext);
  const [entries, setEntries] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // DiaryService.postEntry(entry);
    if (!entries) DiaryService.getToday().then((x) => setEntries(x.entries));
    if (entries && Object.keys(stats).length === 0) {
      let stat = {
        energyGoal: 2400,
        protein: 0,
        proteinGoal: 180,
        carbs: 0,
        carbsGoal: 200,
        fat: 0,
        fatGoal: 75,
        energy: 0,
      };

      entries.map((x) => {
        stat = {
          ...stat,
          energy: stat.energy + x.item.energy,
          protein: (
            parseFloat(stat.protein) +
            parseFloat(x.item.ref.protein * (x.item.quantity / 100))
          ).toPrecision(4),
          fat: (
            parseFloat(stat.fat) +
            parseFloat(x.item.ref.fat * (x.item.quantity / 100))
          ).toPrecision(4),
          carbs: (
            parseFloat(stat.carbs) +
            parseFloat(x.item.ref.carbohydrate * (x.item.quantity / 100))
          ).toPrecision(4),
        };
        console.log(x, stat);
      });

      setStats(stat);
    }
  }, [entries]);

  let { energy, protein, fat, carbs, energyGoal } = stats;

  return (
    <>
      {energy && protein && fat && carbs && (
        <BlockCard title="Quick Stats">
          <CustomIcon
            text={(energyGoal - energy).toPrecision(4)}
            subText="kcal left"
            block
            foodIcon
          ></CustomIcon>
          <CustomIcon
            text={protein + " g"}
            subText="protein"
            block
            proteinIcon
          ></CustomIcon>
          <CustomIcon
            text={carbs + " g"}
            subText="carbs"
            block
            carbIcon
          ></CustomIcon>
          <CustomIcon
            text={fat + " g"}
            subText="fat"
            block
            fatIcon
          ></CustomIcon>
        </BlockCard>
      )}
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

  let entries,
    totalEnergy = 0;

  if (data) {
    entries = data.filter((x) => x.type.toLowerCase() === name.toLowerCase());
    entries.forEach((e) => {
      let energy = e.item.ref.energy * (e.item.quantity / 100);
      e.item.energy = energy;
      totalEnergy += energy;
    });
  } else {
    entries = [];
  }

  return (
    <>
      {
        <div style={containerStyle} className="inv-font">
          <Card
            bordered={false}
            style={cardStyle}
            title={name}
            className="gradient-primary"
            extra={totalEnergy + " kcal"}
          >
            {entries.map((x) => {
              let energy = x.item.ref.energy * (x.item.quantity / 100);
              energy = Number.isInteger(energy) ? energy : energy.toFixed(1);
              return (
                <Row key={key++}>
                  <Col span={10}>
                    <b>{x.item.ref.description}</b>
                    <p>
                      {x.item.quantity} {"(g)"}
                    </p>
                  </Col>
                  <Col span={8} offset={6} style={{ textAlign: "right" }}>
                    {energy} - {"kcal"}
                  </Col>
                </Row>
              );
            })}
            <Divider plain>Add</Divider>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Link to={"/diary/new/" + name.toLowerCase()}>
                <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
              </Link>
            </div>
          </Card>
        </div>
      }
    </>
  );
};
