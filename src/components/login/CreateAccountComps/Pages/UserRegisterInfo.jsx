import { useContext, useState } from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import InputWithLabel from "../../../../utils/components/InputComponent";
import AppText from "../../../../utils/components/AppText.js";
import { LogInScreenContext } from "../../../../contexts/LogInScreenContext";
const UserRegisterInfo = ({setPageOne, setPageTwo}) => {
  const { onChangeHandler, values } = useContext(LogInScreenContext);

  const onContinueHandler = () => {
    setPageOne(false);
    setPageTwo(true);
  }
  return (
    <View className="flex-1 items-center justify-center bg-forestgreen">
        <View className="bg-yellowgreen p-8 rounded-2xl w-10/12">
          <AppText className="text-2xl text-black text-center">
            Create Account
          </AppText>
          <InputWithLabel
            label="Email:"
            labelStyle="text-white"
            keyboardType="email-address"
            placeholder="email address"
            value = {values.createUserEmail}
            inputStyle="border-solid border-black border-2 p-2 bg-white"
            onChangeText={(text) => onChangeHandler(text, "createUserEmail")}
          />
          <InputWithLabel
            label="Password:"
            labelStyle="text-white"
            secureTextEntry={true}
            placeholder="password"
            value = {values.createUserPassword}
            inputStyle="border-solid border-black border-2 p-1 bg-white "
            onChangeText={(text) => onChangeHandler(text, "createUserPassword")}
          />
          <TouchableOpacity
            className="bg-maize p-3 rounded-lg mt-4"
            onPress={onContinueHandler}
          >
            <AppText className="text-black text-center">Continue</AppText>
          </TouchableOpacity>
        </View>
      </View>
  )
}
export default UserRegisterInfo;