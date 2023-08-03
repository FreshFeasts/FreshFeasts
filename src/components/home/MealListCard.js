import {  Text, View, StatusBar, Image, Pressable } from "react-native";

const MealListCard = ({meal, handleSelectMeal}) => {
  const getRating = () => {
    let sum = 0;
    for (let i = 1; i < 6; i++) {
      sum += (meal.ratings[i] * i);
    }
    let average = (sum / meal.numberOfRatings).toFixed(1);
    return average;
  };

  return (
    <Pressable
      onPress={() => {
        handleSelectMeal(meal);
      }}
    >
      <View className="m-1 p-2 rounded-lg bg-lemonchiffon shadow-sm">
        <View className="flex-row">
          <View className="w-1/4">
            <Image className="h-24 w-24 rounded-lg"
              source={{uri: meal.photo}}
            />
          </View>
          <View className="w-3/4">
            <View className="flex-row justify-between">
              <Text className="ml-6 mr-2 font-main">{meal.name}</Text>
              <Text className="mr-2 text-right font-main">{`${getRating()} Stars`}</Text>
            </View>
            <Text className="p-4 ml-2 font-main text-xs text-ellipsis overflow-hidden">{meal.description}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MealListCard;