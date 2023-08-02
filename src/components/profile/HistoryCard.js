import React, {useState } from "react";
import { Text, View, Image, Pressable, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { rateMeal, reviewMeal } from '../../utils/apis/api'
import InputWithLabel from '../../utils/components/InputComponent.jsx'

const HistoryCard = ({ meal }) => {
  const [rating, setRating] = useState(0);

  const changeRating = (newRating) => {
    setRating(newRating);
    rateMeal(newRating);
  };

  const handleReview = (review) => {
    e.preventDefault();
    reviewMeal(review);
  };


  return (
    <View className="flex-1 items-center m-1">
      <View className="w-80 p-2 rounded-lg border-2 flex-row bg-lemonchiffon">
        <Image
          className="w-24 h-24 rounded-lg mb-2 ml-2"
          source={{
            uri: meal.photo,
          }}
          resizeMode="cover"
        />
        <View>
        <View className="ml-2 mb-2 flex-wrap">
          <Text className="font-main text-sm truncate">{meal.name}</Text>
        </View>
            <Text className="font-main text-sm ml-2">Review this meal: </Text>
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
            <TextInput
              placeholder="Write a short review"
              onChangeText={handleReview}
            />
        </View>
      </View>
    </View>
  );
};
export default HistoryCard;
