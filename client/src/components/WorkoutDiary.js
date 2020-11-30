import React, { useContext } from "react";
2import { useHistory, Link } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import { AuthContext } from "../context/AuthContext";
import { List, Space, Row, Col } from "antd";
import NewWorkoutForm from "./NewWorkoutForm"
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
        <Title level={3} className="text-center">Workouts</Title>
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
        <Title level={3} className="text-center">Previous sessions</Title>
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
        <Title level={3} className="text-center">New Workout</Title>
        <Row justify="space-around">
          <NewWorkoutForm />
        </Row>
      </div>

    </>
  );
}
