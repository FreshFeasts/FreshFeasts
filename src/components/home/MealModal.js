import React, { useState, useEffect } from "react";
import { Modal, Pressable, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Nutrition from "./Nutrition";
import { getMealDetails, addMeal } from "../../utils/apis/api";
import DietChip from "../../utils/components/DietChip";
import AppText from "../../utils/components/AppText";
import CartIncrementor from "../../utils/components/CartIncrementor";
import { calcAverageRating } from "../../utils/helpers";

const MealModal = ({ mealId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [added, setAdded] = useState(false);
  const [meal, setMeal] = useState({
    _id: "64c59c1d32ab87d43f2bec71",
    name: "Chef Basil's Bliss",
    description:
      "A delightful vegetable medley layered with fresh ingredients and a touch of love. Inspired by the famous dish from the movie Ratatouille.",
    cuisine: "French",
    dietType: "Protein Plus",
    numberOfRatings: 150,
    ratings: {
      1: 5,
      2: 10,
      3: 20,
      4: 45,
      5: 70,
    },
    recommended: true,
    favorites: 85,
    allergens: [],
    photo:
      "https://www.allrecipes.com/thmb/nu4Y5_nZgI82TzfaFaRHFX7MteI=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/165649roasted-vegetable-medley-DDMFS-001-4x3-f9c51738278e4c92aa53d51250f4ed10.jpg",
    ingredients: [
      "Eggplant",
      "Zucchini",
      "Red Bell Pepper",
      "Yellow Bell Pepper",
      "Tomato",
      "Basil",
      "Garlic",
      "Olive Oil",
    ],
    nutrition: [
      {
        calories: "180",
      },
      {
        protein: "5g",
      },
      {
        carbohydrates: "25g",
      },
      {
        fat: "7g",
      },
      {
        fiber: "6g",
      },
      {
        sugar: "8g",
      },
    ],
    mealId: "64c59c1d32ab87d43f2bec71",
  });

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center">
          <View className="bg-forestgreen w-11/12 h-4/6 items-center rounded-lg">
            <View className="absolute top-2 right-2">
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="times-circle" size={24} color="white" />
              </Pressable>
            </View>
            <AppText className="font-bold text-xl text-white m-2">
              {meal.name}
            </AppText>
            <Image
              className="w-11/12 h-1/6 rounded-lg mb-2"
              source={{
                uri: meal.photo,
              }}
              resizeMode="cover"
            />
            <AppText className="text-sm text-white m-2">
              {meal.description}
            </AppText>
            <View className="flex-row flex-wrap items-center">
              <DietChip dietName={meal.dietType} />
              <View className="h-8 w-20 border-2 border-pakistangreen justify-center items-center bg-lemonchiffon rounded-2 m-1 p-1">
                <AppText className="text-xs">{meal.cuisine}</AppText>
              </View>
              <View className="h-8 w-32 border-2 border-pakistangreen justify-center items-center bg-lemonchiffon rounded-2 m-1 p-1">
                <AppText className="text-xs">
                  Rating: {calcAverageRating(meal.ratings)}
                   <Icon name="star" size={12} color="#0E4000" />
                </AppText>
              </View>
            </View>
            <View className="flex-row flex-wrap mx-2 my-3">
              <AppText className="text-xs text-white mr-1">
                Ingredients:
              </AppText>
              {meal.ingredients.map((ingredient) => (
                <AppText key={ingredient} className="text-xs text-white mr-1">
                  {ingredient} |
                </AppText>
              ))}
            </View>
            <Nutrition nutrition={meal.nutrition} />
            <View className="absolute bottom-2 left-2 w-56">
              <AppText className='text-xs text-white'>{meal.favorites} other FreshFeast customers favorited this meal!</AppText>
            </View>
            {added ?
            <View className="absolute bottom-2 right-2">
            <CartIncrementor added={added} setAdded={setAdded}/>
            </View>
            :<View className="absolute bottom-2 right-2">
              <Pressable
                className="flex-row items-center"
                onPress={() => {
                  addMeal(meal.mealId);
                  setAdded(true);
                }}
                // need to decide action after adding meal
                // options: bring back to meal list
                // or change to an incrementer with 1 in cart
              >
                <Text className="font-main text-white mr-2">Add to Cart</Text>
                <Icon name="cart-plus" size={32} color="white" />
              </Pressable>
            </View> }
          </View>
        </View>
      </Modal>
      <Pressable
        className="px-4 py-2 bg-pakistangreen rounded-md"
        onPress={() => setModalVisible(true)}
      >
        <AppText className="text-lemonchiffon">Open Modal</AppText>
      </Pressable>
    </View>
  );
};
export default MealModal;
