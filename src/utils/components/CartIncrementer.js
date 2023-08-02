import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/FontAwesome";
import {updateCart} from '../../utils/apis/api'

const CartIncrementer = ( {added, setAdded, color, cart, setCart, meal }) => {
  const [count, setCount] = useState(1);

  const handleRemoveMeal = (mealId) => {
    const updatedMeals = cart.meals.filter((meal) => meal !== mealId);
    const update = { ...cart, meals: updatedMeals };
    setCart(update);
    updateCart(update);
  };

  useEffect(() => {
    if(count === 0){
      handleRemoveMeal(meal._id)
    }
  },[count])

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }

  }

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  // useEffect(() => {
  //   if(cart.meals !== null){
  //     console.log(cart.meals);
  //   setCount(cart.meals.reduce((count, id) => (id === meal._id ? count + 1 : count), 0))
  //   }
  // },[cart])

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
