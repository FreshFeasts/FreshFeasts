import React, { useState, useEffect } from "react";
import { Modal, Pressable, Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Nutrition from "./Nutrition";
import { getUser, updateCart } from "../../utils/apis/api";
import DietChip from "../../utils/components/DietChip";
import AppText from "../../utils/components/AppText";
import CartIncrementer from "../../utils/components/CartIncrementer";
import { calcAverageRating } from "../../utils/helpers";

const MealModal = ({ mealSelection, handleSelectMeal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const email = "Enid.Johns@yahoo.com";
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [meal, setMeal] = useState({
    _id: "",
    name: "",
    description: "",
    cuisine: "",
    dietType: "",
    numberOfRatings: 0,
    ratings: {},
    recommended: true,
    favorites: 85,
    allergens: [],
    photo: "",
    ingredients: [],
    nutrition: [],
    mealId: "",
    reviews: {}
  });

  useEffect(() => {
    if (mealSelection) {
      setMeal(mealSelection);
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [mealSelection]);

  useEffect(() => {
    getUser(email)
      .then((data) => {
        setCart(data.currentCart);
        setUser(data);
        if (data.currentCart.meals.includes(meal._id)) {
          setAdded(true);
        } else {
          setAdded(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleAddMeal = () => {
    const userId = user._id;
    const update = { currentCart: cart, deliveryDate: "08/05/2023", userId };
    update.currentCart.meals.push(meal._id);
    setCart(update);
    updateCart(update);
    setAdded(!added);
  };

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
          <View className="bg-forestgreen w-11/12 h-[85%] items-center rounded-lg">
            <View className="absolute top-2 right-2">
              <Pressable
                onPress={() => {
                  handleSelectMeal(null);
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="times-circle" size={24} color="white" />
              </Pressable>
            </View>
            <AppText
              className="font-[bold] text-xl text-white m-2"
              style={{ fontFamily: "ComfortaaBold" }}
            >
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
              <View className="h-8 border-2 border-pakistangreen justify-center items-center bg-lemonchiffon rounded-2 m-1 p-1">
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={reviewModalVisible}
              onRequestClose={() => {
                setReviewModalVisible(!reviewModalVisible);
              }}
            >
              <View className="flex-1 items-center justify-center">
                <View className="bg-white w-11/12 h-[40%] items-center rounded-lg">
                  <View className="absolute top-2 right-2">
                    <Pressable
                      onPress={() => {
                        handleSelectMeal(null);
                        setReviewModalVisible(!reviewModalVisible);
                      }}
                    >
                      <Icon name="times-circle" size={24} color="forestgreen" />
                    </Pressable>
                  </View>
                  <ScrollView className="flex bg-white mt-10 rounded-md">
                  <AppText className="text-xl text-pakistangreen ml-2 mt-2">Reviews </AppText>
                    {meal.reviews !== {} ? Object.entries(meal.reviews).map((review) => (
                      <View key={review.name} className="mt-5">
                        <AppText className="text-pakistangreen text-base ml-2 mt-2">Name: {review[1].name}</AppText>
                        <AppText className="text-pakistangreen text-base ml-2 mb-2">Review: {review[1].reviewText}</AppText>
                      </View>
                    )) : <AppText>No Reviews Available</AppText>}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View className="absolute bottom-2 left-2 w-56">
              <Pressable
                className="w-[120px]"
                onPress={() => setReviewModalVisible(!reviewModalVisible)}
              >
                <AppText className="text-white">Show Reviews</AppText>
              </Pressable>
              <AppText className="text-xs text-white">
                {meal.favorites} other FreshFeast customers favorited this meal!
              </AppText>
            </View>
            {added ? (
              <View className="absolute bottom-2 right-2">
                <CartIncrementer
                  added={added}
                  setAdded={setAdded}
                  color="white"
                  cart={cart}
                  setCart={setCart}
                  meal={meal}
                />
              </View>
            ) : (
              <View className="absolute bottom-2 right-2">
                <Pressable
                  className="flex-row items-center"
                  onPress={handleAddMeal}
                >
                  <Text className="font-main text-white mr-2">Add to Cart</Text>
                  <Icon name="cart-plus" size={32} color="white" />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default MealModal;
