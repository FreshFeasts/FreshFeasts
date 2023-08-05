import {  Text, View, StatusBar, ScrollView, Pressable } from "react-native";
import React from 'react';

import MealListCard from './MealListCard';

const { useState, useEffect } = React;

const MealList = ({meals, user, handleSelectMeal}) => { // add meals and user data once connected to API
  const [sortOption, setSortOption] = useState('rating');
  const [filterOption, setFilterOption] = useState([]);
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

  const handleUpdateFilters = (option) => {
    if (filterOption.includes(option)) {
      let newOptions = filterOption.filter((value) => (value !== option));
      setFilterOption([...newOptions]);
      return;
    } else {
      setFilterOption([...filterOption, option]);
      return;
    }
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
        ;
        break;
      case 'favorites':
        sorted = meals.sort((a, b) => {
          let result = b.favorites - a.favorites;
          return result;
        });
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
        break;
    }
    if (filterOption.length < 1) {
      setFinalMeals([...sorted]);
      return;
    }
    let filtered = [...sorted];
    // filter diet types
    if (filterOption.includes('diets') && user.dietChoice.length > 0) {
      filtered = filtered.filter((meal) => {
        return user.dietChoice.some(type => meal.dietType === type);
      });
    }
    // filter allergies
    if (filterOption.includes('allergies') && user.allergens.length > 0) {
      filtered = filtered.filter((meal) => {
        return user.allergens.every(type => !meal.allergens.includes(type));
      });
    }
    setFinalMeals([...filtered]);
  }, [meals, sortOption, filterOption]);

  return (
    <View className="flex-1 mt-4 px-4">
      <View className="mb-2">
        <SortSelector
          sortOption={sortOption}
          handleUpdateSort={handleUpdateSort}
        />
        <FilterSelector
          filterOption={filterOption}
          handleUpdateFilters={handleUpdateFilters}
        />
      </View>
      <View>
        {finalMeals ? finalMeals.map((meal) => {
          return (
            <MealListCard key={meal._id} meal={meal} handleSelectMeal={handleSelectMeal} />
          )
        }) : ''}
      </View>
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
    <View className="flex-row mb-1 shadow-sm">
      <Pressable
        className={`pl-2 pr-1 py-1 border-l border-y rounded-l-full border-pakistangreen ${getStyle(sortOption === 'rating' ? 'selected' : 'notSelected')}`}
        onPress={() => { handleUpdateSort('rating') }}
      >
        <Text className={`font-main text-xs text-center ${getStyle(sortOption === 'rating' ? 'selected' : 'notSelected')}`}>Rating</Text>
      </Pressable>
      <Pressable
        className={`px-1 py-1 border border-pakistangreen ${getStyle(sortOption === 'favorites' ? 'selected' : 'notSelected')}`}
        onPress={() => { handleUpdateSort('favorites') }}
      >
        <Text className={`font-main text-xs text-center ${getStyle(sortOption === 'favorites' ? 'selected' : 'notSelected')}`}>Favorites</Text>
      </Pressable>
      <Pressable
        className={`pr-2 pl-1 py-1 border-r border-y rounded-r-full border-pakistangreen ${getStyle(sortOption === 'recommended' ? 'selected' : 'notSelected')}`}
        onPress={() => { handleUpdateSort('recommended') }}
      >
        <Text className={`font-main text-xs text-center ${getStyle(sortOption === 'recommended' ? 'selected' : 'notSelected')}`}>Recommended</Text>
      </Pressable>
    </View>
  );
};

const FilterSelector = ({filterOption, handleUpdateFilters}) => {
  const getStyle = (type) => {
    switch (type) {
      case 'selected':
        return "mr-1 px-1.5 py-px border border-pakistangreen rounded-full bg-forestgreen text-white font-main text-xs text-center";
      case 'notSelected':
        return "mr-1 px-1.5 py-px border border-pakistangreen rounded-full bg-yellowgreen font-main text-xs text-center";
    }
  };

  return (
    <View className="flex-row my-1 shadow-sm">
      <Pressable
        className={filterOption.includes('diets') ? getStyle('selected') : getStyle('notSelected')}
        onPress={() => { handleUpdateFilters('diets') }}
      >
        <Text className={filterOption.includes('diets') ? getStyle('selected') : getStyle('notSelected')}>{filterOption.includes('diets') ? 'My Diet  X' : 'My Diet'}</Text>
      </Pressable>
      <Pressable
        className={filterOption.includes('allergies') ? getStyle('selected') : getStyle('notSelected')}
        onPress={() => { handleUpdateFilters('allergies') }}
      >
        <Text className={filterOption.includes('allergies') ? getStyle('selected') : getStyle('notSelected')}>{filterOption.includes('allergies') ? 'My Allergies  X' : 'My Allergies'}</Text>
      </Pressable>
    </View>
  );
};

export default MealList;