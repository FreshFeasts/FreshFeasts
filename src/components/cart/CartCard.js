import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CartIncrementer from "../../utils/components/CartIncrementer";

const CartCard = ({ meal }) => {
  const [added, setAdded] = useState(false);

  return (
    <View className="flex-1 items-center m-1">
      <View className="w-80 p-2 rounded-lg border-2 flex-row bg-lemonchiffon">
        <Image
          className="w-16 h-16 rounded-lg ml-1 items-center"
          source={{
            uri: meal.photo,
          }}
          resizeMode="cover"
        />
        <View className="flex-1 flex-col ml-2 mb-1">
          <Text className="font-main text-base mb-1 truncate">{meal.name}</Text>
        </View>
        <View className="absolute bottom-2 right-2">
          <CartIncrementer
            color="forestgreen"
            added={added}
            setAdded={setAdded}
          />
        </View>
      </View>
    </View>
  );
};
export default CartCard;
