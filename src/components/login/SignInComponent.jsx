import { useContext, useState } from "react";
import { Text, View, StatusBar, TouchableHighlight } from "react-native";
import InputWithLabel from "../../utilityComponent/InputComponent.jsx";
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";

const SignInComponent = () => {
  const { values, onChangeHandler } = useContext(LogInScreenContext);

  return (
    <>
      <View className="flex-1 items-center justify-center bg-[#238A28]">
        <View className="bg-[#A5E06B] p-6 rounded-2xl ">
          <Text className="text-2xl font-semibold text-white text-center">
            Sign in to FreshFeasts
          </Text>
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
          <View className="items-center">
            <TouchableHighlight className="bg-[#FFEB69] p-3 rounded-lg mt-4">
              <Text className="text-black text-center">Sign in</Text>
            </TouchableHighlight>
          </View>
          <Text className="text-white text-center mt-4">
            Don't Have A FreshFeasts Account?
          </Text>
          <TouchableHighlight className="bg-[#ebd440] p-3 rounded-lg mt-4">
            <Text className="text-black text-center">Create Account</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

export default SignInComponent;
