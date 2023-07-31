import {  Text, View, StatusBar } from "react-native";
import MealModal from '../components/home/MealModal';
import MealCarousel from '../components/home/MealCarousel';

const HomeScreen = ({navigation}) => {

  return (
    <>
    <View className="flex-1 items-center justify-center">
      <Text>This is the home page</Text>
      <MealModal />
      <MealCarousel />
    </View>
    </>
  );
};
export default HomeScreen;