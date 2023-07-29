import {  Text, View, StatusBar, ScrollView } from "react-native";

import MealListCard from './MealListCard';

const MealList = () => {
  console.log(MealList)
  return (
    <View className="m-2 p-4 border rounded h-2/4">
      <View className="mb-2">
        <Text>This is the Meal List</Text>
      </View>
      <ScrollView>
        <MealListCard meal={exampleMeal} />
        <MealListCard meal={exampleMeal} />
        <MealListCard meal={exampleMeal} />
        <MealListCard meal={exampleMeal} />
        <MealListCard meal={exampleMeal} />
      </ScrollView>
    </View>
  );
};

export default MealList;

const exampleMeal = {
  _id: 'IDString',
  name: 'Fried Squidward',
  active: 'Boolean',
  description: 'Fried calamari—also known as calamari fritti—is a classic Italian antipasto.',
  cuisine: 'Italian',
  dietType: [],
  numberOfRatings: 10,
  ratings: {
    1: 0,
    2: 1,
    3: 2,
    4: 4,
    5: 3,
  },
  recommended: true,
  favorites: 'Number',
  allergens: ['seafood'],
  photo: 'https://www.thespruceeats.com/thmb/BSYlH-mloaBfGESJrYjXxOtJmeU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/fried-calamari-2019531-hero-01-e294f265d7e84c0f89d4b5759759ffbf.jpg',
  ingredients: ['squid', 'flour', 'breadcrumbs', 'oil', 'egg'],
  nutrition: 'Array',
};