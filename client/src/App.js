import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import FoodDiary from "./components/FoodDiary";
import WorkoutDiary from "./components/WorkoutDiary";
import NewDiaryEntry from "./components/NewDiaryEntry";
import EditDiaryEntry from "./components/EditDiaryEntry";
import Goals from "./components/Goals";
import WorkoutSession from "./components/WorkoutSession";
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
    <Router>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          component={HomeView}
          roles={["user", "admin"]}
          diaryContext
        />
        <PrivateRoute
          exact
          path="/diary"
          component={FoodDiaryView}
          roles={["user", "admin"]}
          diaryContext
        />
        <PrivateRoute
          exact
          path="/diary/new/:type"
          component={NewFoodDiaryEntryView}
          roles={["user", "admin"]}
          diaryContext
        />
        <PrivateRoute
          exact
          path="/diary/edit"
          component={EditFoodDiaryEntryView}
          roles={["user", "admin"]}
          diaryContext
        />
        <PrivateRoute
          exact
          path="/workout"
          component={WorkoutView}
          roles={["user", "admin"]}
          diaryContext
        />
        <PrivateRoute
          exact
          path="/goals"
          component={GoalsView}
          roles={["user", "admin"]}
          diaryContext
        />
        <PrivateRoute
          exact
          path="/workout/session/"
          component={WorkoutSessionView}
          roles={["user", "admin"]}
          diaryContext
        />
        <UnPrivateRoute exact path="/login" component={Login} />
        <UnPrivateRoute exact path="/register" component={Register} />
      </Switch>
    </Router>
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
    <WorkoutDiary></WorkoutDiary>
  </Model>
);

const GoalsView = () => (
  <Model>
    <Goals></Goals>
  </Model>
);

const WorkoutSessionView = () => (
  <Model gradient>
    <WorkoutSession></WorkoutSession>
  </Model>
);

const NewFoodDiaryEntryView = () => <NewDiaryEntry mode="food"></NewDiaryEntry>;

const EditFoodDiaryEntryView = () => (
  <EditDiaryEntry mode="food"></EditDiaryEntry>
);

const NewWorkoutDiaryEntryView = () => (
  <NewDiaryEntry mode="exercise"></NewDiaryEntry>
);

const EditWorkoutDiaryEntryView = () => (
  <EditDiaryEntry mode="exercise"></EditDiaryEntry>
);

export default App;
