import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import { AuthContext } from "../context/AuthContext";
import { Row, Col } from "antd";
import { EditOutlined } from "@ant-design/icons";
import CustomIcon from "./utils/CustomIcon";
import { DiarySection as Section } from "./utils/Diary-components";
import { BlockCard } from "./utils/Layout-Components";

export default function FoodDiary() {
  const authContext = useContext(AuthContext);
  const diaryContext = useContext(DiaryContext);

  const { foodEntries, foodStats } = diaryContext;

  let history = useHistory();

  const editEntry = ({ _id }) => {
    history.push("/diary/edit/", { id: _id });
  };

  let {
    energy = 0,
    protein = 0,
    fat = 0,
    carbs = 0,
    energyGoal = 0,
  } = foodStats;

  return (
    <>
      <BlockCard title="Quick Stats">
        <CustomIcon
          text={+(energyGoal - energy).toFixed(2) + " kcal"}
          subText="left"
          block
          goalIcon
        ></CustomIcon>
        <CustomIcon
          text={energy.toFixed(2) + " kcal"}
          subText="consumed"
          block
          foodIcon
        ></CustomIcon>
        <CustomIcon
          text={+protein.toFixed(2) + " g"}
          subText="protein"
          block
          proteinIcon
        ></CustomIcon>
        <CustomIcon
          text={+carbs.toFixed(2) + " g"}
          subText="carbs"
          block
          carbIcon
        ></CustomIcon>
        <CustomIcon
          text={+fat.toFixed(2) + " g"}
          subText="fat"
          block
          fatIcon
        ></CustomIcon>
      </BlockCard>

      <Row justify="space-around">
        <SectionCol>
          <DiarySection
            name="Breakfast"
            data={foodEntries}
            editEntry={editEntry}
          />
        </SectionCol>
        <SectionCol>
          <DiarySection name="Lunch" data={foodEntries} editEntry={editEntry} />
        </SectionCol>
        <SectionCol>
          <DiarySection
            name="Dinner"
            data={foodEntries}
            editEntry={editEntry}
          />
        </SectionCol>
        <SectionCol>
          <DiarySection name="Snack" data={foodEntries} editEntry={editEntry} />
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

const DiarySection = ({ name = "Breakfast", data, editEntry }) => {
  let key = 1;
  let entries,
    totalEnergy = 0;

  if (data) {
    console.log(data);
    if (data.length !== 0) {
      entries = data.filter((x) => x.type.toLowerCase() === name.toLowerCase());
    }
  } else {
    entries = null;
  }

  return (
    <Section extra={+totalEnergy.toFixed(2) + " kcal"} path="diary" name={name}>
      {entries &&
        entries.map((x) => {
          let energy = x.item.ref.energy * (x.item.quantity / 100);
          energy = Number.isInteger(energy) ? energy : energy.toFixed(1);
          return (
            <Row key={key++} align="middle">
              <Col span={10}>
                <b>{x.item.ref.description}</b>
                <p>
                  {x.item.quantity} {"(g)"}
                </p>
              </Col>
              <Col span={6} offset={6} style={{ textAlign: "right" }}>
                {energy} - {"kcal"}
              </Col>
              <Col span={2} offset={0} style={{ textAlign: "center" }}>
                <EditOutlined
                  style={{ fontSize: "1rem", marginLeft: "0.2rem" }}
                  onClick={() => editEntry(x)}
                />
              </Col>
            </Row>
          );
        })}
    </Section>
  );
};
