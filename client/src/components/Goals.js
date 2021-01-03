import React, { useContext, useEffect, useState } from "react";
import CustomIcon from "./utils/CustomIcon";
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
  Statistic,
  Button,
  Input,
  InputNumber,
} from "antd";
import {
  PlusOutlined,
  DeliveredProcedureOutlined,
  RollbackOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { DiaryContext } from "../context/DiaryContext";
import {
  WeightGoal,
  CardioWeekGoal,
  WeightWeekGoal,
} from "./utils/GoalStrategies";
import GoalService from "../service/GoalService";
import Spinner from "./utils/Spinner";

const { Title } = Typography;
const { Option } = Select;

export default function Goals() {
  const diaryContext = useContext(DiaryContext);
  const {
    workoutProgram,
    setWorkoutProgram,
    availablePrograms,
    previousSessions,
    goals,
    setGoals,
    customGoals,
    setCustomGoals,
    foodStats,
    biometrics,
  } = diaryContext;

  const [addViewVisible, setAddViewVisible] = useState(false);
  const [loading, setLoading] = useState(null);

  const addCustomGoal = async (values, name) => {
    try {
      let endDate = new Date(Date.now());
      console.log(endDate);
      endDate.setDate(endDate.getDate() + parseInt(values.deadline));

      console.log(values, name, endDate);
      const newGoal = {
        name,
        startDate: new Date(Date.now()),
        endDate,
        goalValue: parseInt(values.goalValue),
      };
      console.log(newGoal);
      await GoalService.postCustomGoal(newGoal);
      let newGoals = [...customGoals, newGoal];
      setCustomFields(newGoals);
      setCustomGoals(newGoals);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteGoal = async (name) => {
    try {
      console.log(name);
      await GoalService.deleteCustomGoal(name);
      setCustomGoals(customGoals.filter((x) => x.name !== name));
    } catch (err) {
      console.error(err);
    }
  };

  const getGoalClassFromName = (name) => {
    switch (name) {
      case "Weight goal":
        return WeightGoal;
      case "Hours of cardio per week":
        return CardioWeekGoal;
      default:
        return null;
    }
  };

  const handleChange = (value) => {
    console.log(value);

    const program = availablePrograms.filter((x) => x.name === value);
    if (program.length > 0) setWorkoutProgram(program[0]);
  };

  const setCustomFields = (customGoals) => {
    customGoals.forEach((x) => {
      switch (x.name) {
        case "Weight goal":
          x.currentValue = biometrics.weight;
          console.log("Use effect for weight", x.currentValue);
          break;
        case "Hours of cardio per week":
          const cardioGoal = new CardioWeekGoal(x);
          x.currentValue = cardioGoal.currentValue(previousSessions);
          break;
        case "Hours of weights per week":
          const weightGoal = new WeightWeekGoal(x);
          x.currentValue = weightGoal.currentValue(previousSessions);
          break;
        default:
          return null;
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    if (!customGoals) return;
    if (!Array.isArray(customGoals)) return;
    console.log("loading");
    setCustomFields(customGoals);
    setLoading(false);
  }, [customGoals.length]);

  if (loading || !goals) {
    return <Spinner />;
  }

  return (
    <Row>
      <Col sm={24} xl={12} style={{ padding: "2rem" }}>
        <CoreGoals title="Core goals ">
          <>
            <p>
              Here you can enter your main biometrical data and get your caloric
              and macro goals automatically. Try it out!
            </p>
            <CoreGoalsForm
              workoutProgram={workoutProgram}
              handleChange={handleChange}
              availablePrograms={availablePrograms}
              setGoals={setGoals}
              biometrics={biometrics}
            />
          </>
        </CoreGoals>
      </Col>
      <Col sm={24} xl={12} style={{ padding: "2rem" }} className="text-center">
        <StandardGoals goals={goals} currentStats={foodStats} />
        <Title level={3}>LIFTR Goals</Title>
        <Row justify="center" className="text-center">
          {customGoals.map((x) => {
            let val = x.currentValue;
            let daysLeft =
              (new Date(x.endDate).getTime() -
                new Date(x.startDate).getTime()) /
              86400000;
            if (x.name === "Weight goal") {
              val = (x.goalValue * x.currentValue) / 100;
            }
            return (
              <>
                <GoalCard
                  key={x.name}
                  title={x.name}
                  value={new Intl.NumberFormat().format(Math.round(val))}
                  valueFormat={" %"}
                >
                  <Statistic
                    title="Days left"
                    value={new Intl.NumberFormat().format(daysLeft)}
                    valueStyle={daysLeft < 5 ? { color: "#e74c3c" } : {}}
                  />
                </GoalCard>
              </>
            );
          })}
        </Row>
        <Row justify="center" className="text-center">
          <Col span={16}>
            <Divider>Add</Divider>
            {!addViewVisible && (
              <PlusOutlined
                style={{ cursor: "pointer" }}
                onClick={() => setAddViewVisible(!addViewVisible)}
              />
            )}
            {addViewVisible && (
              <CloseOutlined
                style={{ cursor: "pointer" }}
                onClick={() => setAddViewVisible(!addViewVisible)}
              />
            )}
          </Col>
        </Row>
        <Row justify="center" className="text-center">
          <Col span={24}>
            {addViewVisible && (
              <>
                <Title level={4}>New Goal</Title>
                <Row justify="center" className="text-center">
                  <Col flex={1}>
                    <NewGoalCard
                      name="Weight goal"
                      goalClass={getGoalClassFromName("Weight goal")}
                      onSubmit={addCustomGoal}
                      onDelete={deleteGoal}
                      data={customGoals.filter((x) => x.name === "Weight goal")}
                    />
                  </Col>
                  <Col flex={1}>
                    <NewGoalCard
                      name="Hours of cardio per week"
                      goalClass={getGoalClassFromName(
                        "Hours of cardio per week"
                      )}
                      onSubmit={addCustomGoal}
                      onDelete={deleteGoal}
                      data={customGoals.filter(
                        (x) => x.name === "Hours of cardio per week"
                      )}
                    />
                  </Col>
                  <Col flex={1}>
                    <NewGoalCard
                      name="Hours of weights per week"
                      goalClass={getGoalClassFromName(
                        "Hours of weights per week"
                      )}
                      onSubmit={addCustomGoal}
                      onDelete={deleteGoal}
                      data={customGoals.filter(
                        (x) => x.name === "Hours of weights per week"
                      )}
                    />
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

const CoreGoalsForm = ({
  workoutProgram,
  availablePrograms,
  setGoals,
  biometrics,
}) => {
  // const weight, units, gender, height, years, activity, bodyFat;

  // 0 = Male, 1 = Female
  const { gender, height, age, weight } = biometrics;
  console.log(biometrics);
  const [mass, setMass] = useState(weight ? weight : 70);
  const [activityLevel, setActivityLevel] = useState(4);
  const [goal, setGoal] = useState("mantain");
  const [result, setResult] = useState();

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

  const getObjectiveMultiplier = (goal) => {
    switch (goal) {
      case "maintain":
        return 1;
      case "cut":
        return 0.75;
      case "gain":
        return 1.1;
      default:
        return 1;
    }
  };

  const finalTDEE = ({ mass, height, age, gender, activityLevel }) => {
    return (
      calculateBMR({ mass, height, age, gender }) *
      getActivityMultiplier(activityLevel) *
      getObjectiveMultiplier(goal)
    );
  };

  const getMacros = (goal) => {
    //[protein,fat,carbs]
    switch (goal) {
      case "maintain":
        return [0.3, 0.25, 0.45];
      case "cut":
        return [0.4, 0.2, 0.4];
      case "gain":
        return [0.25, 0.2, 0.55];
      default:
        return [0.3, 0.25, 0.45];
    }
  };

  const onChangeMass = (value) => {
    setMass(value);
  };

  const onChangeActivityLevel = (value) => {
    setActivityLevel(value);
  };

  const onGoalChange = (value) => {
    setGoal(value);
  };

  const onReset = () => {
    setResult(null);
  };

  const onSave = async () => {
    try {
      const { carbohydrates, fat, protein, tdee } = result;

      await GoalService.saveCoreGoals({
        calories: Math.round(tdee),
        carbohydrates,
        fat,
        protein,
      });
      setGoals({
        calories: tdee,
        carbohydrates,
        fat,
        protein,
      });
      onReset();
    } catch (err) {
      console.error(err);
    }
  };

  const onSumbit = (values) => {
    console.log({ gender, height, mass, activityLevel, age });
    console.log(finalTDEE({ gender, height, mass, activityLevel, age }));
    let finalTdee = finalTDEE({ gender, height, mass, activityLevel, age });
    let finalBmr = calculateBMR({ mass, height, age, gender });

    const [proteinMul, fatMul, carbMul] = getMacros(goal);
    setResult({
      tdee: finalTdee,
      bmr: finalBmr,
      activityMultiplier: getActivityMultiplier(activityLevel),
      carbohydrates: Math.round((finalTdee * carbMul) / 4),
      fat: Math.round((finalTdee * fatMul) / 9),
      protein: Math.round((finalTdee * proteinMul) / 4),
    });
  };

  return (
    <Form
      layout="horizontal"
      onFinish={onSumbit}
      initialValues={{
        ["goal"]: goal,
        ["mass"]: mass,
      }}
      className="inv"
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
      {!result && (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ padding: "0rem 1rem" }}
          >
            Calculate
          </Button>
        </Form.Item>
      )}
      {result && (
        <>
          <Row justify="space-around" align="middle" className="text-center">
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title={<b>Daily calories (TDEE)</b>}
                value={result.tdee}
                suffix={<p> kcal</p>}
                precision={2}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title={<b>BMR</b>}
                value={result.bmr}
                suffix={<p> kcal</p>}
                precision={2}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title={<b>Activity Multiplier</b>}
                value={result.activityMultiplier}
                prefix={<p>x</p>}
              />
            </Col>
          </Row>
          <Row justify="space-around" align="middle" className="text-center">
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title={
                  <b>
                    Protein <CustomIcon inv proteinIcon />
                  </b>
                }
                value={result.protein}
                suffix={<p> g</p>}
                precision={0}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title={
                  <b>
                    Fat <CustomIcon inv fatIcon />
                  </b>
                }
                value={result.fat}
                suffix={<p> g</p>}
                precision={0}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Statistic
                title={
                  <b>
                    Carbohydrates <CustomIcon inv carbIcon />
                  </b>
                }
                value={result.carbohydrates}
                suffix={<p> g</p>}
                precision={0}
              />
            </Col>
          </Row>
          <Row><Col span={24}><i>All calculated values are purely for reference and should not be considered medical advice, consult your doctor before submitting youself to any kind of dietary change.</i></Col></Row>
          <Row justify="center" className="text-center mt-1">
            <Col flex={1}>
              <Button
                icon={
                  <DeliveredProcedureOutlined
                    key="edit"
                    style={{ display: "inline" }}
                  />
                }
                onClick={onSave}
                type="primary"
                size="large"
              >
                <b> Save</b>
              </Button>
            </Col>
            <Col flex={1}>
              <Button
                icon={
                  <RollbackOutlined
                    key="rollback"
                    style={{ display: "inline" }}
                  />
                }
                onClick={onReset}
                type="primary"
                size="large"
              >
                <b> Reset</b>
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

const CoreGoals = ({ title, children }) => {
  return (
    <Card
      style={{ width: "100%" }}
      className="inv-font gradient-primary rounded-corners"
      title={title}
    >
      {children}
    </Card>
  );
};

const StandardGoals = ({ goals, currentStats }) => {
  let { carbohydrates, protein, fat, calories } = goals;

  let currentCarbs, currentProtein, currentFat, currentCalories;

  currentCarbs = currentStats.carbs;
  currentProtein = currentStats.protein;
  currentFat = currentStats.fat;
  currentCalories = currentStats.energy;

  carbohydrates = (100 * currentCarbs) / carbohydrates;
  protein = (100 * currentProtein) / protein;
  fat = (100 * currentFat) / fat;
  calories = (100 * currentCalories) / calories;

  return (
    <>
      <Row>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={3}>Core Goals</Title>
        </Col>
      </Row>
      <Row justify={"space-around"} style={{ padding: "2rem 2rem " }}>
        <GoalCard
          title="Calorie intake"
          value={Math.round(calories)}
          valueFormat={" %"}
        />
        <GoalCard
          title="Protein"
          value={Math.round(protein)}
          valueFormat={" %"}
        />
        <GoalCard title="Fat" value={Math.round(fat)} valueFormat={" %"} />
        <GoalCard
          title="Carbohydrates"
          value={Math.round(carbohydrates)}
          valueFormat={" %"}
        />
      </Row>
    </>
  );
};

const NewGoalCard = ({ name, onSubmit, onDelete, data }) => {
  const [editView, setEditView] = useState();
  const [deleteView, setDeleteView] = useState();
  let exists = false;

  if (data) {
    if (Array.isArray(data)) {
      if (data.length === 1) {
        exists = true;
      }
    }
  }

  let divStyle = {
    cursor: "pointer",
    padding: "1rem",
    margin: "2rem",
    boxShadow: "0 10px 16px 0 rgba(0,0,0,0.1),0 6px 20px 0 rgba(0,0,0,0.10)",
    position: "relative",
  };

  if (exists && !deleteView) {
    divStyle = { ...divStyle, opacity: 0.5 };
  } else if (exists && deleteView) {
    divStyle = { ...divStyle, opacity: 1, backgroundColor: "#e74c3c" };
  }
  return (
    <div
      style={divStyle}
      onClick={() => {
        if (!exists && !editView) setEditView(true);
        if (exists && !deleteView) setDeleteView(true);
      }}
      className="rounded-corners"
    >
      {editView && (
        <CloseOutlined
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "1rem",
            right: "1rem",
          }}
          onClick={() => {
            setEditView(false);
          }}
        />
      )}
      <CustomIcon
        style={{ opacity: !deleteView ? "1" : "0" }}
        scaleIcon={name.includes("Weight goal") ? true : false}
        workoutIcon={name.includes("Hours of weights per week") ? true : false}
        heartIcon={name.includes("Hours of cardio per week") ? true : false}
        text={name}
      />
      {deleteView && (
        <DeleteOutlined
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="inv-font"
          onClick={() => {
            onDelete(name);
            setDeleteView(false);
          }}
        />
      )}
      {editView && (
        <Row justify="center" className="mt-1" align="top">
          <Col flex={5}>
            <Form
              name="NewGoal"
              onFinish={(values) => {
                onSubmit(values, name);
                setEditView(false);
              }}
            >
              <Form.Item 
                name="deadline" 
                rules={[
                  { required: true, message: "Enter a deadline!" },
                  {
                    type: "integer",
                    message: "Please input a valid number!",
                  },
                ]}
              >
                <InputNumber placeholder="Days" className="text-center" style={{width:"100%"}} />
              </Form.Item>
              <Form.Item 
                name="goalValue"
                rules={[
                  { required: true, message: "Enter a goal!" },
                  {
                    type: "integer",
                    message: "Please input a valid number!",
                  },
                ]}
              >
                <InputNumber placeholder="Goal Value" className="text-center" style={{width:"100%"}} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
};

const GoalCard = ({
  title,
  value = 0,
  valueFormat,
  formatter,
  description,
  children,
}) => {
  return (
    <Col sm={12} md={8} lg={6} className="text-center">
      <Title level={5} className="mb-1">
        {title}
      </Title>
      <Progress
        type="dashboard"
        format={
          typeof formatter === "function"
            ? (p) => formatter(p)
            : (p) => `${p} ${valueFormat}`
        }
        percent={value}
        strokeColor={{
          "0%": "#4834d4",
          "100%": "#241a6a",
        }}
        status="active"
        style={{ stroke: "#e7e8ff" }}
      />
      <div>{description}</div>
      <div>{children}</div>
    </Col>
  );
};
