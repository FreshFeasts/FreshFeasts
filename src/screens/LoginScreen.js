import { Text, View, StatusBar } from "react-native";
import { LogInScreenContextProvider } from "../contexts/LogInScreenContext.jsx";

const LoginScreen = ({ navigation }) => {
  return (
    <LogInScreenContextProvider>
      <View className="flex-1 items-center justify-center">
        <Text>This is the login page</Text>
      </View>
    </LogInScreenContextProvider>
  );
};
export default LoginScreen;
