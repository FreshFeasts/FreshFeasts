import {  Text, View, StatusBar, StyleSheet } from "react-native";
import MealModal from '../components/home/MealModal';

const HomeScreen = ({navigation}) => {

  return (
    <>
    <View className="flex-1 items-center justify-center">
      <Text className="font-main" >This is the home page</Text>
      <MealModal />
    </View>
    </>
  );
};
export default HomeScreen;




