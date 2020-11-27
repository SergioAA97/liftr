import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Row,
  Col,
  Typography,
  Divider,
  Card,
  Progress,
  Form,
  Select,
  Slider,
  Switch,
  Button,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { DiaryContext } from "../context/DiaryContext";
import { SliderCard, SwitchCard } from "./utils/Layout-Components";

const { Title } = Typography;
const { Option } = Select;

export default function Goals() {
  const authContext = useContext(AuthContext);
  const diaryContext = useContext(DiaryContext);
  const { workoutProgram, setWorkoutProgram, availablePrograms } = diaryContext;

  const handleChange = (value) => {
    console.log(value);

    const program = availablePrograms.filter((x) => x.name === value);
    if (program.length > 0) setWorkoutProgram(program[0]);
  };

  return (
    <Row>
      <Col sm={24} xl={12} style={{ padding: "2rem" }}>
        <CoreGoals title="🏋️‍♀️ Core goals ">
          <>
            <p>
              Here you can enter your main biometrical data and get your caloric
              and macro goals automatically. Try it out!
            </p>
            <CoreGoalsForm
              workoutProgram={workoutProgram}
              handleChange={handleChange}
              availablePrograms={availablePrograms}
            />
          </>
        </CoreGoals>
      </Col>
      <Col sm={24} xl={12} style={{ padding: "2rem" }}>
        <StandardGoals />
      </Col>
    </Row>
  );
}

const CoreGoalsForm = ({ workoutProgram, availablePrograms }) => {
  // const weight, units, gender, height, years, activity, bodyFat;

  // 0 = Male, 1 = Female
  const [gender, setGender] = useState(0);
  const [genderLabel, setGenderLabel] = useState("Male");
  const [height, setHeight] = useState(179);
  const [mass, setMass] = useState(70);
  const [activityLevel, setActivityLevel] = useState(4);
  const [goal, setGoal] = useState("mantain");
  const [age, setAge] = useState(23);

  function activityLevelFormatter(value) {
    if (value < 2) {
      return `${value} 🐨`;
    } else if (value < 4) {
      return `${value} 🐼`;
    } else if (value < 6) {
      return `${value} 🐯`;
    } else if (value < 9) {
      return `${value} 🦁`;
    } else {
      return `${value} 😱`;
    }
  }

  const getActivityMultiplier = (value) => {
    if (value < 2) {
      return 1.15;
    } else if (value < 4) {
      return 1.3;
    } else if (value < 6) {
      return 1.5;
    } else if (value < 9) {
      return 1.7;
    } else {
      return 1.9;
    }
  };

  const calculateBMR = ({ mass, height, age, gender }) => {
    let remainder = gender === 0 ? 5 : -151;
    return 10 * mass + 6.25 * height - 5 * age + remainder;
  };

  const finalTDEE = ({ mass, height, age, gender, actityLevel }) => {
    console.log(calculateBMR({ mass, height, age, gender }));
    return (
      calculateBMR({ mass, height, age, gender }) *
      getActivityMultiplier(actityLevel)
    );
  };

  const onChangeGender = (checked) => {
    setGender(checked ? 1 : 0);
    setGenderLabel(checked ? "Female" : "Male");
  };

  const onChangeMass = (value) => {
    setMass(value);
  };

  const onChangeHeight = (value) => {
    setHeight(value);
  };

  const onChangeActivityLevel = (value) => {
    setActivityLevel(value);
  };

  const onGoalChange = (value) => {
    setGoal(value);
  };

  const onSumbit = (values) => {
    console.log({ ...values, gender, height, mass, activityLevel, age });
    console.log(
      finalTDEE({ ...values, gender, height, mass, activityLevel, age })
    );
  };

  return (
    <Form
      layout="horizontal"
      onFinish={onSumbit}
      initialValues={{
        ["goal"]: goal,
        ["mass"]: mass,
      }}
    >
      <Form.Item label="Goal" name="goal">
        <Select onChange={onGoalChange}>
          <Option value={"cut"}>Loose weight</Option>
          <Option value={"mantain"}>Mantain weight</Option>
          <Option value={"gain"}>Gain weight</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Weight (Kg)" name="mass">
        <Slider min={40} max={150} onChange={onChangeMass} />
      </Form.Item>
      <Form.Item label={"Gender"} name="gender">
        <div className="flex-st-md">
          <Switch
            onChange={onChangeGender}
            style={{ display: "inline-block" }}
            className="inv"
            defaultChecked={gender === 1 ? true : false}
          />
          <span style={{ padding: "0rem 0.5rem" }}>{genderLabel}</span>
        </div>
      </Form.Item>
      <Form.Item label="Height (cm)" name="height">
        <div className="flex-st-md">
          <Slider
            min={75}
            max={230}
            onChange={onChangeHeight}
            style={{ width: "100%" }}
            defaultValue={height}
          />
          <span style={{ padding: "0rem 0.5rem" }}>{height}</span>
        </div>
      </Form.Item>
      <Form.Item label="Activity Level (hr per week)" name="activityLevel">
        <div className="flex-st-md">
          <span style={{ padding: "0rem 0.5rem" }}>{"🐨"}</span>
          <Slider
            min={0}
            max={13}
            step={1}
            tipFormatter={activityLevelFormatter}
            style={{ width: "100%" }}
            defaultValue={activityLevel}
            onChange={onChangeActivityLevel}
          />
          <span style={{ padding: "0rem 0.5rem" }}>{"😱"}</span>
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const CoreGoals = ({ title, children }) => {
  return (
    <Card
      style={{ width: "100%" }}
      className="inv-font gradient-primary rounded-corners"
      actions={[
        <>
          <EditOutlined key="edit" style={{ display: "inline" }} /> Recalculate
        </>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
      title={title}
    >
      {children}
    </Card>
  );
};

const StandardGoals = () => {
  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title>Goals</Title>
        </Col>
      </Row>
      <Row justify={"space-around"} style={{ padding: "2rem 2rem " }}>
        <GoalCard title="Goal 1" value={"80"} />
        <GoalCard title="Goal 2" value={"80"} />
        <GoalCard title="Goal 3" value={"80"} />
      </Row>
      <Row justify="center" className="text-center">
        <Col span={16}>
          <Divider>Add</Divider>
          <PlusOutlined style={{ cursor: "pointer" }} />
        </Col>
      </Row>
    </>
  );
};

const GoalCard = ({ title, value = 0, valueStyle, description }) => {
  return (
    <Col sm={12} md={8} lg={6} className="text-center">
      <Title level={3} className="mb-1">
        {title}
      </Title>
      <Progress
        type="dashboard"
        percent={value}
        strokeColor={{
          "0%": "#4834d4",
          "100%": "#241a6a",
        }}
        style={{ stroke: "#e7e8ff" }}
      />
      <div>{description}</div>
    </Col>
  );
};
