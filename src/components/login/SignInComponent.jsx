import { useContext, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import InputWithLabel from "../../utils/components/InputComponent";
import AppText from "../../utils/components/AppText.js";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";
import { signInUser, getUserData } from "../../utils/apis/api.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
// "Test2@gmail.com"
// firstName: "Tesyt"
// lastName: "Test"
// password: "Test1"
// preferredDay: 0
// __proto__: Object
// __proto__: Object

const SignInComponent = ({ setLoggedIn }) => {
  const { setCreateAccountComp, onChangeHandler, values, setUserInitData } =
    useContext(LogInScreenContext);
  const [logInError, setLogInError] = useState(false);
  const onCreateAccountHandler = () => {
    setCreateAccountComp(true);
  };
  const onSignInHandler = async () => {
    const signInObject = {
      email: values.signInEmail,
      password: values.signInPassword,
    };
    try {
      const response = await signInUser(signInObject);
      const { token, userId } = response.data;
      const userResponse = await getUserData(userId, token);
      const { data } = userResponse;
      const stringUserInitData = JSON.stringify({ ...data, token: token });
      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("stringUserInItData", stringUserInitData);
      setUserInitData({ ...data, token: token });
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
      setLogInError(true);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 items-center bg-white">
        <View>
          <Image
            source={require("../../../assets/images/logo3.jpg")}
            className="w-13 h-13 object-contain"
          />
        </View>

        <View className="p-6 rounded-2xl">
          <AppText className="text-2xl font-semibold text-black text-center">
            Sign in to FreshFeasts
          </AppText>
          <InputWithLabel
            label="Email:"
            labelStyle="text-black mb-0"
            keyboardType="email-address"
            placeholder="example@example.com"
            inputStyle="border-b-2 border-black p-3 "
            value={values.signInEmail}
            onChangeText={(text) => onChangeHandler(text, "signInEmail")}
          />
          <InputWithLabel
            label="Password:"
            labelStyle="text-black mb-0"
            secureTextEntry={true}
            placeholder="password"
            inputStyle="border-b-2 border-black  p-3"
            value={values.signInPassword}
            onChangeText={(text) => onChangeHandler(text, "signInPassword")}
          />
          <View className="items-center">
            <TouchableOpacity
              className="bg-[#FFEB69] p-3 rounded-lg mt-4"
              onPress={onSignInHandler}
            >
              <AppText className="text-black text-center">Sign in</AppText>
            </TouchableOpacity>
          </View>
          {logInError && <AppText className = 'text-red-600 mt-4 underline'>Invalid username or password</AppText>}
          <AppText className="text-black text-center mt-4">
            Don't Have A FreshFeasts Account?
          </AppText>
          <TouchableOpacity
            className="bg-[#ebd440] p-3 rounded-lg mt-4"
            onPress={onCreateAccountHandler}
          >
            <AppText className="text-black text-center">Create Account</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInComponent;
