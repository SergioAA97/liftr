import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import WorkoutDiaryService from "../service/WorkoutDiaryService";
import { Form, Input, InputNumber, Button,  AutoComplete, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function NewWorkoutForm({ setVisible }) {
  const [options, setOptions] = useState(null);
  const [type, setType] = useState("Aerobic");
  const diaryContext = useContext(DiaryContext);

  const { availableWorkouts, setAvailableWorkouts } = diaryContext;

  const onFinish = (values) => {
    console.log("Received values of form:", values, "Type:", type);
    const { name, description, exercises } = values;
    let exerciseData = options.filter((o) => {
      for (let i = 0; i < exercises.length; i++) {
        const e = exercises[i];
        if (e.exercise === o.value) {
          return true;
        }
      }
      return false;
    });
    let idMap;
    if (type !== "Anaerobic") {
      idMap = exerciseData.map((x) => ({ ref: x.id }));
    } else {
      idMap = exerciseData.map((x, idx) => ({
        ref: x.id,
        sets: exercises[idx].sets ? parseInt(exercises[idx].sets) : 1,
      }));
    }
    console.log(idMap);
    WorkoutDiaryService.postWorkout({ name, description, idMap, type }).then(
      (val) => {
        console.log("New workout created:", val);
        setVisible(false);
        setAvailableWorkouts([
          ...availableWorkouts,
          { name, description, exercises: idMap, type },
        ]);
      }
    );
  };

  const onTypeChange = (val) => {
    if (val) {
      //True = cardio
      setType("Aerobic");
    } else {
      //False = weights
      setType("Anaerobic");
    }
  };

  useEffect(() => {
    WorkoutDiaryService.getExercises().then((val) => {
      let data = [];
      val.forEach((x) => {
        data.push({ value: x.exercise, id: x._id, type: x.exerciseType });
      });
      setOptions(data);
    });
  }, []);

  const onExerciseChange = (e) => {
    console.log(e);
    let exerciseType = options.filter((o) => e === o.value);
    console.log(exerciseType);
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ minWidth: "50%" }}>
      <Form.Item 
        name="name" label="Name" 
        rules={[
          { required: true, message: "Enter a name!" },
          {
            type: "string",
            message: "Please input a valid name!",
          },
        ]} 
      >
        <Input className="rounded-corners" placeholder="New Workout..." />
      </Form.Item>
      <Form.Item 
        name="description" 
        label="Description"
        rules={[
          {
            type: "string",
            message: "Please input a valid description!",
          },
        ]}
      >
        <TextArea rows={4} className="rounded-corners" />
      </Form.Item>
      <Form.Item name="type" label="Type">
        <Switch
          checkedChildren="Cardio"
          unCheckedChildren="Weight"
          defaultChecked
          onChange={onTypeChange}
        />
      </Form.Item>
      <Form.List name="exercises">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field, index) => (
                <div
                  key={field.key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                    justifyContent: "space-around",
                    padding: "0.25rem",
                  }}
                >
                  <Form.Item
                    {...field}
                    name={[field.name, "exercise"]}
                    fieldKey={[field.fieldKey, "exercise"]}
                    label={"Exercise " + (index + 1).toString()}
                    style={{ flexGrow: 2 }}
                    rules={[{ required: true, message: 'Missing exercise!' }]}
                  >
                    <AutoComplete
                      options={options.filter((o) => o.type === type)}
                      className="inv-font rounded-corners"
                      placeholder="Search exercise..."
                      filterOption={(inputValue, option) =>
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                      onChange={onExerciseChange}
                    />
                  </Form.Item>
                  {type === "Anaerobic" && (
                    <>
                      <Form.Item
                        {...field}
                        name={[field.name, "sets"]}
                        fieldKey={[field.fieldKey, "sets"]}
                        label={"Sets"}
                        style={{
                          flexGrow: 1,
                          maxWidth: "20%",
                          padding: "0rem 0.25rem",
                        }}
                        rules={[
                          { required: true, message: 'Missing sets!' },
                          {type:"integer", message:"Please enter a valid number!"}
                        ]}
                      >
                        <InputNumber
                            className="inv-font rounded-corners"
                            defaultValue={1}
                            style={{width: "100%"}}
                          />
                      </Form.Item>
                    </>
                  )}

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add exercise
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <Form.Item>
        <div className="text-center">
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
