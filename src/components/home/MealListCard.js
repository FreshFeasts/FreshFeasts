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

  const truncateTitle = (string) => {
    let words = string.split(' ');
    if (words.length <= 3) {
      return string;
    } else {
      return `${words[0]} ${words[1]} ${words[2]}`;
    }
  };

  const truncateDescription = (string) => {
    if (string.length < 100) {
      return string;
    } else {
      let result = string.slice(0, 100);
      result += '...';
      return result;
    }
  };

  return (
    <Pressable
      onPress={() => {
        handleSelectMeal(meal);
      }}
    >
      <View className="m-1 p-2 rounded-lg bg-lemonchiffon shadow-sm">
        <View className="flex-row max-h-full">
          <View className="w-1/4">
            <Image className="h-24 rounded-lg"
              source={{uri: meal.photo}}
            />
          </View>
          <View className="w-3/4">
            <View className="ml-2 flex-row justify-between">
              <Text className="mr-2 font-main max-w-[70%]">{truncateTitle(meal.name)}</Text>
              <Text className="mr-2 text-right font-main">{`${getRating()} Stars`}</Text>
            </View>
            <Text className="px-2 pt-4 pb-2 font-main text-xs text-ellipsis overflow-hidden">{truncateDescription(meal.description)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default MealListCard;