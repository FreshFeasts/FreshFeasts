import React, {useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CartIncrementer from '../../utils/components/CartIncrementer'


const CartCard = ({ meal }) => {
  const [added, setAdded] = useState(false);

  return (
    <View className="flex-1 items-center m-1">
      <View className='w-80 h-20 p-2 m-2 rounded-lg border-2 flex-row bg-lemonchiffon'>
        <Image
          className="w-16 h-16 rounded-lg ml-1"
          source={{
            uri: meal.url,
          }}
          resizeMode="cover"
        />
          <Text className="font-main text-lg ml-2 mb-2">{meal.name}</Text>
          <View className="absolute bottom-2 right-2">
          <CartIncrementer color="forestgreen" added={added} setAdded={setAdded}/>
          </View>
      </View>
    </View>
  );
};
export default CartCard;