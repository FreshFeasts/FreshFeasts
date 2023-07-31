import { useContext } from "react";
import { Text, View, StatusBar } from "react-native";
import { LogInScreenContext } from "../contexts/LogInScreenContext.jsx";
import SignInComponent from "../components/login/SignInComponent.jsx";

const LoginScreen = ({ navigation }) => {
  const { createAccountComp } = useContext(LogInScreenContext);
  return(
    <>
      {!createAccountComp && <SignInComponent />}
    </>
  )
};
export default LoginScreen;

{
  /* <View className="flex-1 items-center justify-center">
  <Text>This is the login screen?</Text>
</View>; */
}
