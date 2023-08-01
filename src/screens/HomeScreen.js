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
    console.log("CLICKED!", meal);
    setMealSelection(meal);
  };

  useEffect(() => {}, []);

  const fetchMeals = async () => {
    try {
      let response = await axios.get('http://localhost:3000/api/meals?count=10', { headers: { "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM3ZjZkMGU5N2M0MmNkMDA4ZjY0NjciLCJlbWFpbCI6IktlbmRhbGwzQGhvdG1haWwuY29tIiwiaWF0IjoxNjkwOTIzNzU5LCJleHAiOjE2OTEwMTAxNTl9.xEqBccd7KVjC_vI5GNurcAdQ5NUHDKF4wE7AvxD_liM` }});
      console.log(response);
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
        <MealModal mealSelection={mealSelection} />
        <MealCarousel meals={meals} />
        <MealList meals={meals} handleSelectMeal={handleSelectMeal} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;