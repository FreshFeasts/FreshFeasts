import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainTabs from './src/navigation/BottomTabNav';
// import * as firebaseConfig from './firebaseConfig';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(false) //update with Firebase auth once installed. To work on main screens, set to True. To work on login, set to false

  // const auth = getAuth();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setUser(user);
  //   });
  // }, [auth]);

  return (
    <NavigationContainer>
    <Stack.Navigator headerShown="false">
    { user ? (
          <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }}/>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}

