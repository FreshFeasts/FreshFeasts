import {  Text, View, StatusBar, StyleSheet, SafeAreaView } from "react-native";
import MealModal from '../components/home/MealModal';
import MealCarousel from '../components/home/MealCarousel';
import MealList from '../components/home/MealList';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HomeScreen = ({navigation, authToken}) => {
  const [meals, setMeals] = useState([]);
  const [mealSelection, setMealSelection] = useState(null);

  const handleSelectMeal = (meal) => {
    setMealSelection(meal);
  };

  useEffect(() => {}, []);

  const fetchMeals = async () => {
    try {
      let response = await axios.get('http://localhost:3000/api/meals?count=10', { headers: { "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM5NmRiMzIzYmZjYmQ0YTcxNTkyMDkiLCJlbWFpbCI6IkVuaWQuSm9obnNAeWFob28uY29tIiwiaWF0IjoxNjkwOTI2NTcxfQ.qNQaXsXDKeLU7CFuAVGIS9sdgLVEuyxBtxTGySaUsII' }});
      setMeals(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
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