import {useContext} from 'react';
import { Text, View, StatusBar, TouchableHighlight } from "react-native";
import InputWithLabel from "../../utils/components/InputComponent"
import AppText from '../../utils/components/AppText.js';
import {LogInScreenContext} from '../../contexts/LogInScreenContext';
const CreateAccountComponent = () => {
  const {onChangeHandler} = useContext(LogInScreenContext);
  return (
    <>
    <View className="flex-1 items-center justify-center bg-forestgreen">
      <View className="bg-yellowgreen p-8 rounded-2xl ">
        <AppText className="text-2xl font-semibold text-white text-center">
          Create Account
        </AppText>
        <InputWithLabel
          label="Email:"
          labelStyle="text-white"
          keyboardType="email-address"
          name="createUserEmail"
          placeholder="email address"
          inputStyle="border-solid border-black border-2 p-1 bg-white"
          onChangeText={onChangeHandler}
        />
        <InputWithLabel
          label="Password:"
          labelStyle="text-white"
          secureTextEntry={true}
          name="createUserPassword"
          placeholder="password"
          inputStyle="border-solid border-black border-2 p-1 bg-white "
          onChangeText={onChangeHandler}
        />
        <TouchableHighlight className="bg-[#ebd440] p-3 rounded-lg mt-4">
          <AppText className="text-black text-center">Create Account</AppText>
        </TouchableHighlight>
      </View>
    </View>
  </>
  )
}

export default CreateAccountComponent;