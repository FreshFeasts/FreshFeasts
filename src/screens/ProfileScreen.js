import {  Text, View, StatusBar } from "react-native";
import OrderHistory from '../components/profile/OrderHistory'

const ProfileScreen = ({navigation}) => {

  return (
    <>
    <View className="flex-1 items-center justify-center">
      <Text>This is the profile page</Text>
      <OrderHistory />
    </View>
    </>
  );
};
export default ProfileScreen;