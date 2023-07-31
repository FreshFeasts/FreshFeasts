import {  Text, View, StatusBar, ScrollView, Pressable } from "react-native";
import React from 'react';

import MealListCard from './MealListCard';
import meals from './mealListData.js';

const { useState, useEffect } = React;

const MealList = () => {
  const [sortOption, setSortOption] = useState('rating');

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

  return (
    <View className="m-2 p-4 border rounded h-2/4">
      <View className="mb-2">
        <Text>This is the Meal List</Text>
        <SortSelector
          sortOption={sortOption}
          handleUpdateSort={handleUpdateSort}
        />
      </View>
      <ScrollView>
        {meals ? meals.map((meal) => {
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
        return 'bg-[#238A28] text-white';
      case 'notSelected':
        return 'bg-[#A5E06B]';
    };
  };

  return (
    <View className="flex-row">
      <Pressable
        className={`pl-2 pr-1 border-l border-y rounded-l-full border-[#0E4000] ${getStyle(sortOption === 'rating' ? 'selected'  : 'notSelected')}`}
        onPress={() => { handleUpdateSort('rating') }}
      >
        <Text className={`${getStyle(sortOption === 'rating' ? 'selected'  : 'notSelected')}`}>Rating</Text>
      </Pressable>
      <Pressable
        className={`px-1 border border-[#0E4000] bg-[#A5E06B] ${getStyle(sortOption === 'favorites' ? 'selected'  : 'notSelected')}`}
        onPress={() => { handleUpdateSort('favorites') }}
      >
        <Text className={getStyle(sortOption === 'favorites' ? 'selected'  : 'notSelected')}>Favorites</Text>
      </Pressable>
      <Pressable
        className={`pr-2 pl-1 border-r border-y rounded-r-full border-[#0E4000] bg-[#A5E06B] ${getStyle(sortOption === 'recommended' ? 'selected'  : 'notSelected')}`}
        onPress={() => { handleUpdateSort('recommended') }}
      >
        <Text className={getStyle(sortOption === 'recommended' ? 'selected'  : 'notSelected')}>Recommended</Text>
      </Pressable>
    </View>
  );
};

export default MealList;