import { useContext } from "react";
import { Text, View, StatusBar } from "react-native";
import { LogInScreenContext } from "../contexts/LogInScreenContext.jsx";
import SignInComponent from "../components/login/SignInComponent.jsx";
import CreateAccountProcess from '../components/login/CreateAccountComps/CreateAccountComponent.jsx';

const LoginScreen = ({ navigation, setLoggedIn }) => {
  const { createAccountComp } = useContext(LogInScreenContext);
  return(
    <>
      {!createAccountComp && <SignInComponent setLoggedIn={setLoggedIn} />}
      {createAccountComp && <CreateAccountProcess setLoggedIn={setLoggedIn}/>}
    </>
  )
};
export default LoginScreen;

{
  /* <View className="flex-1 items-center justify-center">
  <Text>This is the login screen?</Text>
</View>; */
}
