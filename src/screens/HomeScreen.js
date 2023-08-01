import {  Text, View, StatusBar, StyleSheet } from "react-native";
import MealModal from '../components/home/MealModal';
import MealCarousel from '../components/home/MealCarousel';
import axios from 'axios';
import { useEffect, useState } from 'react';

const HomeScreen = ({navigation, authToken}) => {
  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/meals?count=10', { headers: { "Authorization" : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM5NmRiMzIzYmZjYmQ0YTcxNTkyMDkiLCJlbWFpbCI6IkVuaWQuSm9obnNAeWFob28uY29tIiwiaWF0IjoxNjkwOTI2NTcxfQ.qNQaXsXDKeLU7CFuAVGIS9sdgLVEuyxBtxTGySaUsII' }}).
      then((response) => {
        setMealList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);


  return (
    <>
    <View className="flex-1 items-center justify-center">
      <Text className="font-main" >This is the home page</Text>
      <MealModal />
      <MealCarousel mealList={mealList} />
    </View>
    </>
  );
};
export default HomeScreen;




