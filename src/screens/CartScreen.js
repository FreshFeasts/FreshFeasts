import {  SafeAreaView, Text, View } from "react-native";
import Checkout from '../components/cart/Checkout';

const CartScreen = ({navigation}) => {

  return (
    <>
    <SafeAreaView>
      <Checkout />
    </SafeAreaView>
    </>
  );
};
export default CartScreen;