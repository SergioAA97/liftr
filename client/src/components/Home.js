import React, { useContext } from "react";
import { Row, Col, Carousel } from "antd";
import CustomIcon from "./utils/CustomIcon";
import { BlockCard } from "./utils/Layout-Components";
import { DiaryContext } from "../context/DiaryContext";
import Article from "./Article";

import articles from "../articles/articles.json";
import Title from "antd/lib/typography/Title";

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
    <div className="text-center">
      <Title level={3} style={{marginBottom: "0.5rem"}}>
        <b>News Feed</b>
      </Title>
      <Row justify="space-around" align="top" >
        <Col xs={24} sm={24} md={24} lg={16} style={{ margin: "0.5rem 0rem" }}>
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

