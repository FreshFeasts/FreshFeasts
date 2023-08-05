import React, { useState, useContext, useEffect } from "react";
import { Text, View, Image, Pressable, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { rateMeal, reviewMeal } from "../../utils/apis/api";
import AppText from "../../utils/components/AppText";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";

const HistoryCard = ({ meal }) => {
  const { userInitData, setUserInitData } = useContext(LogInScreenContext);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewed, setReviewed] = useState(false);

  const changeRating = (newRating) => {
    setRating(newRating);
    rateMeal(meal.id, userInitData.user._id, newRating, userInitData.token);
    setUserInitData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        mealsRated: [...prevUserData.user.mealsRated, meal.id],
      }
    }));
  };

  const handleReview = () => {
    reviewMeal(meal.id, userInitData.user._id, userInitData.user.firstName, reviewText, userInitData.token);
    setReviewText("Review submitted");
  };

  useEffect(() => {
    let rated = userInitData.user.mealsRated;
    setReviewed(rated.includes(meal.id));
  },[]);

  return (
    <View className="flex-1 items-center m-1">
      <View className="w-96 py-1 rounded-lg border-2 flex-row bg-lemonchiffon">
        <Image
          className="w-24 rounded-lg mb-2 ml-2"
          source={{
            uri: meal.photo,
          }}
          resizeMode="cover"
        />
        <View>
          <View className="flex-wrap ml-4 mb-2">
            <Text className="font-main text-sm" style={{ fontFamily: "ComfortaaBold" }}>{meal.name}</Text>
          </View>
          {!reviewed ? (
            <>
              <Text className="font-main text-sm ml-4">Review this meal: </Text>
              <View className="flex-row ml-4">
                <Pressable onPress={() => changeRating(1)} className="m-1">
                  <Icon
                    name={rating >= 1 ? "star" : "star-o"}
                    size={24}
                    color="#0E4000"
                  />
                </Pressable>
                <Pressable onPress={() => changeRating(2)} className="m-1">
                  <Icon
                    name={rating >= 2 ? "star" : "star-o"}
                    size={24}
                    color="#0E4000"
                  />
                </Pressable>
                <Pressable onPress={() => changeRating(3)} className="m-1">
                  <Icon
                    name={rating >= 3 ? "star" : "star-o"}
                    size={24}
                    color="#0E4000"
                  />
                </Pressable>
                <Pressable onPress={() => changeRating(4)} className="m-1">
                  <Icon
                    name={rating >= 4 ? "star" : "star-o"}
                    size={24}
                    color="#0E4000"
                  />
                </Pressable>
                <Pressable onPress={() => changeRating(5)} className="m-1">
                  <Icon
                    name={rating >= 5 ? "star" : "star-o"}
                    size={24}
                    color="#0E4000"
                  />
                </Pressable>
              </View>
              <View className="flex-row items-center">
                <TextInput
                  placeholder="Write a short review"
                  className="ml-4 border-2 border-black  p-3 w-[180px]"
                  onChangeText={(text) => setReviewText(text)}
                  value={reviewText}
                />
                <Pressable
                  className="px-3 py-4 ml-2 bg-pakistangreen rounded-md"
                  onPress={handleReview}
                >
                  <AppText className="text-white">Add</AppText>
                </Pressable>
              </View>
            </>
          ) : (
            <View className="flex-wrap ml-3 mb-2">
            <AppText classname="text-sm"> Thanks for your previous review!</AppText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default HistoryCard;
