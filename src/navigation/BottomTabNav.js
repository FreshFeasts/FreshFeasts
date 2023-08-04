import React, { useState, useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ChatScreen from "../screens/ChatScreen";
import CartScreen from "../screens/CartScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { LogInScreenContext } from "../contexts/LogInScreenContext.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();

const MainTabs = ({ setLoggedIn }) => {
  const { userInitData, setUserInitData } = useContext(LogInScreenContext);
  useEffect(() => {
    const fetchUserInitDataFromStorage = async () => {
      const storageUserInItData = await AsyncStorage.getItem(
        "stringUserInItData"
      );
      if (storageUserInItData) {
        setUserInitData(JSON.parse(storageUserInItData));
      }
    };

    fetchUserInitDataFromStorage();
  }, []);
  if (userInitData) {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFF7C6",
          tabBarInactiveTintColor: "#FFF7C6",
          tabBarActiveBackgroundColor: "#0E4000",
          tabBarInactiveBackgroundColor: "#0E4000",
          tabBarStyle: [
            {
              display: "flex",
              paddingBottom: 0,
            },
            null,
          ],
        }}
      >
        <Tab.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon name="user" size={24} color="white" />
            ),
          }}
        >
          {(props) => <ProfileScreen {...props} setLoggedIn={setLoggedIn} />}
        </Tab.Screen>

        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="cutlery" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="comments" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Icon name="shopping-cart" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
};
export default MainTabs;

{
  /* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="user" size={24} color="white" />
          ),
        }}
      /> */
}
