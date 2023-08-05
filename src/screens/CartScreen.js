import {  SafeAreaView, Text, View, StatusBar } from "react-native";
import Checkout from '../components/cart/Checkout';

const CartScreen = ({navigation}) => {

  return (
    <View>
      <StatusBar barStyle="light-content"/>
      <Checkout />
    </View>
  );
};
export default CartScreen;