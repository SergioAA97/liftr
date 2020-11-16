import React, { useContext, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Card,
  Input,
  Space,
  Divider,
  Empty,
  Descriptions,
  Form,
  Button,
  Select,
} from "antd";
import { PlusOutlined, ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import DiaryService from "../service/DiaryService";
import { useHistory, useParams } from "react-router-dom";
import UtilService from "../service/UtilService"

const { Title } = Typography;
const { Option } = Select;
const { Search } = Input;

export default function NewDiaryEntry(props) {
  const authContext = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [food, setFood] = useState(null);
  const [empty, setEmpty] = useState(false);
  const history = useHistory();

  const onFoodChange = (data) => {
    setValue(data);
  };

  const SearchFood = (searchText) => {
    DiaryService.foodSearch({ query: searchText }).then((res) => {
      if (res.length === 0) setEmpty(true);
      else setEmpty(false);
      return setData(res);
    });
  };

  const onFoodSearch = (searchText) => {
    if (searchText) {
      SearchFood(searchText);
    } else {
      setData([]);
    }
  };

  const onFoodClick = (food) => {
    setFood(food);
  };

  const goBack = () => {
    history.push("/diary");
  };

  return (
    <div>
      <Button
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
          <Title>New Entry</Title>
          {!food && (
            <>
              <FoodSearch
                value={value}
                data={data}
                onSearch={onFoodSearch}
                onChange={onFoodChange}
              />
              <Divider plain>Results</Divider>
              {data.length === 0 && empty && (
                <Empty
                  style={{ color: "white" }}
                  description={<>No results</>}
                />
              )}
              {data.length > 0 && (
                <FoodResults data={data} onFoodClick={onFoodClick} />
              )}
            </>
          )}
          {food && <EntryForm food={food} />}
        </Col>
      </Row>
    </div>
  );
}

const EntryForm = ({ food }) => {

  let nutrients = UtilService.initializeNutrients(food)
  console.log(nutrients)


  let { type } = useParams();
  let history = useHistory();

  const onFinish = (data) => {
    const {quantity} = data;
    let entry = {
      type,
      created: Date.now(),
      lastModified: Date.now(),
      item: {
        ref: food._id,
        quantity
      }
    }
    DiaryService.postEntry(entry).then(history.push("/diary"));
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <b>Quantity</b>
        <Form.Item
        name="quantity"
        rules={[{ required: true, message: "Please enter a quantity!" }]}
      >
        <Input addonAfter="(g)" placeholder="0" />
        </Form.Item>
        <Row>
          <Col flex={2}>
            <b>Name: </b>
            {food.description}
          </Col>
          <Col style={{ textAlign: "right" }} flex={3}>
            <b>Brand: </b>
            {(food.brandOwner) ? food.brandOwner : "N/A"}
          </Col>
        </Row>
        {nutrients.map(({name,unit,value}) => (<div>
            <b>{UtilService.capitalize(name)}</b> - {value} ({unit})
          </div>)
        )}
        <Button type="primary" shape="round" htmlType="submit" icon={<CheckOutlined />} >
          Done
        </Button>
      </Form>
    </>
  );
};

const FoodResults = ({ data, onFoodClick }) => {
  let key = 0;
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        {data.map((item) => {
          const energy = item.energy;

          return (
            <Card
              bordered={false}
              key={key++}
              actions={[<PlusOutlined onClick={() => onFoodClick(item)} />]}
              className="inv-font"
            >
              <Row>
                <Col span={16}>
                  <p style={{ marginBottom: "0.2rem" }}>
                    <b>{item.description}</b>
                  </p>
                  <p>{item.brandOwner}</p>
                </Col>
                <Col span={8} style={{ textAlign: "right" }}>
                  <p style={{ marginBottom: "0.2rem" }}>
                    {energy} - {"kcal"}
                  </p>
                  <p>(100 - g)</p>
                </Col>
              </Row>
            </Card>
          );
        })}
      </Space>
    </>
  );
};

const FoodSearch = ({ onSearch, onChange }) => {
  return (
    <Search
      placeholder="Input food name"
      onChange={onChange}
      onSearch={onSearch}
      className="inv-font"
    />
  );
};
