import React, { useState, useContext, useEffect } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import AppText from "../../utils/components/AppText";
import CartCard from "./CartCard";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";
import {
  getUser,
  postCart,
  getMeals,
  getUserContact,
  getPayment,
} from "../../utils/apis/api";
import { format, parseISO } from "date-fns";
import DropDownPicker from "react-native-dropdown-picker";

const Checkout = () => {
  const email = "Enid.Johns@yahoo.com";
  const [cartMeals, setCartMeals] = useState([]);
  const [cart, setCart] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState();
  const [address, setAddress] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });
  const cost = 9.99;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Monday", value: "0" },
    { label: "Tuesday", value: "1" },
    { label: "Wednesday", value: "2" },
    { label: "Thursday", value: "3" },
    { label: "Friday", value: "4" },
  ]);

  const submitOrder = () => {
    const final = {
      userId: user._id,
      currentCart: { ...cart, orderDate: Date.now() },
    };
    let results = postCart(final);
  };

  useEffect(() => {
    getUser(email).then((data) => {
      const mealList = data.currentCart.meals;
      setCart(data.currentCart);
      setUser(data);
      getUserDetails(data._id);
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

  const getUserDetails = async (userId) => {
    try {
      let contact = await getUserContact(userId);
      let payments = await getPayment(userId);
      let card = payments[0].ccId.toString();
      let last4 = "************" + card.slice(card.length - 4);
      setAddress(contact.deliveryAddress);
      setPayment(last4);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {loading ? (
        <Text>Cart is loading...</Text>
      ) : (
        <View className="flex flex-col">
          <View className="bg-pakistangreen items-center justify-center">
            <AppText
              className="text-3xl text-white ml-2 my-2"
              style={{ fontFamily: "ComfortaaBold" }}
            >
              Order Summary
            </AppText>
          </View>
          <View className="flex justify-end ml-2 mt-1">
            <AppText className="text-xl text-pakistangreen my-2">
              Customer Information
            </AppText>
            <View className="flex-row">
            <AppText className="mb-1">
              {user.firstName} {user.lastName}
            </AppText>
            <AppText className="mb-1 absolute right-0">{user.email}</AppText>
            </View>
            <AppText className="mb-1">{address.address1}</AppText>
            {address.address2 === "" ? null : (
              <AppText>{address.address2}</AppText>
            )}
              <AppText className="mb-1">
                {address.city}, {address.state} {address.zip}{" "}
              </AppText>
            <AppText className="mb-1">Card on File: {payment}</AppText>
          </View>
          {/* <AppText className="text-xl text-pakistangreen ml-1 mt-1">
            Meals
          </AppText> */}
          <View className="bg-pakistangreen h-1 mt-1" />
          <ScrollView bounces={false} className="h-[40%]">
            {cartMeals.map((meal) => (
              <CartCard
                meal={meal}
                key={meal.name}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </ScrollView>
          <View className="bg-pakistangreen h-1 mt-1" />
          <View className="flex-row items-center">
          <AppText className="text-base text-pakistangreen mx-1 my-2">
            Delivery Date: {format(parseISO(cart.deliveryDate), "MM/dd/yyyy")}
          </AppText>
          <DropDownPicker
            placeholderStyle={{
              color: "black",
            }}
            containerStyle={{
              width: 150,
              height: 20
            }}
            labelStyle={{
              textAlign: "center",
            }}
            placeholder="Change day"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
          </View>
          <AppText className="text-base text-pakistangreen ml-1 mt-2">
            Total Meals: {cart.meals.length}
          </AppText>
          <AppText className="text-base text-pakistangreen ml-1 mt-2">
            Weekly Cost: ${cart.meals.length * cost}
          </AppText>
          <View className="justify-end items-center rounded-md">
            <Pressable onPress={submitOrder}>
              <AppText className="text-2xl bg-pakistangreen text-white p-2 m-2">
                Submit Order
              </AppText>
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};

export default Checkout;
