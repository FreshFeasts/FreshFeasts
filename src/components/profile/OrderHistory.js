import React, {useState, useContext, useEffect} from 'react';
import {  Pressable, ScrollView, Text, View } from "react-native";
import HistoryCard from './HistoryCard';
import AppText from '../../utils/components/AppText'
import {getUser, getOrders, getMeals } from "../../utils/apis/api";
import { LogInScreenContext } from '../../contexts/LogInScreenContext.jsx'

const OrderHistory = ({ history, setHistory}) => {
  const userId = '64c96db323bfcbd4a7159209';
  const [ orders, setOrders ] = useState(null);
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

    useEffect(() => {
        getOrders(userId). then((orderData) => {
        console.log(orderData);
        setOrders(orderData);
       }).catch((err) => {
        console.error(err);
      })
    },[])

  return (
    <ScrollView bounces={false}>
    <View className="flex-1 justify-center items-center">
      {/* set up orders map
      {orders.map((order) => {
        insert everything below
      })}
      */}
      <AppText className="text-xl">{cart.deliveryDate}</AppText>
      {cart.meals.map((meal) =>
        <HistoryCard key={meal.name} meal={meal}/>
      )}
      <Pressable className="px-4 py-2 bg-pakistangreen rounded-md" onPress={() => setHistory(!history)}>
          <AppText className="text-lemonchiffon"> Close History </AppText>
        </Pressable>
    </View>
    </ScrollView>
  );
};
export default OrderHistory;