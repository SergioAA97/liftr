import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import WorkoutDiaryService from "../service/WorkoutDiaryService"
import { Form, Input, Button, Space, AutoComplete, Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function NewWorkoutForm() {
    const [options, setOptions] = useState(null);
    const [type, setType] = useState("Cardio");
    const history = useHistory();

    const onFinish = values => {
        console.log('Received values of form:', values, "Type:", type);
        const { name, description, exercises } = values;
        let exerciseData = options.filter(o => {
            for (let i = 0; i < exercises.length; i++) {
                const e = exercises[i];
                if (e.exercise === o.value) {
                    return true;
                }
            }
            return false;
        })
        const idMap = exerciseData.map(x => x.id);
        WorkoutDiaryService.postWorkout({name, description, idMap, type}).then(val => {
            console.log("New workout created:", val);
            history.go(0);
        });
    };

    const onTypeChange = (val) => {
        if(val){
            //True = cardio
            setType("Cardio")
        }else{
            //False = weights
            setType("Weight")
        }
    }

    useEffect(() => {
        WorkoutDiaryService.getExercises().then(val => {
            let data = [];
            val.forEach(x => {
                data.push({ value: x.exercise, id: x._id });
            });
            setOptions(data);
        })
    }, [])

    return (
        <Form layout="horizontal" onFinish={onFinish} style={{ minWidth: "50%" }}>
            <Form.Item name="name" label="Name">
                <Input className="rounded-corners" placeholder="New Workout..." />
            </Form.Item>
            <Form.Item name="description" label="Description">
                <TextArea rows={4} className="rounded-corners" />
            </Form.Item>
            <Form.Item name="type" label="Type">
                <Switch checkedChildren="Cardio" unCheckedChildren="Weight" defaultChecked onChange={onTypeChange} />
            </Form.Item>
            <Form.List name="exercises">
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {fields.map((field, index) => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...field}
                                        style={{ minWidth: "45vw" }}
                                        name={[field.name, 'exercise']}
                                        fieldKey={[field.fieldKey, 'exercise']}
                                        label={"Exercise " + (index + 1).toString()}
                                    // rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <AutoComplete
                                            options={options}
                                            className="inv-font rounded-corners"
                                            placeholder="Search exercise..."
                                            filterOption={(inputValue, option) =>
                                                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                            }
                                        />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add exercise
                                </Button>
                            </Form.Item>
                        </>
                    )
                }}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
        </Button>
            </Form.Item>
        </Form>
    );
}
