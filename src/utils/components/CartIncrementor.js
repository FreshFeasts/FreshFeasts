import React, { useState, useEffect } from "react";
import { View, Pressable } from "react-native";
import AppText from "./AppText";
import Icon from "react-native-vector-icons/FontAwesome";

const CartIncrementor = ( {added, setAdded}) => {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count === 0) {
      setAdded(!added);
    }
  }, [count]);

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <View className="flex-row justify-center items-center">
      <Pressable onPress={handleDecrement}>
        <Icon name="minus-square" size={24} color="white" />
      </Pressable>
      <AppText className="text-white mx-2 text-xl"> {count} </AppText>
      <Pressable onPress={handleIncrement}>
        <Icon name="plus-square" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default CartIncrementor;
