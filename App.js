import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import MainTabs from "./src/navigation/BottomTabNav";
import { LogInScreenContextProvider } from "./src/contexts/LogInScreenContext.jsx";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font';

// Ignore all log notifications:
LogBox.ignoreAllLogs(); // --- Un-Comment For DEMO ---

const Stack = createStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchLoginStatusFromStorage = async() => {
      const status = await AsyncStorage.getItem('loggedIn');
      console.log('status', status);
      status ==='true' ? setLoggedIn(true): setLoggedIn(false);
    }
    fetchLoginStatusFromStorage();
  },[])

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
            <Stack.Screen name="MainTabs" options={{headerShown:false}}>
              {(props) => <MainTabs {...props} setLoggedIn={setLoggedIn} />}
            </Stack.Screen>
            // <Stack.Screen
            //   name="MainTabs"
            //   component={MainTabs}
            //   options={{ headerShown: false }}
            // />
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
