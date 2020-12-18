import { Col, Row } from "antd";
import React, { createContext, useState, useEffect, useContext } from "react";
import Spinner from "../components/utils/Spinner.js";
import FoodDiaryService from "../service/FoodDiaryService.js";
import GoalService from "../service/GoalService.js";
import UtilService from "../service/UtilService.js";
import WorkoutDiaryService from "../service/WorkoutDiaryService.js";

export const DiaryContext = createContext();

export default ({ children }) => {
  const [foodEntries, setFoodEntries] = useState([{}]);
  const [foodStats, setFoodStats] = useState(null);
  const [exerEntries, setExerEntries] = useState([{}]);
  const [exerStats, setExerStats] = useState(null);
  const [workoutProgram, setWorkoutProgram] = useState({ name: "Workout 1" });
  const [availableWorkouts, setAvailableWorkouts] = useState();
  const [previousSessions, setPreviousSessions] = useState();
  const [goals, setGoals] = useState();
  const [customGoals, setCustomGoals] = useState();
  const [biometrics, setBiometrics] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const calculateItemEnergy = (entries) => {
    entries.forEach(
      (x) => (x.item.energy = x.item.ref.energy * (x.item.quantity / 100))
    );
  };

  const fetchFoodEntries = () => {
    return FoodDiaryService.getToday().then((data) => {
      let foodEntries = data.entries;
      // console.log(data);
      if (foodEntries) {
        calculateItemEnergy(foodEntries);
        var statObj = {
          protein: 0,
          carbs: 0,
          fat: 0,
          energy: 0,
        };

        data.entries.map((y, index) => {
          let { quantity, ref } = y.item;
          let itemEnergy = ref.energy * (quantity / 100);

          statObj = {
            ...statObj,
            energy: parseFloat(statObj.energy) + parseFloat(itemEnergy),
            protein:
              parseFloat(statObj.protein) +
              parseFloat(y.item.ref.protein * (y.item.quantity / 100)),
            fat:
              parseFloat(statObj.fat) +
              parseFloat(y.item.ref.fat * (y.item.quantity / 100)),
            carbs:
              parseFloat(statObj.carbs) +
              parseFloat(y.item.ref.carbohydrate * (y.item.quantity / 100)),
          };
        });

        setFoodStats(statObj);
        setFoodEntries(foodEntries);
        return [statObj, foodEntries];
      } else {
        setFoodStats({});
        setFoodEntries([]);
      }
    });
  };

  const fetchWorkouts = () => {
    return WorkoutDiaryService.getAll().then((data) => {
      // console.log(data);
      setAvailableWorkouts(data.workouts);
      setPreviousSessions(data.sessions);
      return [data.workouts, data.sessions];
    });
  };

  const fetchGoals = () => {
    return GoalService.getAll().then((data) => {
      // console.log(data);
      setGoals(data.goals);

      setCustomGoals(data.customGoals);
      return [data.goals, data.customGoals];
    });
  };

  const fetchBiometrics = () => {
    return UtilService.getUserSettings().then(({ data }) => {
      setBiometrics(data);
    });
  };

  const refreshEntries = () => {
    fetchAll();
  };

  const fetchAll = () => {
    fetchWorkouts().then((w) => {
      fetchFoodEntries().then((e) => {
        fetchGoals().then((g) => {
          return fetchBiometrics().then((b) => {
            console.log("Data Loaded!");
            setIsLoaded(true);
          });
        });
      });
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (foodEntries && isLoaded) {
    return (
      <div>
        {!isLoaded ? (
          <Row
            justify="center"
            className="text-center"
            align="middle"
            style={{ height: "100vh" }}
          >
            <Col xs={24} md={8} xl={4}>
              <Spinner />
            </Col>
          </Row>
        ) : (
          <DiaryContext.Provider
            value={{
              foodEntries,
              setFoodEntries,
              foodStats,
              setFoodStats,
              refreshEntries,
              exerEntries,
              setExerEntries,
              exerStats,
              setExerStats,
              workoutProgram,
              setWorkoutProgram,
              availableWorkouts,
              setAvailableWorkouts,
              previousSessions,
              setPreviousSessions,
              goals,
              setGoals,
              customGoals,
              setCustomGoals,
              biometrics,
              setBiometrics,
            }}
          >
            {children}
          </DiaryContext.Provider>
        )}
      </div>
    );
  } else {
    return false;
  }
};
