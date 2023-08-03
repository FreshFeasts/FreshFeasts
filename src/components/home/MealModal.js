import React, { useState, useEffect, useContext } from "react";
import { Modal, Pressable, Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Nutrition from "./Nutrition";
import { getUser, updateCart } from "../../utils/apis/api";
import DietChip from "../../utils/components/DietChip";
import AppText from "../../utils/components/AppText";
import CartIncrementer from "../../utils/components/CartIncrementer";
import { calcAverageRating } from "../../utils/helpers";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";

const MealModal = ({ mealSelection, handleSelectMeal }) => {
  const { userInitData, setUserInitData} = useContext(LogInScreenContext);
  const cart = userInitData.user.currentCart;
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [count, setCount] = useState(0);
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
      const mealList = cart.meals;
      const mealCount = mealList.reduce((count, id) => id === mealSelection._id ? count + 1 : count, 0);
      setCount(mealCount);
    } else {
      setModalVisible(false);
    }
  }, [mealSelection]);

  const handleAddMeal = async () => {
    const updatedMeals = [...cart.meals, meal._id];
    const update = { ...cart, meals: updatedMeals };
    handleCount((prevCount) => prevCount + 1);
    setUserInitData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        currentCart: update,
      },
    }));
    try {
      await updateCart(userInitData.user._id, update, userInitData.token);
    } catch (error) {
      console.error('Error updating cart: ', error);
    }
  };

  const handleCount = (count) => {
    setCount(count);
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
        <View className="flex-1 items-center justify-end mb-5">
          <View className="bg-pakistangreen w-[100%] h-[90%] items-start rounded-lg">
            <View className="absolute top-2 right-2 z-20">
              <Pressable
                onPress={() => {
                  handleSelectMeal(null);
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="times-circle" size={32} color="forestgreen" />
              </Pressable>
            </View>
            <Image
              className="w-[100%] h-[40%] rounded-lg mb-2"
              source={{
                uri: meal.photo,
              }}
              resizeMode="cover"
            />
            <AppText
              className="font-[bold] text-xl text-white m-2"
              style={{ fontFamily: "ComfortaaBold" }}
            >
              {meal.name}
            </AppText>
            <View className="flex-row items-center m-2">
            <AppText className="text-lg text-white mr-1" style={{ fontFamily: "ComfortaaBold" }}>
            Rating: {calcAverageRating(meal.ratings)}
            </AppText>
            <Icon name="star" size={20} color="#FFFFFF" />
            <Pressable
                className="p-2 items-center"
                onPress={() => setReviewModalVisible(!reviewModalVisible)}
              >
                <AppText className="text-white text-sm underline"> (Read Reviews)</AppText>
              </Pressable>
            </View>
            <AppText className="text-sm text-white m-2">
              {meal.description}
            </AppText>
            <View className="flex-row flex-wrap items-center">
              <DietChip dietName={meal.dietType} />
              <View className="h-8 w-20 border-2 border-pakistangreen justify-center items-center bg-white rounded-md  m-1 p-1">
                <AppText className="text-xs">{meal.cuisine}</AppText>
              </View>
            </View>
            <AppText className="text-lg text-white ml-2 underline">Nutrition</AppText>
            <Nutrition nutrition={meal.nutrition} />
            <View className="flex-row flex-wrap mx-2 my-3">
              <AppText className="text-xs text-white mr-1">
                Ingredients:
              </AppText>
              {meal.ingredients.map((ingredient, index) => (
                <AppText key={index} className="text-xs text-white mr-1">
                  {ingredient} |
                </AppText>
              ))}
            </View>

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
                    {meal.reviews ? Object.entries(meal.reviews).map((review, index) => (
                      <View className="mt-5" key={index}>
                        <AppText className="text-pakistangreen text-base ml-2 mt-2">Name: {review[1].name}</AppText>
                        <AppText className="text-pakistangreen text-base ml-2 mb-2">Review: {review[1].reviewText}</AppText>
                      </View>
                    )) : <AppText className='text-lg text-pakistangreen ml-2 mt-2'>No Reviews Available</AppText>}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View className="absolute bottom-4 left-2 w-56">

              <AppText className="text-xs text-white">
                {meal.favorites} other FreshFeast customers favorited this meal!
              </AppText>
            </View>
            {count > 0 ? (
              <View className="absolute bottom-4 right-3">
                <CartIncrementer
                  count={count}
                  color="white"
                  mealId={meal._id}
                  handleCount={handleCount}
                />
              </View>
            ) : (
              <View className="absolute bottom-4 right-3">
                <Pressable
                  className="flex-row items-center"
                  onPress={handleAddMeal}
                >
                  <Text className="font-main text-white mr-2">Add to Cart</Text>
                  <Icon name="cart-plus" size={32} color="white" />
                </Pressable>
              </View>)}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default MealModal;
