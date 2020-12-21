import React, { useContext, useState } from "react";
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
  InputNumber,
} from "antd";
import {
  EditOutlined,
  CaretRightOutlined,
  PauseOutlined,
  RollbackOutlined,
  UpOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useTimer } from "./utils/Timer";
import WorkoutDiaryService from "../service/WorkoutDiaryService";
import { DiaryContext } from "../context/DiaryContext";

const { Title } = Typography;

export default () => {
  const [timeStart] = useState(new Date(Date.now()));
  const [items, setItems] = useState([]);
  const diaryContext = useContext(DiaryContext);
  const location = useLocation();
  const history = useHistory();

  const workout = location.state;

  const { _id } = workout;

  const onUpValues = (item) => {
    console.log("onUpValues", item, items);
    let newItems = items;
    newItems.push(item);
    setItems(newItems);
  };

  const onSumbitSession = () => {
    const sessionObj = {
      timeStart,
      timeEnd: new Date(Date.now()),
      items,
      workout: _id,
    };

    WorkoutDiaryService.postSession(sessionObj).then((x) => {
      diaryContext.refreshEntries();
      history.push("/workout");
    });
  };

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
        {" "}
        {workout &&
          workout.exercises.map((item, idx) => (
            <Col
              className="bk-white rounded-corners p-1 mt-1 mb-1"
              span={22}
              offset={1}
              key={idx}
            >
              <WorkoutExercise item={item} onUpValues={onUpValues} />
            </Col>
          ))}{" "}
      </Row>
      <Row justify="center">
        <Col span={24} className="text-center">
          <Button type="primary" className="inv" onClick={onSumbitSession}>
            End Session
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const WorkoutExercise = ({ item, onUpValues }) => {
  const [values, setValues] = useState();
  // Aerobic strategy
  const [duration, setDuration] = useState(5000);
  // Anaerobic strategy
  const [weight, setWeight] = useState(10);
  const [reps, setReps] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const {
    _id,
    exercise,
    exerciseType
  } = item.ref;

  const onAerobicSubmit = ({ min = 0, sec = 1 }) => {
    let time = parseInt(min) * 60 + parseInt(sec);
    console.log("Submitted:", min, sec, time);
    let entry = [
      {
        label: "Minutes",
        value: min,
      },
      {
        label: "Seconds",
        value: sec,
      },
    ];
    let updateValues = values ? [...values] : [];
    updateValues.push(entry);
    setValues(updateValues);
    onUpValues({ duration: time, exercise: _id });
    setModalVisible(false);
  };

  const onAnaerobicSubmit = () => {
    let entry = [
      {
        label: "reps",
        value: reps,
      },
      {
        label: "weight",
        value: weight,
      },
    ];
    console.log("Submitted:", entry);
    let updateValues = values ? [...values] : [];

    updateValues.push(entry);
    console.log(updateValues);
    setValues(updateValues);
    let [r, w] = entry;
    onUpValues({ repetitions: r.value, weight: w.value, exercise: _id });
    setModalVisible(false);
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

  const onChangeWeight = (e) => {
    console.log(e.target.value);
    if (parseInt(e.target.value) >= 0) {
      setWeight(parseInt(e.target.value));
    } else {
      setWeight(0);
    }
  };

  let prefix = item.sets ? item.sets + " Sets" : "";
  console.log(item);
  return (
    <>
      <Row justify="space-between" align="center">
        <Col>
          <Title level={4}>{exercise}</Title>
        </Col>
        <Col>
          <Space size={15} align="center" style={{ height: "100%" }}>
            <Space align="center" direction="vertical">
              <Title level={5}>{prefix}</Title>
            </Space>

            <WorkoutSetInputModal
              entry={item}
              setModalVisible={setModalVisible}
              visible={modalVisible}
            >
              {exerciseType === "Anaerobic" && (
                <AnaerobicForm
                  onAnaerobicSubmit={onAnaerobicSubmit}
                  values={[
                    {
                      label: "reps",
                      value: reps,
                    },
                    {
                      label: "kg",
                      value: weight,
                    },
                  ]}
                  onClickReps={onClickReps}
                  onClickWeight={onClickWeight}
                  onChangeWeight={onChangeWeight}
                />
              )}
              {exerciseType === "Aerobic" && (
                <AerobicForm
                  onAerobicSubmit={onAerobicSubmit}
                  values={[
                    {
                      label: "duration",
                      value: duration,
                    },
                  ]}
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
              <Title className="mb-2" style={{ fontSize: "18pt" }}>
                Completed
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={20} sm={16} md={12} lg={8}>
              <div>
                {" "}
                {values.map((e, index) => {
                  if (Array.isArray(e)) {
                    // Anaerobic
                    let [reps, weight] = e;

                    return (
                      <>
                        {index !== 0 && (
                          <Divider
                            key={reps + index}
                            style={{ width: "80%" }}
                          />
                        )}
                        <div
                          key={reps + index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Title level={5}>
                            <b>Set {index + 1}</b>
                          </Title>
                          <div>
                            <p>
                              <b>{reps.label}:</b>
                              {" " + reps.value}{" "}
                            </p>
                            <p>
                              <b>{weight.label}:</b>
                              {" " + weight.value}{" "}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    // Aerobic

                    return (
                      <>
                        {index !== 0 && (
                          <Divider
                            key={e.label + index}
                            style={{ width: "80%" }}
                          />
                        )}
                        <div
                          key={e.label + index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Title level={5}>
                            <b>Set {index + 1}</b>
                          </Title>
                          <div>
                            <p>
                              <b>{e.label}:</b>
                              {" " + e.value}{" "}
                            </p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}{" "}
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const WorkoutSetInputModal = ({
  entry,
  children,
  visible,
  setModalVisible,
}) => {
  return (
    <>
      <EditOutlined
        onClick={() => {
          setModalVisible(true);
        }}
        style={{
          fontSize: "15pt",
          cursor: "pointer",
        }}
      />
      <Modal
        title={entry.exercise}
        visible={visible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {children}{" "}
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
        <div className="text-center mt-2">
          <Button type="primary" size={20} htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

const AerobicForm = ({ onAerobicSubmit, values }) => {
  let [el] = values;
  const { label, value } = el;
  console.log(label, value);
  return (
    <>
      <Title level={4} className="inv-font text-center">
        New entry
      </Title>
      <Form
        title="Weight sets"
        onFinish={onAerobicSubmit}
        layout="horizontal"
        className="inv mt-2"
      >
        <Row justify="center" align="middle">
          <Col span={10} className="flex-md-bl">
            <Form.Item 
              name="min" 
              className="flex-md-md" 
              rules={[
                {type:"integer", message:"Please enter a valid number!"}
              ]}
            >
              <InputNumber className="transparent" min={0} defaultValue={0} />
            </Form.Item>
            <div className="inv-font ml-1"> min</div>
          </Col>
          <Col span={10} className="flex-md-bl">
            <Form.Item name="sec" className="flex-md-md">
              <InputNumber
                className="transparent"
                min={0}
                max={59}
                defaultValue={1}
                rules={[
                  {type:"integer", message:"Please enter a valid number!"}
                ]}
              />
            </Form.Item>
            <div className="inv-font ml-1"> sec</div>
          </Col>
        </Row>
        <div className="text-center mt-1">
          <Button type="primary" size={20} htmlType="submit">
            Submit
          </Button>
        </div>
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
        style={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            ...valueStyleStart,
            ...labelStyle,
          }}
        >
          {value}
        </span>
        <span
          style={{
            ...labelStyleStart,
            ...valueStyle,
          }}
        >
          {label}
        </span>
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
              margin: "1rem 0",
              color: "white",
              fontSize: "16pt",
              fontWeight: "light",
              alignItems: "center",
              width: "40%",
            }}
          >
            {value}{" "}
          </div>
        )}
        {input && (
          <Input
            style={{
              textAlign: "center",
              color: "white",
              fontSize: "16pt",
              fontWeight: "light",
              width: "40%",
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
            margin: "1rem 0",
            color: "white",
            fontSize: "24pt",
            fontWeight: "bold",
            width: "40%",
          }}
        >
          {label}{" "}
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
