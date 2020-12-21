import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Input,
  Empty,
  Form,
  Button,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { DiaryContext } from "../context/DiaryContext";
import FoodDiaryService from "../service/FoodDiaryService";
import { useHistory, useLocation } from "react-router-dom";
import UtilService from "../service/UtilService";

const { Title } = Typography;

export default function EditDiaryEntry(props) {
  const [entry, setEntry] = useState(null);
  const [empty, setEmpty] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!entry) {
      FoodDiaryService.getEntry(state.id, (x) => {
        if (x) {
          if (x.msg) {
            if (x.msg.msgError) {
              setEmpty(true);
            }
          }
          if (typeof x.entry === "object") {
            if (x.entry.length === 1) {
              setEntry(x.entry[0]);
            }
          }
        } else {
          setEmpty(true);
        }
      });
    }
  });

  const deleteEntry = () => {
    FoodDiaryService.deleteEntry(entry._id).then(() => {

      history.push("/diary")
    });
  };

  const goBack = () => {
    history.push("/diary");
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ margin: "2rem 2rem" }}
        shape="circle"
        icon={
          <ArrowLeftOutlined
            style={{ width: "100%", height: "100%", color: "white" }}
          />
        }
        onClick={goBack}
      />
      <Row style={{ marginTop: "2rem" }}>
        <Col
          xs={{ span: 20, offset: 2 }}
          md={{ span: 16, offset: 4 }}
          lg={{ span: 10, offset: 6 }}
        >
          <Row
            align="middle"
            justify="space-around"
            tyle={{ marginBottom: "2rem" }}
          >
            <Col flex="auto">
              <Title style={{ marginBottom: 0 }}>Edit Entry</Title>
            </Col>
            <Col flex="40px">
              <Button
                danger
                type="primary"
                shape="circle"
                icon={
                  <DeleteFilled
                    style={{ width: "100%", height: "100%", color: "white" }}
                  />
                }
                onClick={deleteEntry}
              />
            </Col>
          </Row>
          {entry && !empty && (
            <EntryForm
              food={entry.item.ref}
              quantity={entry.item.quantity}
              entry={entry}
            />
          )}
          {empty && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </Col>
      </Row>
    </div>
  );
}

const EntryForm = ({ food, quantity, entry }) => {
  let nutrients = UtilService.initializeNutrients(food);
  const diaryContext = useContext(DiaryContext);
  let history = useHistory();
  let initalValues = {
    quantity,
  };

  const onFinish = (data, entry) => {
    const { quantity } = data;
    entry.item.quantity = quantity;
    FoodDiaryService.postEntry(entry).then(() => {
      diaryContext.refreshEntries();
      history.push("/diary")
    });
  };

  return (
    <>
      <Form
        onFinish={(data) => onFinish(data, entry)}
        initialValues={initalValues}
      >
        <b>Quantity</b>
        <Form.Item
          name="quantity"
          rules={[{ required: true, message: "Please enter a quantity!" }]}
        >
          <Input addonAfter="(g)" />
        </Form.Item>
        <Row>
          <Col flex={2}>
            <b>Name: </b>
            {food.description}
          </Col>
          <Col style={{ textAlign: "right" }} flex={3}>
            <b>Brand: </b>
            {food.brandOwner ? food.brandOwner : "N/A"}
          </Col>
        </Row>
        {nutrients.map(({ name, unit, value }) => (
          <div key={name}>
            <b>{UtilService.capitalize(name)}</b> - {value} ({unit})
          </div>
        ))}
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          icon={<CheckOutlined />}
        >
          Done
        </Button>
      </Form>
    </>
  );
};
