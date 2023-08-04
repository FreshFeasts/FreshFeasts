import {  Text, View, StatusBar, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import MealModal from '../components/home/MealModal';
import MealCarousel from '../components/home/MealCarousel';
import MealList from '../components/home/MealList';
import { getMeals } from '../utils/apis/api';
import { useEffect, useState, useContext } from 'react';
import { LogInScreenContext } from "../contexts/LogInScreenContext.jsx";

const HomeScreen = ({ navigation, authToken }) => {
  const [meals, setMeals] = useState();
  const [mealSelection, setMealSelection] = useState(null);
  const { userInitData } = useContext(LogInScreenContext);

  const handleSelectMeal = (meal) => {
    setMealSelection(meal);
  };

  const fetchMeals = async () => {
    try {
      console.log("userInitData", userInitData);
      let response = await getMeals(userInitData.token);
      console.log(response);
      setMeals(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  if (meals) {
    return (
      <SafeAreaView className="h-full">
        <ScrollView className="flex-1">
          <MealModal mealSelection={mealSelection} handleSelectMeal={handleSelectMeal} />
          <MealCarousel meals={meals} handleSelectMeal={handleSelectMeal} />
          <MealList meals={meals} user={userInitData.user} handleSelectMeal={handleSelectMeal} />
        </ScrollView>
      </SafeAreaView>
    );
  }
  return null;
};

export default HomeScreen;
