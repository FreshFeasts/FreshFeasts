import {  Text, View, StatusBar } from "react-native";

const OrderHistory = () => {
  //API Calls
    //getAllOrders - returns all values from order for a particular user
      //order date, delivery date, array of meals
    //getMealBasics - returns meal name, image
    //rateMeal - put request to increment rating. calc average on frontend

    //question - should we save user rating in the order table.  array of {meal id, rating}

  return (
    <View>
      <Text className="font-main">Meal Name</Text>
      <Text className="font-main">Rate this meal: </Text>
    </View>
  );
};
export default OrderHistory;