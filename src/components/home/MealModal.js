import React, { useState, useEffect } from "react";
import { Modal, Pressable, Text, View, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Nutrition from "./Nutrition";
import { getMealDetails, addMeal } from "../../utils/apis/api";

const MealModal = ({ mealId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [meal, setMeal] = useState({
    mealId: 1,
    name: "Spaghetti",
    description:
      "Delight in the timeless comfort of al dente spaghetti paired with your choice of savory sauces and delectable toppings, a classic Italian favorite for all taste buds to savor.",
    ratings: {
      1: 10,
      2: 5,
      3: 5,
      4: 20,
      5: 25,
    },
    num_reviews: 65,
    favorites: 20,
    recommended: true,
    url: "https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    dietType: "Carnivore",
    cuisine: "Italian",
    allergies: ["gluten", "tomato"],
    ingredients: ["pasta, tomato, beef, onion, starch, water, salt, pepper"],
    nutrition: [
      { Calories: "120kcal" },
      { Sugar: "2g" },
      { VitaminC: "10%" },
    ],
  });

  // commenting out until ready to use
  // useEffect(() => {
  //   getMealDetails(mealId)
  //     .then((details) => {
  //       setMeal(details);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching meal info: ", err);
  //     });
  // }, [mealId]);

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
          <View className="bg-forestgreen w-11/12 h-4/5 items-center rounded-lg">
            <View className="absolute top-2 right-2">
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="times-circle" size={24} color="white" />
              </Pressable>
            </View>
            <Text className="text-xl text-white font-main m-2">
              {meal.name}
            </Text>
            <Image
              className="w-10/12 h-1/6 rounded-lg mb-2"
              source={{
                uri: meal.url,
              }}
              resizeMode="cover"
            />
            <Text className="text-sm text-white font-main m-2">
              {meal.description}
            </Text>
            <View className="flex-row flex-wrap items-center justify-center">
              {/*need to design better chips for these */}
              <Text className="bg-lemonchiffon px-4 py-2 text-base text-pakistangreen font-main m-2">
                {meal.dietType}
              </Text>
              <Text className="bg-lemonchiffon px-4 py-2 text-base text-pakistangreen font-main m-2">
                {meal.cuisine}
              </Text>
            </View>
            <View className="flex-row flex-wrap items-center mb-2">
              <Text className="text-lg text-white font-main mx-2">
                Ingredients:
              </Text>
              {meal.ingredients.map((ingredient) => (
                <Text
                  key={ingredient}
                  className="text-base font-main text-white mx-2"
                >
                  {ingredient}
                </Text>
              ))}
            </View>
            <Nutrition nutrition={meal.nutrition} />
            <View className="absolute bottom-2 right-2">
              <Pressable
                className="flex-row items-center"
                onPress={() => addMeal(meal.mealId)}
                // need to decide action after adding meal
                // options: bring back to meal list
                // or change to an incrementer with 1 in cart
              >
                <Text className="font-main text-white mr-2">Add to Cart</Text>
                <Icon name="cart-plus" size={32} color="white" />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        className="px-4 py-2 bg-pakistangreen rounded-md"
        onPress={() => setModalVisible(true)}
      >
        <Text className="font-main text-lemonchiffon">Open Modal</Text>
      </Pressable>
    </View>
  );
};
export default MealModal;
