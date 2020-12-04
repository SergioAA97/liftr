import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Typography,
  Space,
  Button,
  Divider,
  Modal,
  Form,
  Input,
} from "antd";
import {
  EditOutlined,
  CaretRightOutlined,
  PauseOutlined,
  RollbackOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useTimer } from "./utils/Timer";

const { Title } = Typography;

export default () => {
  const location = useLocation();

  const workout = location.state;

  const { type, _id, description, def, exercises } = workout;

  return (
    <div>
      <Row justify="center" className="gradient-primary">
        <Col>
          <Title level={3} className="inv-font mt-2">
            Timer
          </Title>
        </Col>
      </Row>
      <Timer />
      <Row justify="center" className="gradient-primary">
        <Col>
          <Title level={3} className="inv-font mt-2">
            Exercises
          </Title>
        </Col>
      </Row>
      <Row>
        {workout &&
          workout.exercises.map((item) => (
            <Col
              className="bk-white rounded-corners p-1 mt-2 mb-2"
              span={22}
              offset={1}
            >
              <WorkoutExercises item={item} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

const WorkoutExercises = ({ item }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [values, setValues] = useState();
  //Aerobic strategy
  const [duration, setDuration] = useState(5000);
  //Anaerobic strategy
  const [weight, setWeight] = useState(10);
  const [reps, setReps] = useState(1);

  const {
    _id,
    equipment,
    exercise,
    exerciseType,
    majorMuscle,
    minorMuscle,
    modifications,
    notes,
  } = item;

  const onAerobicSubmit = () => {
    let values = [{ label: "duration", value: duration }];
    console.log("Submitted:", values);
  };

  const onAnaerobicSubmit = () => {
    let values = [
      { label: "reps", value: reps },
      { lable: "weight", value: weight },
    ];
    console.log("Submitted:", values);
  };

  const handleOnClick = (isUp, setState, valueIfTrue, valueIfFalse) => {
    if (isUp) {
      if (valueIfTrue) {
        setState(valueIfTrue);
      }
    } else {
      if (valueIfFalse) {
        setState(valueIfFalse);
      }
    }
  };

  const onClickWeight = (isUp) => {
    handleOnClick(
      isUp,
      setWeight,
      weight + 1,
      weight - 1 > 0 ? weight - 1 : weight
    );
  };

  const onClickReps = (isUp) => {
    handleOnClick(isUp, setReps, reps + 1, reps - 1 > 0 ? reps - 1 : reps);
  };

  const onClickDuration = (isUp) => {
    handleOnClick(isUp, setDuration, duration + 1);
  };

  const onChangeDuration = ({ minutes, seconds }) => {};

  const onChangeWeight = (value) => {
    console.log(value.target.value);
    if (parseInt(value.target.value) >= 0) {
      setWeight(parseInt(value.target.value));
    } else {
      setWeight(0);
    }
  };

  return (
    <>
      <Row justify="space-between" align="center">
        <Col>
          <Title level={4}>{exercise}</Title>
          <p>Description</p>
        </Col>
        <Col>
          <Space size={25} align="center" style={{ height: "100%" }}>
            <Space align="center" direction="vertical">
              <Title level={5}>4 Sets</Title>
              <p>4-6 reps</p>
            </Space>
            <WorkoutSetInputModal entry={item}>
              {exerciseType === "Anaerobic" && (
                <AnaerobicForm
                  onAnaerobicSubmit={onAnaerobicSubmit}
                  values={[
                    { label: "reps", value: reps },
                    { label: "kg", value: weight },
                  ]}
                  onClickReps={onClickReps}
                  onClickWeight={onClickWeight}
                  onChangeWeight={onChangeWeight}
                />
              )}
              {exerciseType === "Aerobic" && (
                <AerobicForm
                  onAnaerobicSubmit={onAerobicSubmit}
                  values={[{ label: "duration", value: duration }]}
                  onClick={onClickDuration}
                  onChange={onChangeDuration}
                />
              )}
            </WorkoutSetInputModal>
          </Space>
        </Col>
      </Row>
      {Array.isArray(values) && (
        <>
          <Divider />
          <Row justify="center">
            <Col>
              <Title leve={5} className="mb-1" style={{ fontSize: "18pt" }}>
                Completed
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={10}>
              {" "}
              {Array.isArray(values) && (
                <div>
                  {values.map((e, index) => (
                    <p key={index++} style={{ marginBottom: 0 }}>
                      <b>{e.label}:</b> {e.value}
                    </p>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const WorkoutSetInputModal = ({ entry, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <EditOutlined
        onClick={showModal}
        style={{ fontSize: "15pt", cursor: "pointer" }}
      />
      <Modal
        title={entry.exercise}
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okType="default"
        cancelButtonProps={{ type: "danger" }}
      >
        {children}
      </Modal>
    </>
  );
};

const AnaerobicForm = ({
  onAnaerobicSubmit,
  values,
  onClickReps,
  onClickWeight,
  onChangeWeight,
}) => {
  let [reps, weight] = values;

  return (
    <>
      <Title level={4} className="inv-font text-center">
        New entry
      </Title>
      <Form
        title="Weight sets"
        onFinish={onAnaerobicSubmit}
        layout="horizontal"
        style={{ padding: "1rem" }}
      >
        <Row justify="center">
          <Col span={12}>
            <InputCounter
              label={reps.label}
              value={reps.value}
              onClick={onClickReps}
            />
          </Col>
          <Col span={12}>
            <InputCounter
              label={weight.label}
              value={weight.value}
              onClick={onClickWeight}
              onChange={onChangeWeight}
              input={true}
            />
          </Col>
        </Row>
        <Button type="default" size={10} htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

const AerobicForm = ({ onAerobicSubmit, values, onClick, onChange }) => {
  let [label, value] = values;

  return (
    <>
      <Title level={4} className="inv-font text-center">
        New entry
      </Title>
      <Form title="Weight sets" onFinish={onAerobicSubmit} layout="horizontal">
        <Row justify="center">
          <Col span={4}></Col>
        </Row>
        <Button type="default" size={10} htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

const Timer = () => {
  const [time, startTimer, stopTimer, resetTimer] = useTimer();

  let dateTime = new Date(time);

  return (
    <>
      <Row justify="center" className="inv-font">
        <TimeSlot value={dateTime.getMinutes()} label="m" />
        <TimeSlot value={dateTime.getSeconds()} label="s" />
        <TimeSlot value={dateTime.getMilliseconds()} label="ms" />
      </Row>
      <Row justify="center" className="mt-2">
        <Col>
          <Space size={10}>
            <Button
              type="primary"
              shape="circle"
              icon={<CaretRightOutlined />}
              size="large"
              onClick={startTimer}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<PauseOutlined />}
              size="large"
              onClick={stopTimer}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<RollbackOutlined />}
              size="large"
              onClick={resetTimer}
            />
          </Space>
        </Col>
      </Row>
    </>
  );
};

const TimeSlot = ({ value, label, labelStyle, valueStyle }) => {
  const labelStyleStart = {
    fontSize: "18pt",
    fontWeight: "600",
  };
  const valueStyleStart = {
    fontSize: "24pt",
    fontWeight: "800",
  };
  return (
    <Col xs={6} md={4} lg={2}>
      <Space
        direction="horizontal"
        align="center"
        size={10}
        style={{ width: "100%", justifyContent: "center" }}
      >
        <span style={{ ...valueStyleStart, ...labelStyle }}>{value}</span>
        <span style={{ ...labelStyleStart, ...valueStyle }}>{label}</span>
      </Space>
    </Col>
  );
};

const InputCounter = ({ label, value, onClick, input = false, onChange }) => {
  const onClickUp = (e) => {
    onClick(true);
  };
  const onClickDown = (e) => {
    onClick(false);
  };

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "top",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        type="primary"
        onClick={onClickUp}
        shape="circle"
        icon={<UpOutlined />}
        size={10}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
        }}
      >
        {!input && (
          <div
            style={{
              ...centerStyle,
              margin: "1rem",
              color: "white",
              fontSize: "16pt",
              fontWeight: "light",
              alignItems: "center",
            }}
          >
            {value}
          </div>
        )}
        {input && (
          <Input
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "16pt",
              fontWeight: "light",
            }}
            bordered={false}
            defaultValue={value}
            className="transparent"
            onChange={onChange}
            value={value}
          />
        )}
        <div
          style={{
            ...centerStyle,
            margin: "1rem",
            color: "white",
            fontSize: "24pt",
            fontWeight: "bold",
          }}
        >
          {label}
        </div>
      </div>
      <Button
        type="primary"
        onClick={onClickDown}
        shape="circle"
        icon={<DownOutlined />}
        size={10}
      />
    </div>
  );
};
