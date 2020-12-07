import React, { useContext } from "react";
import { Menu, Dropdown } from "antd";
// import { DownOutlined } from '@ant-design/icons';
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
    <CustomIcon text="1000" subText="kcal consumed" block foodIcon></CustomIcon>
    <CustomIcon text="66" subText="min" block runningIcon></CustomIcon>
    <CustomIcon text="10.000" subText="steps" block stepsIcon></CustomIcon>
  </BlockCard>
);

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
