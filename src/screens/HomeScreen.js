import {  Text, View, StatusBar, StyleSheet, SafeAreaView } from "react-native";
import MealModal from '../components/home/MealModal';
import MealCarousel from '../components/home/MealCarousel';
import MealList from '../components/home/MealList';
import { getMeals } from '../utils/apis/api';
import { useEffect, useState, useContext } from 'react';
import { LogInScreenContext } from "../contexts/LogInScreenContext.jsx";

const HomeScreen = ({navigation, authToken}) => {
  const [meals, setMeals] = useState([]);
  const [mealSelection, setMealSelection] = useState(null);
  const { userInitData } = useContext(LogInScreenContext);

  const handleSelectMeal = (meal) => {
    setMealSelection(meal);
  };

  const fetchMeals = async () => {
    try {
      console.log('token:', userInitData.token);
      let response = await getMeals(userInitData.token);
      setMeals(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(userInitData);
    fetchMeals();
  }, []);

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 items-center justify-between">
        <MealModal mealSelection={mealSelection} handleSelectMeal={handleSelectMeal} />
        <MealCarousel meals={meals} handleSelectMeal={handleSelectMeal} />
        <MealList meals={meals} handleSelectMeal={handleSelectMeal} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;