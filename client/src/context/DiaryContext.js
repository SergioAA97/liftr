import React, { createContext, useState, useEffect } from "react";
import FoodDiaryService from "../service/FoodDiaryService.js";
import GoalService from "../service/GoalService.js";
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
          energyGoal: 2400,
          protein: 0,
          proteinGoal: 180,
          carbs: 0,
          carbsGoal: 200,
          fat: 0,
          fatGoal: 75,
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
      } else {
        setFoodStats({});
        setFoodEntries([]);
      }
    });
  };

  const fetchWorkouts = () => {
    return WorkoutDiaryService.getAll().then((data) => {
      console.log(data);
      setAvailableWorkouts(data.workouts);
      setPreviousSessions(data.sessions);
    });
  };

  const fetchGoals = () => {
    return GoalService.getAll().then((data) => {
      console.log(data);
      setGoals(data.goals);
      setCustomGoals(data.customGoals);
    });
  };

  const refreshEntries = () => {
    fetchAll();
  };

  const fetchAll = () => {
    fetchWorkouts()
      .then((val) => {
        fetchFoodEntries().then(() =>{
          return fetchGoals();
        });
      })
      .then((val) => {
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  if (foodEntries && isLoaded) {
    return (
      <div>
        {!isLoaded ? (
          <>Loading</>
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
