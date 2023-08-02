import { useContext, useState } from "react";
import { Text, View, StatusBar, TouchableOpacity } from "react-native";
import InputWithLabel from "../../../../utils/components/InputComponent";
import AppText from "../../../../utils/components/AppText.js";
import { LogInScreenContext } from "../../../../contexts/LogInScreenContext";
const UserRegisterInfo = ({ setPageOne, setPageTwo }) => {
  const { onChangeHandler, values, setCreateAccountComp } =
    useContext(LogInScreenContext);

  const onContinueHandler = () => {
    setPageOne(false);
    setPageTwo(true);
  };
  const onHaveAccountHandler = () => {
    setPageOne(false);
    setCreateAccountComp(false);
  };
  //
  return (
    <View className="flex-1 items-center justify-center bg-forestgreen">
      <View className="bg-yellowgreen p-8 rounded-md w-10/12">
        <AppText className="text-2xl text-black text-center">
          Create Account
        </AppText>
        <InputWithLabel
          label="Email:"
          labelStyle="text-black mb-3"
          keyboardType="email-address"
          placeholder="example@example.com"
          value={values.createUserEmail}
          inputStyle="border-none rounded-md p-3 bg-white mb-2 shadow-inner"
          onChangeText={(text) => onChangeHandler(text, "createUserEmail")}
        />
        <InputWithLabel
          label="Password:"
          labelStyle="text-black mb-3"
          secureTextEntry={true}
          placeholder="password"
          value={values.createUserPassword}
          inputStyle="border-none rounded-md p-3 bg-white mb-2 shadow-inner"
          onChangeText={(text) => onChangeHandler(text, "createUserPassword")}
        />
        <View className="flex-row justify-evenly">
          <TouchableOpacity
            className="bg-maize p-3 rounded-lg mt-4"
            onPress={onHaveAccountHandler}
          >
            <AppText className="text-black text-center">
              Have an account?
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-maize p-3 rounded-lg mt-4"
            onPress={onContinueHandler}
          >
            <AppText className="text-black text-center">Continue</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default UserRegisterInfo;
