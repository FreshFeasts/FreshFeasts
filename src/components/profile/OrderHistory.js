import React, { useState, useContext, useEffect } from "react";
import { Pressable, FlatList, Text, View, ScrollView } from "react-native";
import HistoryCard from "./HistoryCard";
import AppText from "../../utils/components/AppText";
import { getUser, getOrders, getMeals } from "../../utils/apis/api";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";
import { format, parseISO } from "date-fns";

const OrderHistory = ({ history, setHistory }) => {
  const { userInitData, setUserInitData } = useContext(LogInScreenContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const renderItem = ({ item }) => {
    const formattedDate = format(parseISO(item.deliveryDate), "MM/dd/yyyy");
    return (
      <>
        <AppText className="text-xl">{formattedDate}</AppText>
        {item.meals.map((meal, index) => (
          <HistoryCard key={index} meal={meal} />
        ))}
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const orderData = await getOrders(userInitData.user._id,userInitData.token);
        const meals = await getMeals(userInitData.token);

        const ordersMealDetail = orderData.map((order) => {
          const mealDetails = meals.filter((meal) =>
            order.meals.includes(meal._id)
          );
          const mealsWithDetails = mealDetails.map((meal) => {
            return {
              id: meal._id,
              name: meal.name,
              photo: meal.photo,
            };
          });
          return {
            ...order,
            meals: mealsWithDetails,
          };
        });
        setOrders(ordersMealDetail);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      {loading ? (
        <AppText className="m-2">Orders are loading...</AppText>
      ) : orders.length > 1 ? (
        <View className="flex-1">
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(order) => order.orderId}
          bounces={false}
        />
        <View className="pb-12 justify-center items-center">
        <Pressable
              className="px-4 py-4 bg-pakistangreen rounded-md my-2 w-[50%] items-center"
              onPress={() => setHistory(!history)}
            >
              <AppText className="text-white"> Close History </AppText>
            </Pressable>
            </View>
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <AppText className="text-xl mb-2">No order history!</AppText>
          <AppText className="text-lg">
            Place an order to enjoy a fresh feast!
          </AppText>
        </View>
      )}
    </View>
  );
};
export default OrderHistory;
