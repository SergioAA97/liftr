import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Diary from "./components/Diary";
import NewDiaryEntry from "./components/NewDiaryEntry";
import Workout from "./components/Workout";
import Goals from "./components/Goals";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import Model from "./components/utils/Model";

import "antd/dist/antd.less";
import "./App.less";

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  return (
    <div className="bk-solid">
      <Router>
        <PrivateRoute
          exact
          path="/"
          component={HomeView}
          roles={["user", "admin"]}
        />
        <PrivateRoute
          exact
          path="/diary"
          component={DiaryView}
          roles={["user", "admin"]}
        />
        <PrivateRoute
          exact
          path="/diary/new/:type"
          component={NewDiaryEntryView}
          roles={["user", "admin"]}
        />
        <PrivateRoute
          exact
          path="/workout"
          component={WorkoutView}
          roles={["user", "admin"]}
        />
        <PrivateRoute
          exact
          path="/goals"
          component={GoalsView}
          roles={["user", "admin"]}
        />
        <UnPrivateRoute exact path="/login" component={Login} />
        <UnPrivateRoute exact path="/register" component={Register} />
      </Router>
    </div>
  );
}

const HomeView = () => (
  <Model>
    <Home></Home>
  </Model>
);
const DiaryView = () => (
  <Model>
    <Diary></Diary>
  </Model>
);
const WorkoutView = () => (
  <Model>
    <Workout></Workout>
  </Model>
);

const GoalsView = () => (
  <Model>
    <Goals></Goals>
  </Model>
);

const NewDiaryEntryView = () => <NewDiaryEntry></NewDiaryEntry>;
export default App;
