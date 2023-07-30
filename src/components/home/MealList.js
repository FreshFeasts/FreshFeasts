import {  Text, View, StatusBar, ScrollView, Pressable } from "react-native";
import React from 'react';

import MealListCard from './MealListCard';
import meals from './mealListData.js';

const { useState, useEffect } = React;

const MealList = () => {
  return (
    <View className="m-2 p-4 border rounded h-2/4">
      <View className="mb-2">
        <Text>This is the Meal List</Text>
        <SortSelector />
      </View>
      <ScrollView>
        {meals ? meals.map((meal) => {
          return (<MealListCard meal={meal} key={meal.id} />)
        }) : ''}
      </ScrollView>
    </View>
  );
};

const SortSelector = () => {
  return (
    <View className="flex-row">
      <Pressable
        className="px-1 border-l border-y rounded-l-full border-[#0E4000] bg-[#A5E06B]"
      >
        <Text>Rating</Text>
      </Pressable>
      <Pressable
        className="px-1 border border-[#0E4000] bg-[#A5E06B]"
      >
        <Text>Favorites</Text>
      </Pressable>
      <Pressable
        className="px-1 border-r border-y rounded-r-full border-[#0E4000] bg-[#A5E06B]"
      >
        <Text>Recommended</Text>
      </Pressable>
    </View>
  );
};

export default MealList;