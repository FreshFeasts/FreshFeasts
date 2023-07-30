import {  Text, View, StatusBar, Image } from "react-native";

const MealListCard = ({meal}) => {
  const getRating = () => {
    let sum = 0;
    for (let i = 1; i < 6; i++) {
      sum += (meal.ratings[i] * i);
    }
    let average = (sum / meal.numberOfRatings).toFixed(1);
    return average;
  };

  return (
    <View className="m-1 p-2 rounded-lg bg-[#FFF7C6] shadow-sm">
      <View className="flex-row">
        <View>
          <Image className="h-24 w-24 rounded-lg"
            source={{uri: meal.photo}}
          />
        </View>
        <View className="w-9/12">
          <View className="flex-row justify-between">
            <Text className="mx-4 font-bold">{meal.name}</Text>
            <Text className="mr-4">{`${getRating()} Stars`}</Text>
          </View>
          <Text className="p-4">{meal.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default MealListCard;