import { useContext, useState } from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import InputWithLabel from "../../utils/components/InputComponent"
import AppText from '../../utils/components/AppText.js';
import { LogInScreenContext } from "../../contexts/LogInScreenContext.jsx";

const SignInComponent = () => {
  const { setCreateAccountComp, onChangeHandler} = useContext(LogInScreenContext);
  const onCreateAccountHandler = () => {
    setCreateAccountComp(true);
  }
  return (
    <>
      <View className="flex-1 items-center justify-center bg-forestgreen">
        <View className="bg-yellowgreen p-6 rounded-2xl w-10/12">
          <AppText className="text-2xl font-semibold text-black text-center">
            Sign in to FreshFeasts
          </AppText>
          <InputWithLabel
            label="Email:"
            labelStyle="text-white"
            keyboardType="email-address"
            placeholder="email address"
            inputStyle="border-solid border-black border-2 p-1 bg-white"
            onChangeText={text => onChangeHandler(text, "signInEmail")}
          />
          <InputWithLabel
            label="Password:"
            labelStyle="text-white"
            secureTextEntry={true}
            placeholder="password"
            inputStyle="border-solid border-black border-2 p-1 bg-white "
            onChangeText={text => onChangeHandler(text, "signInPassword")}
          />
          <View className="items-center">
            <TouchableOpacity className="bg-[#FFEB69] p-3 rounded-lg mt-4">
              <AppText className="text-black text-center">Sign in</AppText>
            </TouchableOpacity>
          </View>
          <AppText className="text-black text-center mt-4">
            Don't Have A FreshFeasts Account?
          </AppText>
          <TouchableOpacity className="bg-[#ebd440] p-3 rounded-lg mt-4" onPress={onCreateAccountHandler}>
            <AppText className="text-black text-center">Create Account</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SignInComponent;
