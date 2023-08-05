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

const MealModal = ({ mealSelection, handleSelectMeal, carouselRef }) => {
  const { userInitData, setUserInitData} = useContext(LogInScreenContext);
  const cart = userInitData.user.currentCart;
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [count, setCount] = useState(1);
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
    if(count > 0){
    setModalVisible(!modalVisible);
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
                  if (!carouselRef.current._autoplaying) {
                    carouselRef.current.startAutoplay(instantly=false);
                  }
                  handleSelectMeal(null);
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="times-circle" size={32} color="white" />
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
            <AppText className="text-sm text-white ml-2">
                {meal.favorites} other FreshFeast customers favorited this meal!
            </AppText>
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
            <View className="flex-row flex-wrap mx-2 my-1">
              <AppText className="text-xs text-white mr-1">
                Ingredients:
              </AppText>
              {meal.ingredients.map((ingredient, index) => (
                <AppText key={index} className="text-xs text-white mr-1">
                  {ingredient} |
                </AppText>
              ))}
            </View>
          {meal.allergens.length > 0 ? <View className="flex-row flex-wrap mx-2 my-1">
            <AppText className="text-xs text-white mr-1">
              Allergens:
            </AppText>
            {meal.allergens.map((allergen, index) => (
              <AppText key={index} className="text-xs text-white mr-1">
                {allergen}
              </AppText>
            ))}
          </View> : <></>}
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
                        <AppText className="text-pakistangreen text-base ml-2 mb-2">{review[1].reviewText}</AppText>
                        <AppText className="text-pakistangreen text-base ml-2 mt-2"> - {review[1].name}</AppText>
                      </View>
                    )) : <AppText className='text-lg text-pakistangreen ml-2 mt-2'>No Reviews Available</AppText>}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <View className="absolute bottom-2 right-2 flex-row justify-center items-center">
            <CartIncrementer
                  count={count}
                  color="white"
                  size={32}
                  mealId={meal._id}
                  handleCount={handleCount}
                />
              <View className="bg-lemonchiffon rounded-md ml-2">
                <Pressable
                  className="flex-row items-center ml-2 p-2"
                  onPress={handleAddMeal}
                >
                  <Text className="font-main text-pakistangreen mr-2">Add to Cart</Text>
                  <Icon name="cart-plus" size={32} color="#0E4000" />
                </Pressable>
              </View>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default MealModal;
