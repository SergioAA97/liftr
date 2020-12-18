import React, { useContext } from "react";
import { Menu, Dropdown, Card, Row, Col, Space, Carousel } from "antd";
import CustomIcon from "./utils/CustomIcon";
import { BlockCard } from "./utils/Layout-Components";
import { Link } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";
import Article from "./Article";

import articles from "../articles/articles.json";
import Title from "antd/lib/typography/Title";

// import blackWhiteCurlImg from "../img/static/articles/Black-white-curl.jpg";
// import curlSeatedImg from "../img/static/articles/Curl-seated-color.jpg";

export default function Home() {
  const diaryContext = useContext(DiaryContext);

  const { biometrics, foodStats, previousSessions } = diaryContext;

  return (
    <div>
      {" "}
      <TodaysStats
        caloriesConsumed={foodStats.energy}
        previousSessions={previousSessions}
        currentWeight={biometrics.weight}
      />
      <NewsFeed articles={articles} />
    </div>
  );
}

const TodaysStats = ({ caloriesConsumed, previousSessions, currentWeight }) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  let totalMinutesExercise = 0;
  if (previousSessions) {
    if (Array.isArray(previousSessions)) {
      previousSessions.forEach((x) => {
        const timeStart = new Date(x.timeStart);
        const timeEnd = new Date(x.timeEnd);

        let sDur = (timeEnd.getTime() - timeStart.getTime()) / 60000;
        if (timeStart.getTime() >= start && timeEnd.getTime() <= end) {
          totalMinutesExercise += sDur;
        }
      });
    }
  }

  return (
    <BlockCard title="Today´s stats">
      <CustomIcon
        text={Math.round(caloriesConsumed)}
        subText="kcal consumed"
        block
        foodIcon
      ></CustomIcon>
      <CustomIcon
        text={currentWeight + " kg"}
        subText="current weight"
        block
        scaleIcon
      ></CustomIcon>
      <CustomIcon
        text={
          new Intl.NumberFormat().format(totalMinutesExercise.toFixed(2)) +
          " min"
        }
        subText="exercise today"
        block
        watchIcon
      ></CustomIcon>
    </BlockCard>
  );
};

const NewsFeed = ({ articles = [{}] }) => {
  return (
    <div className="text-center inf-font">
      <Title level={3} className="mb-2">
        <b>News Feed</b>
      </Title>
      <Row justify="space-around" align="top" className="gradient-primary">
        <Col xs={24} sm={24} md={16} style={{ margin: "2rem 0rem" }}>
          <Carousel autoplay dotPosition="bottom">
            {articles.map((x, idx) => (
              <div
                key={idx}
                style={{ padding: "2rem 1rem" }}
                className="gradient-primary"
              >
                <Article
                  title={x.title}
                  description={x.description}
                  img={x.img}
                  author={x.author}
                  date={x.date}
                  avatar={1}
                  link={x.link}
                />
              </div>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>
  );
};

const AddFoodOverlay = (
  <Menu className="inv-font li-hover">
    <Menu.Item>
      <Link to="/diary/new/breakfast">Breakfast</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/diary/new/lunch">Lunch</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/diary/new/dinner">Dinner</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/diary/new/snack">Snack</Link>
    </Menu.Item>
  </Menu>
);
