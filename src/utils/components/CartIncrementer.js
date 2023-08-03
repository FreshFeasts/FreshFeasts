import React, { useState, useEffect, useContext } from "react";
import { View, Pressable } from "react-native";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/FontAwesome";
import { updateCart } from "../../utils/apis/api";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";

const CartIncrementer = ({ count, color, mealId, handleCount }) => {
  const { userInitData, setUserInitData } = useContext(LogInScreenContext);
  const cart = userInitData.user.currentCart;

  useEffect(() => {
    if (count === 0) {
      handleRemoveMeal(mealId);
    }
  }, [count]);

  const removeFirstOccurrence = (arr, itemToRemove) => {
    const index = arr.indexOf(itemToRemove);
    if (index !== -1) {
      return arr.slice(0, index).concat(arr.slice(index + 1));
    }
    return arr;
  };

  const handleRemoveMeal = (mealId) => {
    const updatedMeals = removeFirstOccurrence(cart.meals, mealId);
    const update = { ...cart, meals: updatedMeals };
    updateCart(userInitData.user._id, update);
    setUserInitData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        currentCart: update,
      },
    }));
  };

  const handleAddMeal = async (mealId) => {
    const updatedMeals = [...cart.meals, mealId];
    const update = { ...cart, meals: updatedMeals };
    updateCart(userInitData.user._id, update);
    setUserInitData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        currentCart: update,
      },
    }));
    try {
      await updateCart(userInitData.user._id, update);
    } catch (error) {
      console.error('Error updating cart: ', error);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      handleCount((prevCount) => prevCount - 1); // Correct state management
      handleRemoveMeal(mealId);
    }
  };

  const handleIncrement = () => {
    handleCount((prevCount) => prevCount + 1); // Correct state management
    handleAddMeal(mealId);
  };

  return (
    <View className="flex-row justify-center items-center">
      <Pressable onPress={handleDecrement}>
        <Icon name="minus-square" size={24} color={color} />
      </Pressable>
      <AppText className="text-{color} mx-2 text-xl"> {count} </AppText>
      <Pressable onPress={handleIncrement}>
        <Icon name="plus-square" size={24} color={color} />
      </Pressable>
    </View>
  );
};

export default CartIncrementer;
