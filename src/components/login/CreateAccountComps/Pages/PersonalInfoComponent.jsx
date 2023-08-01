import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useContext } from "react";
import InputWithLabel from "../../../../utils/components/InputComponent";
import AppText from "../../../../utils/components/AppText.js";
import { LogInScreenContext } from "../../../../contexts/LogInScreenContext";
/**
 * !Need a date picker for date of birth
 * ! Need a state picker Drop down menu component
 */
const PersonalInfoComponent = ({ setPageThree, setPageTwo, setPageOne }) => {
  const { onChangeHandler } = useContext(LogInScreenContext);
  const onContinueHandler = () => {
    setPageTwo(false);
    setPageThree(true);
  };

  const onBackHandler = () => {
    setPageTwo(false);
    setPageOne(true);
  };
  return (
    <SafeAreaView>
      <ScrollView className="p-2 bg-yellowgreen h-full">
        <AppText className="text-2xl text-center">Delivery Address</AppText>
        <View className="bg-yellowgreen p-3">
          <View className="name-container flex-row gap-3 justify-evenly w-full items-center ">
            <View className="firstName w-1/2">
              <InputWithLabel
                label="First Name:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                onChangeText={(text) => onChangeHandler(text, "firstName")}
              />
            </View>
            <View className="lastName w-1/2">
              <InputWithLabel
                label="Last Name:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                onChangeText={(text) => onChangeHandler(text, "lastName")}
              />
            </View>
          </View>
          <View className="name-container flex-row gap-3 justify-evenly w-full items-center ">
            <View className="DOB w-1/2">
              <InputWithLabel
                label="Date of birth:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                placeholder="MM/DD/YYYY"
                onChangeText={(text) => onChangeHandler(text, "DOB")}
              />
            </View>
            <View className="Phone# w-1/2">
              <InputWithLabel
                label="Phone #:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                onChangeText={(text) => onChangeHandler(text, "phone")}
              />
            </View>
          </View>
          <View className="first-addy">
            <InputWithLabel
              label="Address 1:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => onChangeHandler(text, "address1")}
            />
          </View>
          <View className="2nd-addy">
            <InputWithLabel
              label="Address 2:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => onChangeHandler(text, "address2")}
            />
          </View>
          <View className="city">
            <InputWithLabel
              label="City:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => onChangeHandler(text, "city")}
            />
          </View>
          <View className="state-zip-container flex-row gap-3 justify-between w-full ">
            <View className="state w-1/2 ">
              <InputWithLabel
                label="DROPDOWN :"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                onChangeText={(text) => onChangeHandler(text, "state")}
              />
            </View>
            <View className="zipcode">
              <InputWithLabel
                label="Zip code:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                onChangeText={(text) => onChangeHandler(text, "zip")}
              />
            </View>
          </View>
        </View>
        <View className="name-container flex-row gap-3 justify-around w-full items-center ">
          <TouchableOpacity
            className="bg-[#ebd440] p-3 rounded-lg mt-4"
            onPress={onBackHandler}
          >
            <AppText>Back</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#ebd440] p-3 rounded-lg mt-4"
            onPress={onContinueHandler}
          >
            <AppText>Continue</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PersonalInfoComponent;
