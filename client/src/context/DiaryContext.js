import React, { createContext, useState, useEffect } from "react";
import FoodDiaryService from "../service/FoodDiaryService.js";

export const DiaryContext = createContext();

export default ({ children }) => {
    const [foodEntries, setFoodEntries] = useState(null);
    const [stats, setStats] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const calculateItemEnergy = (entries) => {
        entries.forEach( x => x.item.energy = x.item.ref.energy * (x.item.quantity / 100))
    }

    const fetchEntries = () => {
        FoodDiaryService.getToday().then((data) => {
            let foodEntries = data.entries;

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
                    let {quantity, ref} = y.item;
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

                setStats(statObj);
                setFoodEntries(foodEntries);
                setIsLoaded(true);
            }else{
                setStats({})
                setFoodEntries({})
                setIsLoaded(true);
            }

        });
    }

    const refreshEntries = () => {
        fetchEntries();
    }

    useEffect(() => {
        fetchEntries();
    }, []);

    if(foodEntries && isLoaded){
        return (
            <div>
                {!isLoaded ? (
                    <>Loading</>
                ) : (
                        <DiaryContext.Provider
                            value={{ foodEntries, setFoodEntries, stats, setStats, refreshEntries }}
                        >
                            {children}
                        </DiaryContext.Provider>
                    )}
            </div>
        );
    }else{
        return false
    }

};
