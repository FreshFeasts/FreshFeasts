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

  return (
    <View className="flex-1  items-center">
      <View className='w-80 h-30 p-2 m-2 rounded-lg border-2 flex-row bg-lemonchiffon'>
        <Image
          className="w-24 h-24 rounded-lg mb-2 ml-2"
          source={{
            uri: meal.url,
          }}
          resizeMode="cover"
        />
        <View>
          <Text className="font-main text-lg ml-2 mb-2">{meal.name}</Text>
            <Text className="font-main text-sm ml-2">Rate this meal: </Text>
            <View className="flex-row ml-2">
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
    </View>
  );
};
export default HistoryCard;
