import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import FoodDiary from "./components/FoodDiary";
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
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={HomeView}
            roles={["user", "admin"]}
          />
          <PrivateRoute
            exact
            path="/diary"
            component={FoodDiaryView}
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
        </Switch>
      </Router>
    </div>
  );
}

const HomeView = () => (
  <Model>
    <Home></Home>
  </Model>
);
const FoodDiaryView = () => (
  <Model>
    <FoodDiary></FoodDiary>
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
