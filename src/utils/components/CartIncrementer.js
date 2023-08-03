import React, { useState, useEffect, useContext } from "react";
import { View, Pressable } from "react-native";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/FontAwesome";
import {updateCart} from '../../utils/apis/api'
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx"

const CartIncrementer = ( {added, setAdded, color, cart, setCart, meal }) => {
  const [count, setCount] = useState(1);
  const { userInitData, setUserInitData} = useContext(LogInScreenContext);
  const cart = userInitData.user.currentCart;

  useEffect(() => {
    if(count === 0){
      handleRemoveMeal(meal._id)
    }
  },[count])

  const handleRemoveMeal = (mealId) => {
    const updatedMeals = cart.meals.filter((meal) => meal !== mealId);
    const update = { ...currCart, meals: updatedMeals };
    setUserInitData
    updateCart(userInitData.user._id, update);
  };

  const handleAddMeal = (mealId) => {
    const update = currCart;
    update.meals.push(mealId)
    updateCart(userInitData.user._id, update);
  };


  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  }

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    handleAddMeal(meal._id)
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
