import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import { AuthContext } from "../context/AuthContext";
import { List, Space, Row, Col } from "antd";
import NewWorkoutForm from "./NewWorkoutForm";
import { FullscreenOutlined, PlayCircleOutlined } from "@ant-design/icons";
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

export default function WorkoutDiary() {
  const authContext = useContext(AuthContext);
  const diaryContext = useContext(DiaryContext);

  const containerStyle = {
    padding: "2rem",
  };

  const { availableWorkouts, previousSessions } = diaryContext;

  let history = useHistory();

  const editEntry = ({ _id }) => {
    history.push("/workout/new/entry", { id: _id });
  };

  const onClickPlay = (workout) => {
    history.push("/workout/session", { ...workout });
  };

  return (
    <>
      <div style={containerStyle}>
        <Title level={3} className="text-center">
          Workouts
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={availableWorkouts}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  item.type === "Cardio"
                    ? React.createElement(CardioAvatar)
                    : React.createElement(WeightAvatar)
                }
                title={<a href="">{item.name}</a>}
                description={
                  <Row justify="space-between">
                    <Col>{item.description}</Col>
                    <Col>
                      <PlayCircleOutlined
                        style={{ fontSize: "15pt" }}
                        onClick={() => onClickPlay(item)}
                      />
                    </Col>
                  </Row>
                }
              />
            </List.Item>
          )}
        />
        <Title level={3} className="text-center">
          Previous sessions
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={previousSessions}
          renderItem={(item) => {
            const ts = new Date(item.timeStart);
            const te = new Date(item.timeEnd);
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    item.workout.type === "Cardio"
                      ? React.createElement(CardioAvatar)
                      : React.createElement(WeightAvatar)
                  }
                  title={<a href="https://ant.design">{item.workout.name}</a>}
                  description={
                    <Row justify="space-between">
                      <Col>Description</Col>
                      <Col>
                        <i>
                          Start: {ts.toLocaleString()} / End:{" "}
                          {te.toLocaleString()}
                        </i>
                      </Col>
                      <Col>
                        <FullscreenOutlined style={{ fontSize: "15pt" }} />
                      </Col>
                    </Row>
                  }
                />
              </List.Item>
            );
          }}
        />
        <Title level={3} className="text-center">
          New Workout
        </Title>
        <Row justify="space-around">
          <NewWorkoutForm />
        </Row>
      </div>
    </>
  );
}
