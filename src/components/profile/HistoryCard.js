import React, {useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { rateMeal } from '../../utils/apis/api'

const HistoryCard = ({ meal }) => {
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
    rateMeal(newRating);
  };
  //API Calls
  //getAllOrders - returns all values from order for a particular user
  //order date, delivery date, array of meals
  //getMealBasics - returns meal name, image
  //rateMeal - put request to increment rating. calc average on frontend

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
      <View className="flex-1 flex-row items-center">
      <Text className="font-main text-base">Rate this meal: </Text>
      <Pressable onPress={() => changeRating(1)} className="m-1">
            <Icon name={rating >= 1 ? 'star' : 'star-o'} size={24} color="#0E4000" />
      </Pressable>
      <Pressable onPress={() => changeRating(2)} className="m-1">
            <Icon name={rating >= 2 ? 'star' : 'star-o'} size={24} color="#0E4000" />
      </Pressable>
      <Pressable onPress={() => changeRating(3)} className="m-1">
            <Icon name={rating >= 3 ? 'star' : 'star-o'} size={24} color="#0E4000" />
      </Pressable>
      <Pressable onPress={() => changeRating(4)} className="m-1">
            <Icon name={rating >= 4 ? 'star' : 'star-o'} size={24} color="#0E4000" />
      </Pressable>
      <Pressable onPress={() => changeRating(5)} className="m-1">
            <Icon name={rating >= 5 ? 'star' : 'star-o'} size={24} color="#0E4000" />
      </Pressable>
      </View>
    </View>
    </View>
  );
};
export default HistoryCard;
