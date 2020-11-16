import React, { useContext } from "react";
import { Row, Col } from "antd";
import CustomIcon from "./utils/CustomIcon";
import { BlockCard } from "./utils/Layout-Components";
import { Link } from "react-router-dom";

export default function Home() {
  

  return (
    <div>
      {" "}
      <TodaysStats />
      <QuickActions />
    </div>
  );
}

const TodaysStats = (props) => (
  <BlockCard title="Today´s stats">
    <CustomIcon text="1000" subText="kcal" foodIcon></CustomIcon>
    <CustomIcon text="66" subText="min" runningIcon></CustomIcon>
    <CustomIcon text="10.000" subText="steps" stepsIcon></CustomIcon>
  </BlockCard>
);

const QuickActions = (props) => {
  const iconStyle = { color: "white", cursor: "pointer" };
  const textStyle = { color: "white", fontWeight: 800, fontSize: "" };
  return (
    <BlockCard title="Quick Actions" inv>
      <Link to="/">
        <CustomIcon text="New Workout" workoutIcon inv></CustomIcon>
      </Link>
      <Link to="/">
        <CustomIcon text="Add Food" drumStickIcon inv></CustomIcon>
      </Link>
      <Link to="/">
        <CustomIcon text="Add Goal" goalIcon inv></CustomIcon>
      </Link>
    </BlockCard>
  );
};

const NewsFeed = () => {};
