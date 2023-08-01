import React, {useState} from 'react';
import {  Pressable, Text, View, ScrollView } from "react-native";
import AppText from '../../utils/components/AppText';
import CartCard from './CartCard'

const Checkout = () => {
  const cart = {
    deliveryDate: 'August 1, 2023', //will update with proper dateFNS
    orderDate: 'July 30, 2023',
    meals: [{
      name: 'Spaghetti',
      url: 'https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }, {
      name: 'Calamari',
      url: 'https://images.pexels.com/photos/4181933/pexels-photo-4181933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }, {
      name: 'Crabby Pattie',
      url: "https://static.wikia.nocookie.net/spongebob/images/0/0b/The_Krabby_Patty_That_Ate_Bikini_Bottom_072.png/revision/latest/scale-to-width-down/1000?cb=20221028203009"
    }]
  }

  const submitOrder = () => {
    console.log("order submitted")
  }

  return (
    <View className="flex justify-start">
      <View className="bg-maize items-center justify-center">
      <AppText className="text-3xl text-pakistangreen ml-2 my-4 " style={{ fontFamily: 'ComfortaaBold' }}>Order Summary</AppText>
      </View>
      <AppText className="text-2xl text-pakistangreen ml-1 mt-2"> Meals: </AppText>
      <ScrollView bounces={false}>
      {cart.meals.map((meal) => <CartCard meal={meal} key={meal.name}/>
      )}
      </ScrollView>
      <AppText className="text-xl text-pakistangreen ml-1 mt-2"> Delivery Date: {cart.deliveryDate} </AppText>
      <AppText className="text-xl text-pakistangreen ml-1 mt-2"> Payment Information: On File </AppText>
      <Pressable className="items-center justify-center rounded-md" onPress={submitOrder}>
        <AppText className="text-2xl bg-pakistangreen text-lemonchiffon p-4 m-4">Submit Order</AppText>
      </Pressable>
    </View>
  )
}

export default Checkout;