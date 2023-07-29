import {  Text, View, StatusBar } from "react-native";
import MealModal from '../components/home/MealModal';
import MealList from '../components/home/MealList';

const HomeScreen = ({navigation}) => {

  return (
    <>
    <View className="flex-1 items-center justify-center">
      <Text>This is the home page</Text>
      <MealModal />
      <MealList />
    </View>
    </>
  );
};
export default HomeScreen;