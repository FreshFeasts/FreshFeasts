import React from 'react';
import {  Pressable, ScrollView, Text, View } from "react-native";
import HistoryCard from './HistoryCard';
//import {getAllOrder, getMealBasics, rateMeal} from "../../utils/apis/api";

const OrderHistory = ({userId, history, setHistory}) => {
  const cart = {
    deliveryDate: 'August 1, 2023', //will update with proper dateFNS
    orderDate: 'August 1, 2023',
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

  //API Calls
    //getAllOrders - returns all values from order for a particular user
      //order date, delivery date, array of meals
    //getMealBasics - returns meal name, image
    //rateMeal - put request to increment rating. calc average on frontend
  return (
    <ScrollView bounces={false}>
    <View className="flex-1 justify-center items-center">
      <Text className="font-main text-xl">{cart.deliveryDate}</Text>
      {cart.meals.map((meal) =>
        <HistoryCard key={meal.name} meal={meal}/>
      )}
      <Pressable className="px-4 py-2 bg-pakistangreen rounded-md" onPress={() => setHistory(!history)}>
          <Text className="text-lemonchiffon font-main"> Close History </Text>
        </Pressable>
    </View>
    </ScrollView>
  );
};
export default OrderHistory;