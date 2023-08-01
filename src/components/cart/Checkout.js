import React, { useState, useContext, useEffect } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import AppText from "../../utils/components/AppText";
import CartCard from "./CartCard";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";
import { getUser, postCart, getMeals } from "../../utils/apis/api";

const Checkout = () => {
  const email = "Enid.Johns@yahoo.com";
  const [cartMeals, setCartMeals] = useState([]);
  const [cart, setCart] = useState({
    userId: "64c96db323bfcbd4a7159209",
    meals: [
      "64c59c1d32ab87d43f2bec71",
      "64c5c4af32ab87d43f2bec79",
      "64c5c4af32ab87d43f2bec80",
    ],
    deliveryDate: "08/04/23",
    orderDate: new Date(),
  });
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const submitOrder = () => {
    let results = postCart(cart);
    console.log(results);
  };

  useEffect(() => {
    getUser(email).then((data) => {
      const mealList = data.currentCart.meals;
      setCart(data.currentCart);
      setUser(data);
      getMeals()
        .then((meals) => {
          const mealDetails = meals.filter((item) => {
            return mealList.includes(item._id);
          });
          setCartMeals(mealDetails);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }, []);

  return (
    <>
      {loading ? (
        <Text>Cart is loading...</Text>
      ) : (
        <View className="flex justify-start">
          <View className="bg-maize items-center justify-center">
            <AppText
              className="text-3xl text-pakistangreen ml-2 my-4 "
              style={{ fontFamily: "ComfortaaBold" }}
            >
              Order Summary
            </AppText>
          </View>
          <View className="flex justify-end absolute top-20 right-2">
            <AppText>
              {user.firstName} {user.lastName}
            </AppText>
            <AppText>{user.email}</AppText>
          </View>
          <AppText className="text-2xl text-pakistangreen ml-1 mt-2">
            Meals:
          </AppText>
          <ScrollView bounces={false}>
            {cartMeals.map((meal) => (
              <CartCard meal={meal} key={meal.name} />
            ))}
          </ScrollView>
          <AppText className="text-xl text-pakistangreen ml-1 mt-2">
            Delivery Date: {cart.deliverDate}
          </AppText>
          <AppText className="text-xl text-pakistangreen ml-1 mt-2">
            Payment Information: On File
          </AppText>
          <Pressable
            className="items-center justify-center rounded-md"
            onPress={submitOrder}
          >
            <AppText className="text-2xl bg-pakistangreen text-lemonchiffon p-4 m-4">
              Submit Order
            </AppText>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default Checkout;
