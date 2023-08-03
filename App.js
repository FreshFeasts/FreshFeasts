import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import MainTabs from "./src/navigation/BottomTabNav";
import { LogInScreenContextProvider } from "./src/contexts/LogInScreenContext.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font';
// import * as firebaseConfig from './firebaseConfig';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); //update with Firebase auth once installed. To work on main screens, set to True. To work on login, set to false

  useEffect(() => {
    const fetchLoginStatusFromStorage = async() => {
      const status = await AsyncStorage.getItem('loggedIn');
      status ==='true' ? setLoggedIn(true): setLoggedIn(false);
    }
    fetchLoginStatusFromStorage();
  },[])
  // const auth = getAuth();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });
  // }, [auth]);

  const [fontsLoaded] = useFonts({
    Comfortaa: require('./assets/fonts/Comfortaa-Regular.ttf'),
    ComfortaaBold: require('./assets/fonts/Comfortaa-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LogInScreenContextProvider>
      <NavigationContainer>
        <Stack.Navigator headerShown="false">
          {loggedIn ? (
            <Stack.Screen
              name="MainTabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen name="Login">
                {(props) => <LoginScreen {...props} setLoggedIn={setLoggedIn}/>}
              </Stack.Screen>
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LogInScreenContextProvider>
  );
}
