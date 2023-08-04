//external imports
import React, { useState, useContext, useEffect } from "react";
import { Pressable, Text, View, ScrollView } from "react-native";
import { format, parseISO, addDays, formatISO, startOfWeek } from "date-fns";
import DropDownPicker from "react-native-dropdown-picker";

//internal imports
import AppText from "../../utils/components/AppText";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";
import {postCart,getMeals,getPayment,updateCart,} from "../../utils/apis/api";
import CartCard from "./CartCard";


const Checkout = () => {
  const { userInitData, setUserInitData } = useContext(LogInScreenContext);
  const cart = userInitData.user.currentCart;
  const email = userInitData.user.email;
  const deliveryDate = cart.deliveryDate;
  const address = userInitData.info.deliveryAddress;

  const [cartMeals, setCartMeals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState();
  const [mealCount, setMealCount] = useState({});

  const cost = 9.99;
/*   const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Monday", value: "0" },
    { label: "Tuesday", value: "1" },
    { label: "Wednesday", value: "2" },
    { label: "Thursday", value: "3" },
    { label: "Friday", value: "4" },
  ]);
 */
  const submitOrder = async () => {
    const final = {
      userId: userInitData.user._id,
      currentCart: { ...cart, orderDate: Date.now() },
    };
    postCart(final, userInitData.token);
    const parsedDate = parseISO(deliveryDate);
    const nextWeek = addDays(parsedDate, 7);
    const nextWeekISO = nextWeek.toISOString();
    const reset = {
      deliveryDate: nextWeekISO,
      meals: [],
    };
    setUserInitData((prevUserData) => ({
      ...prevUserData,
      user: {
        ...prevUserData.user,
        currentCart: reset,
      },
    }));
    try {
      await updateCart(userInitData.user._id, reset, userInitData.token);
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  };

  const getNextMonday = (currentDate) => {
    const parsedDate = parseISO(currentDate);
    const nextMonday = startOfWeek(parsedDate, { weekStartsOn: 1 });
    return addDays(nextMonday, 7);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const payments = await getPayment(userInitData.user._id,userInitData.token);
        const meals = await getMeals(userInitData.token);

        if (cart.deliveryDate === null) {
          const today = new Date();
          const stringToday = today.toISOString();
          const monday = getNextMonday(stringToday).toISOString();
          const start = {
            deliveryDate: monday,
            meals: [],
          };
          setUserInitData((prevUserData) => ({
            ...prevUserData,
            user: {
              ...prevUserData.user,
              currentCart: start,
            },
          }));
        }
        const mealCountObject = cart.meals.reduce((countObject, mealId) => {
          countObject[mealId] = (countObject[mealId] || 0) + 1;
          return countObject;
        }, {});
        setMealCount(mealCountObject);

        if (payments.length > 0) {
          let card = payments[0].ccId.toString();
          let last4 = "************" + card.slice(card.length - 4);
          setPayment(last4);
        } else {
          setPayment("No Payment Information on File");
        }
        const mealDetails = meals.filter((item) => mealList.includes(item._id));
        setCartMeals(mealDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [userInitData]);

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
          <ScrollView bounces={false} className="mb-28">
            <View className="flex justify-end ml-2 mt-1 mb-2 padding-20">
              <AppText className="text-xl my-2">Customer Information</AppText>
              <View className="flex-row">
                <AppText className="mb-1">
                  {userInitData.user.firstName} {userInitData.user.lastName}
                </AppText>
                <AppText className="mb-1 absolute right-1">
                  {userInitData.user.email}
                </AppText>
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
            {cartMeals.map((meal) => (
              <CartCard
                meal={meal}
                key={meal.name}
                count={mealCount[meal._id]}
              />
            ))}
            <View className="flex-row items-center">
              {cart.deliveryDate !== null ? (
                <AppText className="text-base mx-1 mt-2">
                  Delivery Date: {format(parseISO(deliveryDate), "MM/dd/yyyy")}
                </AppText>
              ) : (
                <AppText> No Delivery selected</AppText>
              )}
              {/* <View className="mt-1">
            <DropDownPicker
              placeholderStyle={{color: "black",}}
              maxHeight={200}
              containerStyle={{width: 150,zIndex: 20, paddingVertical: 0}}
              labelStyle={{textAlign: "center"}}
              textStyle={{
                fontSize: 10,
                fontFamily: "Comfortaa"
              }}
              placeholder="Change day"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              dropDownDirection="TOP"
            />
            </View> */}
            </View>
            <AppText className="text-base ml-1 mt-2">
              Total Meals: {cart.meals.length}
            </AppText>
            <AppText className="text-base  ml-1 mt-2">
              This Week's Cost: ${cart.meals.length * cost}
            </AppText>
            <View className="justify-end items-center rounded-md bg-pakistangreen py-2 px-1 m-2">
              <Pressable onPress={submitOrder}>
                <AppText className="text-2xl text-white">Submit Order</AppText>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Checkout;
