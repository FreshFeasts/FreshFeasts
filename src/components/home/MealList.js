import {  Text, View, StatusBar, ScrollView, Pressable } from "react-native";
import React from 'react';

import MealListCard from './MealListCard';
import { user, meals } from './mealListData.js'; // remove once connected to API

const { useState, useEffect } = React;

const MealList = ({/* meals, userData */}) => { // add meals and user data once connected to API
  const [sortOption, setSortOption] = useState('rating');
  const [filterOption, setFilterOption] = useState(['alergies', 'diets']);
  const [finalMeals, setFinalMeals] = useState([]);

  const getRating = (meal) => {
    let sum = 0;
    for (let i = 1; i < 6; i++) {
      sum += (meal.ratings[i] * i);
    }
    let average = (sum / meal.numberOfRatings).toFixed(1);
    return average;
  };

  const handleUpdateSort = (option) => {
    switch (option) {
      case 'rating':
        setSortOption('rating');
        break;
      case 'favorites':
        setSortOption('favorites');
        break;
      case 'recommended':
        setSortOption('recommended');
        break;
    };
  };

  useEffect(() => {
    setFinalMeals([]);
    let sorted = [];
    switch (sortOption) {
      case 'rating':
        sorted = meals.sort((a, b) => {
          let result =  getRating(b) - getRating(a);
          return result;
        });
        setFinalMeals([...sorted]);
        break;
      case 'favorites':
        sorted = meals.sort((a, b) => {
          let result = b.favorites - a.favorites;
          return result;
        });
        setFinalMeals([...sorted]);
        break;
      case 'recommended':
        sorted = meals.sort((a, b) => {
          if (a.recommended && b.recommended) {
            return 0;
          }
          if (a.recommended && !b.recommended) {
            return -1;
          }
          if (!a.recommended && b.recommended) {
            return 1;
          }
        });
        setFinalMeals([...sorted]);
        break;
    }
  }, [sortOption]);

  return (
    <View className="m-2 p-4 border rounded h-2/4">
      <View className="mb-2">
        <Text className="font-main">This is the Meal List</Text>
        <SortSelector
          sortOption={sortOption}
          handleUpdateSort={handleUpdateSort}
        />
      </View>
      <ScrollView>
        {finalMeals ? finalMeals.map((meal) => {
          return (<MealListCard meal={meal} key={meal._id} />)
        }) : ''}
      </ScrollView>
    </View>
  );
};

const SortSelector = ({sortOption, handleUpdateSort}) => {
  const getStyle = (type) => {
    switch (type) {
      case 'selected':
        return 'bg-forestgreen text-white';
      case 'notSelected':
        return 'bg-yellowgreen';
    };
  };

  return (
    <View className="flex-row my-1 shadow-sm">
      <Pressable
        className={`pl-2 pr-1 py-0.5 border-l border-y rounded-l-full border-pakistangreen ${getStyle(sortOption === 'rating' ? 'selected' : 'notSelected')}`}
        onPress={() => { handleUpdateSort('rating') }}
      >
        <Text className={`text-xs ${getStyle(sortOption === 'rating' ? 'selected' : 'notSelected')}`}>Rating</Text>
      </Pressable>
      <Pressable
        className={`px-1 py-0.5 border border-pakistangreen ${getStyle(sortOption === 'favorites' ? 'selected' : 'notSelected')}`}
        onPress={() => { handleUpdateSort('favorites') }}
      >
        <Text className={`text-xs ${getStyle(sortOption === 'favorites' ? 'selected' : 'notSelected')}`}>Favorites</Text>
      </Pressable>
      <Pressable
        className={`pr-2 pl-1 py-0.5 border-r border-y rounded-r-full border-pakistangreen ${getStyle(sortOption === 'recommended' ? 'selected' : 'notSelected')}`}
        onPress={() => { handleUpdateSort('recommended') }}
      >
        <Text className={`text-xs ${getStyle(sortOption === 'recommended' ? 'selected' : 'notSelected')}`}>Recommended</Text>
      </Pressable>
    </View>
  );
};

export default MealList;