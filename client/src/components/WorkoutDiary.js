import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import { AuthContext } from "../context/AuthContext";
import {
  List,
  Space,
  Row,
  Col,
  Divider,
  Modal,
  Button,
  Descriptions,
} from "antd";
import NewWorkoutForm from "./NewWorkoutForm";
import EditWorkoutForm from "./EditWorkoutForm";
import {
  FullscreenOutlined,
  PlayCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  HeartOutlined,
} from "@ant-design/icons";
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
  const [modalVisible, setModalVisible] = useState(null);
  const [modalItem, setModalItem] = useState(null);

  const containerStyle = {
    padding: "2rem",
  };

  const {
    availableWorkouts,
    setAvailableWorkouts,
    previousSessions,
  } = diaryContext;

  let history = useHistory();

  const editEntry = (workout) => {
    console.log(workout);
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
    WorkoutDiaryService.deleteWorkout(workout._id).then((x) => {
      setAvailableWorkouts(
        availableWorkouts.filter((x) => x._id !== workout._id)
      );
      setSelectedWorkout(null);
    });
  };

  const onClickPlay = (workout) => {
    history.push("/workout/session", { ...workout });
  };

  const showModal = (item) => {
    setModalItem(item);
    setModalVisible(true);
  };

  return (
    <>
      <div style={containerStyle}>
        {modalItem && (
          <DescriptionSessionModal
            session={modalItem}
            visible={modalVisible}
            setVisible={(v) => {
              setModalVisible(v);
              setModalItem(null);
            }}
          />
        )}
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
                deleteButton = () => (
                  <DeleteOutlined
                    style={{ fontSize: "15pt", marginRight: "2rem" }}
                    onClick={() => deleteEntry(item)}
                  />
                );
              }
            }
            let avatar = () => <> </>;
            if (item.type) {
              avatar = () =>
                item.type === "Aerobic"
                  ? React.createElement(CardioAvatar)
                  : React.createElement(WeightAvatar);
            }
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={avatar()}
                  title={
                    <>
                      {item.def && (
                        <span>
                          <HeartOutlined /> -
                        </span>
                      )}
                      {" " + item.name}
                    </>
                  }
                  description={
                    <Row justify="space-between">
                      <Col>
                        <p>{item.description}</p>
                        <p></p>
                      </Col>
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
            );
          }}
        />
        {!newWorkoutVisible && !selectedWorkout && (
          <Row justify="center" className="text-center">
            <Col span={16} className="mb-1">
              <Divider>Add</Divider>
              <PlusOutlined
                onClick={() => setNewWorkoutVisible(true)}
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
        )}
        {newWorkoutVisible && !selectedWorkout && (
          <>
            <Title level={3} className="text-center">
              New Workout
            </Title>
            <Row justify="space-around">
              <Col span={24}>
                <NewWorkoutForm setVisible={setNewWorkoutVisible} />
              </Col>
            </Row>
          </>
        )}
        {selectedWorkout && (
          <>
            <Title level={3} className="text-center">
              Edit Workout
            </Title>
            <Row justify="space-around">
              <Col span={24}>
                <EditWorkoutForm
                  workout={selectedWorkout}
                  setInvisible={() => setSelectedWorkout(null)}
                />
              </Col>
            </Row>
          </>
        )}
        <Title level={3} className="text-center">
          Previous sessions
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={previousSessions}
          renderItem={(item) => {
            const ts = new Date(item.timeStart);
            const te = new Date(item.timeEnd);

            if (item.workout) {
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      item.workout.type === "Aerobic"
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
                          <FullscreenOutlined
                            onClick={() => showModal(item)}
                            style={{ fontSize: "15pt" }}
                          />
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

const DescriptionSessionModal = ({ session, visible, setVisible }) => {
  const handleOk = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      title={session.title}
      onOk={handleOk}
      closable={false}
      footer={
        <Button type="primary" onClick={handleOk}>
          Ok
        </Button>
      }
    >
      <Descriptions title={session.title} className="inv-font" bordered>
        <Descriptions.Item label="Workout Name" span={4}>
          {session.workout.name}
        </Descriptions.Item>
        <Descriptions.Item label="Start Time" span={2}>
          {new Date(session.timeStart).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="End Time" span={2}>
          {new Date(session.timeEnd).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Workout Type" span={4}>
          {session.workout.type}
        </Descriptions.Item>
        <Descriptions.Item label="Exercise Log" span={4}>
          {session.items.map((x, idx) => (
            <div key={x.exercise.exercise + idx.toString()}>
              <p>
                <b>Set {idx.toString()}</b> - {x.exercise.exercise}
              </p>
              <ul>
                {x.exercise.exerciseType === "Aerobic" && <li>{x.duration}</li>}
                {x.exercise.exerciseType === "Anaerobic" && (
                  <>
                    <li>Reps: {x.repetitions}</li>
                    <li>Weight: {x.weight} Kg</li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};
