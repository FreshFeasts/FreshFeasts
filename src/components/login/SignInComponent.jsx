import { useContext } from "react";
import { Text, View, StatusBar, TouchableHighlight } from "react-native";
import InputWithLabel from "../../utilityComponent/InputComponent.jsx";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";

const SignInComponent = () => {
  const { values, onChangeHandler } = useContext(LogInScreenContext);
  return (
    <View className="p-6">
      <View className ="bg-[#A5E06B] p-2 rounded-2xl">
        <Text className="text-1xl font-semibold text-white text-center">Sign in to FreshFeasts</Text>
        <InputWithLabel
          label="Email:"
          labelStyle="text-white"
          keyboardType="email-address"
          name="signInEmail"
          placeholder="email address"
          inputStyle="border-solid border-black border-2 p-1 bg-white"
          onChangeText={onChangeHandler}
        />
        <InputWithLabel
          label="Password:"
          labelStyle="text-white"
          secureTextEntry={true}
          name="signInPassword"
          placeholder="password"
          inputStyle="border-solid border-black border-2 p-1 bg-white "
          onChangeText={onChangeHandler}
        />
        <TouchableHighlight>
          <Text>Sign in</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default SignInComponent;
