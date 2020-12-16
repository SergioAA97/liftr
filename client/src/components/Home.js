import React, { useContext } from "react";
import { Menu, Dropdown } from "antd";
import CustomIcon from "./utils/CustomIcon";
import { BlockCard } from "./utils/Layout-Components";
import { Link } from "react-router-dom";
import { DiaryContext } from "../context/DiaryContext";

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
      <QuickActions />
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

const QuickActions = (props) => {
  const iconStyle = { color: "white", cursor: "pointer" };
  const textStyle = { color: "white", fontWeight: 800, fontSize: "" };
  return (
    <BlockCard title="Quick Actions" inv>
      <Link to="/workout">
        <CustomIcon text="New Workout" workoutIcon inv></CustomIcon>
      </Link>
      <Dropdown overlay={AddFoodOverlay} className="pointer-cursor">
        <CustomIcon text="Add Food" drumStickIcon inv></CustomIcon>
      </Dropdown>
      <Link to="/">
        <CustomIcon text="Add Goal" goalIcon inv></CustomIcon>
      </Link>
    </BlockCard>
  );
};

const NewsFeed = () => {};

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
