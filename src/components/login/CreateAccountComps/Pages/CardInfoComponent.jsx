import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useState, useContext } from "react";
import { RadioButton } from "react-native-paper";
import AppText from "../../../../utils/components/AppText.js";
import InputWithLabel from "../../../../utils/components/InputComponent";
import { LogInScreenContext } from "../../../../contexts/LogInScreenContext";
import axios from "axios";
import { createUser } from "../../../../utils/apis/api.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
const CardInfoComponent = ({ setPageThree, setPageFour, setLoggedIn }) => {
  const {
    values,
    onChangeHandler,
    isSameAddress,
    setIsSameAddress,
    createUserData,
    setUserInitData,
  } = useContext(LogInScreenContext);

  const onRadioButtonHandler = () => {
    setIsSameAddress(!isSameAddress);
  };

  const onBackHandler = () => {
    setPageFour(false);
    setPageThree(true);
  };

  const onCreateAccountHandler = async () => {
    try{
      console.log(createUserData);
      const response = await createUser(createUserData);
      const userData = response.data;
      const stringUserInItData = JSON.stringify(userData);
      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("stringUserInItData", stringUserInItData);
      setUserInitData(userData);
      setPageFour(false);
      setLoggedIn(true);
    } catch(err) {
      console.log(err);
    }
  };
  //className={checked? `h-full w-full bg-forestgreen flex-1 items-center justify-center`:` h-full w-full bg-forestgreen p-4 `}
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <ScrollView
        contentContainerStyle={
          isSameAddress
            ? {
                padding: 10,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",

              }
            : { padding: 10, }
        }
      >
        <AppText className="text-2xl text-center mb-2">Card Info</AppText>
        <View className=" p-4 rounded-md">
          <View className="card-container flex-row items-center justify-center gap-2">
            <View className="border-solid border-2 rounded-lg">
              <RadioButton
                value="Billing address same as Shipping"
                status={isSameAddress ? "checked" : "unchecked"}
                color="red"
                uncheckedColor="black"
                onPress={onRadioButtonHandler}
              />
            </View>
            <AppText className="text-base">
              Billing address same as Shipping
            </AppText>
          </View>

          <InputWithLabel
            label="Card Number:"
            labelStyle="text-black mb-3"
            placeholder="12341231234"
            value={values.ccNum}
            inputStyle="border-b-2 border-black  p-3 "
            onChangeText={(text) => onChangeHandler(text, "ccNum")}
          />
          <View className="flex-row justify-between">
            <View className="w-1/2">
              <InputWithLabel
                label="Card Expiration:"
                labelStyle="text-black mb-3"
                placeholder="12/2025"
                value={values.ccExp}
                inputStyle="border-b-2 border-black  p-3 "
                onChangeText={(text) => onChangeHandler(text, "ccExp")}
              />
            </View>
            <View className="w-1/2">
              <InputWithLabel
                label="CVV:"
                labelStyle="text-black mb-3"
                placeholder="123"
                value={values.ccCVV}
                inputStyle="border-b-2 border-black  p-3 "
                onChangeText={(text) => onChangeHandler(text, "ccCVV")}
              />
            </View>
          </View>
        </View>
        {!isSameAddress && (
          <View className="mt-8  p-4 rounded-md">
            <AppText className="text-center text-base">Billing Address</AppText>
            <View className="first-addy">
              <InputWithLabel
                label="Address 1:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 "
                value={values.ccAddress1}
                onChangeText={(text) => onChangeHandler(text, "ccAddress1")}
              />
            </View>
            <View className="2nd-addy">
              <InputWithLabel
                label="Address 2:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 "
                value={values.ccAddress2}
                onChangeText={(text) => onChangeHandler(text, "ccAddress2")}
              />
            </View>
            <View className="city">
              <InputWithLabel
                label="City:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 "
                value={values.ccCity}
                onChangeText={(text) => onChangeHandler(text, "ccCity")}
              />
            </View>
            <View className="state-zip-container flex-row gap-3 justify-between w-full ">
              <View className="state w-1/2 ">
                <InputWithLabel
                  label="State:"
                  labelStyle="text-black"
                  inputStyle="border-b-2 border-black  p-3 "
                  placeholder="OR"
                  value={values.ccState}
                  onChangeText={(text) => onChangeHandler(text, "ccState")}
                />
              </View>
              <View className="zipcode">
                <InputWithLabel
                  label="Zip code: "
                  labelStyle="text-black"
                  inputStyle="border-b-2 border-black  p-3 "
                  placeholder="99999"
                  value={values.ccZip}
                  onChangeText={(text) => onChangeHandler(text, "ccZip")}
                />
              </View>
            </View>
          </View>
        )}
        <View
          className={isSameAddress ? "flex-row" : "flex-row justify-evenly mb-5"}
        >
          <TouchableOpacity
            className={
              isSameAddress
                ? "bg-maize p-3 rounded-lg mt-4 mr-20"
                : "bg-maize p-3 rounded-lg mt-4"
            }
            onPress={onBackHandler}
          >
            <AppText className="text-black text-center">Back</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-maize p-3 rounded-lg mt-4"
            onPress={onCreateAccountHandler}
          >
            <AppText className="text-black text-center">Create Account</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};
export default CardInfoComponent;

// <View className="">

// </View>
