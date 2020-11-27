import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import { AuthContext } from "../context/AuthContext";
import { List, Space, Row, Col } from "antd";
import { HeartFilled, PlayCircleOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { DiarySection as Section } from "./utils/Diary-components";
import { Typography } from "antd";
import CustomIcon from "./utils/CustomIcon";

const { Title } = Typography;

const CardioAvatar = () => (
  <Space align="center">
    <CustomIcon heartIcon />
  </Space>
);

const WeightAvatar = () => (
  <Space align="center">
    <CustomIcon workoutIcon />
  </Space>
);

const data = [
  {
    title: "Workout 1",
    avatar: React.createElement(CardioAvatar),
  },
  {
    title: "Workout 2",
    avatar: React.createElement(WeightAvatar),
  },
  {
    title: "Workout 3",
    avatar: React.createElement(CardioAvatar),
  },
  {
    title: "Workout 4",
    avatar: React.createElement(WeightAvatar),
  },
];

export default function WorkoutDiary() {
  const authContext = useContext(AuthContext);
  const diaryContext = useContext(DiaryContext);

  const containerStyle = {
    padding: "2rem",
  };

  const { exerEntries, exerStats } = diaryContext;

  let history = useHistory();

  const editEntry = ({ _id }) => {
    history.push("/workout/new/entry", { id: _id });
  };

  return (
    <>
      <div style={containerStyle}>
        <Title level={3}>Today´s workout</Title>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.avatar}
                title={<a href="https://ant.design">{item.title}</a>}
                description={
                  <Row justify="space-between">
                    <Col>Description</Col>
                    <Col>
                      <PlayCircleOutlined style={{ fontSize: "15pt" }} />
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
        <Title level={3}>Next workout(s)</Title>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.avatar}
                title={<a href="https://ant.design">{item.title}</a>}
                description={
                  <Row justify="space-between">
                    <Col>Description</Col>
                    <Col>
                      <PlayCircleOutlined style={{ fontSize: "15pt" }} />
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
        <Title level={3}>Previous Workouts</Title>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.avatar}
                title={<a href="https://ant.design">{item.title}</a>}
                description={
                  <Row justify="space-between">
                    <Col>Description</Col>
                    <Col>
                      <PlayCircleOutlined style={{ fontSize: "15pt" }} />
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Row justify="space-around">
        <SectionCol>
          <DiarySection name="Exercises" />
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

const DiarySection = ({ name = "Workout 1", data, editEntry }) => {
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
    <Section extra={+totalEnergy.toFixed(2) + " kcal"} name={name}>
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
