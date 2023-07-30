import React from "react";
import { Text, View, Image } from "react-native";
import Stars from "react-native-stars";

const HistoryCard = ({ meal }) => {
  //API Calls
  //getAllOrders - returns all values from order for a particular user
  //order date, delivery date, array of meals
  //getMealBasics - returns meal name, image
  //rateMeal - put request to increment rating. calc average on frontend

  const rateMeal = (val) => {
    // console.log(val);
  }

  return (
    <View className="flex-1 items-center justify-center">
    <View className='w-72 h-48 p-4 m-2 bg-white rounded-lg border-2 flex items-center'>
      <Text className="font-main">{meal.name}</Text>
      <Image
        className="w-10/12 h-20 rounded-lg mb-2"
        source={{
          uri: meal.url,
        }}
        resizeMode="cover"
      />
      <Text className="font-main text-base">Rate this meal: </Text>
      <Stars
        half={true}
        default={2.5}
        update={(val) => {
          rateMeal(val);
        }}
        spacing={4}
        starSize={30}
        count={5}
        // fullStar={require('./images/starFilled.png')}
        // emptyStar={require('./images/starEmpty.png')}
        // halfStar={require('./images/starHalf.png')}
      />

    </View>
    </View>
  );
};
export default HistoryCard;
