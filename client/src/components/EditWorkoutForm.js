import React, { useEffect, useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import WorkoutDiaryService from "../service/WorkoutDiaryService";
import { Form, Input, Button, Space, AutoComplete, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export default function EditWorkoutForm(props) {
  const [options, setOptions] = useState(null);
  const [type, setType] = useState("Aerobic");
  const history = useHistory();

  const [form] = Form.useForm();

  const diaryContext = useContext(DiaryContext);

  const { availableWorkouts, setAvailableWorkouts } = diaryContext;

  const { workout } = props;
  const { _id, name, description, exercises } = workout;

  useEffect(() => {
    WorkoutDiaryService.getExercises().then((val) => {
      let data = [];
      val.forEach((x) => {
        data.push({ value: x.exercise, id: x._id, type: x.exerciseType });
      });
      setOptions(data);
      setType(workout.type);
    });
  }, [workout.type]);

  useEffect(() => {
    form.resetFields();
    console.log("Reset form!");
  }, [props.workout]);

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

    WorkoutDiaryService.postWorkout({
      _id,
      name,
      description,
      idMap,
      type,
    }).then((val) => {
      let update = [...availableWorkouts];
      update = update.filter((x) => x.name !== name);

      update.push({
        _id,
        name,
        description,
        exercises: exercises,
        type,
      });
      console.log(update);
      setAvailableWorkouts(update);
      props.setInvisible();
    });
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

  const onExerciseChange = (e) => {
    console.log(e);
    let exerciseType = options.filter((o) => e === o.value);
    console.log(exerciseType);
  };

  let exercisesListFields = exercises.map((x) => {
    if (!x.hasOwnProperty("ref")) {
      return x;
    } else {
      if (x.hasOwnProperty("sets")) {
        //Anaerobic
        return { exercise: x.ref.exercise, sets: x.sets };
      } else {
        //Aerobic
        return { exercise: x.ref.exercise };
      }
    }
  });

  let initialValues = {
    name,
    description,
    type: type === "Aerobic" ? true : false,
    exercises: exercisesListFields,
  };
  if (Array.isArray(options)) {
    return (
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{ minWidth: "50%" }}
        initialValues={initialValues}
        form={form}
      >
        <Form.Item name="name" label="Name">
          <Input className="rounded-corners" defaultValue={name} />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea
            rows={4}
            className="rounded-corners"
            defaultValue={description}
          />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Switch
            checkedChildren="Cardio"
            unCheckedChildren="Weight"
            onChange={onTypeChange}
            checked={type === "Aerobic" ? true : false}
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
                      // rules={[{ required: true, message: 'Missing first name' }]}
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
                          // rules={[{ required: true, message: 'Missing first name' }]}
                        >
                          <Input
                            className="inv-font rounded-corners"
                            defaultValue={1}
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
              Done
            </Button>
          </div>
        </Form.Item>
      </Form>
    );
  } else {
    return <></>;
  }
}
