import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import { AuthContext } from "../context/AuthContext";
import { List, Space, Row, Col, Divider } from "antd";
import NewWorkoutForm from "./NewWorkoutForm";
import EditWorkoutForm from "./EditWorkoutForm";
import { FullscreenOutlined, PlayCircleOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import CustomIcon from "./utils/CustomIcon";
import WorkoutDiaryService from "../service/WorkoutDiaryService";

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

  const [newWorkoutVisible, setNewWorkoutVisible] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState();

  const containerStyle = {
    padding: "2rem",
  };

  const { availableWorkouts, previousSessions } = diaryContext;

  let history = useHistory();

  const editEntry = (workout) => {
    console.log(workout)
    if (selectedWorkout) {
      if (selectedWorkout._id === workout._id) {
        setSelectedWorkout(null);
      } else {
        setSelectedWorkout(workout);
      }
    } else {
      setSelectedWorkout(workout);
    }

  };

  const deleteEntry = (workout) => {
    WorkoutDiaryService.deleteWorkout(workout._id).then(x => history.go(0));
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
          renderItem={(item) => {
            let deleteButton = () => <></>;
            if (selectedWorkout) {
              if (selectedWorkout._id === item._id) {
                deleteButton = () => <DeleteOutlined
                  style={{ fontSize: "15pt", marginRight: "2rem" }}
                  onClick={() => deleteEntry(item)}
                />
              }
            }
            let avatar = () => <> </>;
            if(item.type){
              avatar = () => item.type === "Aerobic"
              ? React.createElement(CardioAvatar)
              : React.createElement(WeightAvatar)
            }
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    avatar()
                  }
                  title={<a href="">{item.name}</a>}
                  description={
                    <Row justify="space-between">
                      <Col>{item.description}</Col>
                      <Col>
                        {deleteButton()}
                        <EditOutlined
                          style={{ fontSize: "15pt", marginRight: "2rem" }}
                          onClick={() => editEntry(item)}
                        />
                        <PlayCircleOutlined
                          style={{ fontSize: "15pt" }}
                          onClick={() => onClickPlay(item)}
                        />
                      </Col>
                    </Row>
                  }
                />
              </List.Item>
            )
          }}
        />
        {!newWorkoutVisible && !selectedWorkout &&
          <Row justify="center" className="text-center">
            <Col span={16} className="mb-1">
              <Divider>Add</Divider>
              <PlusOutlined onClick={() => setNewWorkoutVisible(true)} style={{ cursor: "pointer" }} />
            </Col>
          </Row>
        }
        {newWorkoutVisible && !selectedWorkout &&
          <>
            <Title level={3} className="text-center">
              New Workout
          </Title>
            <Row justify="space-around">
              <Col span={24}>
                <NewWorkoutForm />
              </Col>
            </Row>
          </>
        }
        {selectedWorkout &&
          <>
            <Title level={3} className="text-center">
              Edit Workout
          </Title>
            <Row justify="space-around">
              <Col span={24}>
                <EditWorkoutForm workout={selectedWorkout} />
              </Col>
            </Row>
          </>
        }
        <Title level={3} className="text-center">
          Previous sessions
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={previousSessions}
          renderItem={(item) => {
            const ts = new Date(item.timeStart);
            const te = new Date(item.timeEnd);
            if(item.workout){
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
            }
           
          }}
        />

      </div>
    </>
  );
}
