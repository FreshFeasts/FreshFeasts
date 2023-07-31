import { Text, View, StatusBar } from "react-native";
import { LogInScreenContextProvider } from "../contexts/LogInScreenContext.jsx";
import SignInComponent from "../components/login/SignInComponent.jsx";

const LoginScreen = ({ navigation }) => {
  return (
    <LogInScreenContextProvider>
      <SignInComponent />
    </LogInScreenContextProvider>
  );
};
export default LoginScreen;

{
  /* <View className="flex-1 items-center justify-center">
  <Text>This is the login screen?</Text>
</View>; */
}
