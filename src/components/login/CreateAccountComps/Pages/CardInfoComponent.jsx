import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useContext } from "react";
import { RadioButton } from "react-native-paper";
import AppText from "../../../../utils/components/AppText.js";
import InputWithLabel from "../../../../utils/components/InputComponent";
import { LogInScreenContext } from "../../../../contexts/LogInScreenContext";
const CardInfoComponent = ({setPageTwo, setPageThree}) => {
  const { values, onChangeHandler } = useContext(LogInScreenContext);
  const [checked, setChecked] = useState(true);

  const onRadioButtonHandler = () => {
    setChecked(!checked);
  };

  const onBackHandler = () => {
    setPageThree(false);
    setPageTwo(true);

  }
  //className={checked? `h-full w-full bg-forestgreen flex-1 items-center justify-center`:` h-full w-full bg-forestgreen p-4 `}
  return (
    <ScrollView  contentContainerStyle={
      checked
        ? { padding:10, flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'forestgreen' }
        : { padding: 10, backgroundColor: 'forestgreen' }
    }>
      <AppText className="text-2xl text-center mb-2">Card Info</AppText>
      <View className="bg-yellowgreen p-4 rounded-md">
        <View className="card-container flex-row items-center justify-center gap-2">
          <View className="border-solid border-2 rounded-lg">
            <RadioButton
              value="Billing address same as Shipping"
              status={checked ? "checked" : "unchecked"}
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
          inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
          onChangeText={(text) => onChangeHandler(text, "ccNum")}
        />
        <View className="flex-row justify-between">
          <View className="w-1/2">
            <InputWithLabel
              label="Card Number:"
              labelStyle="text-black mb-3"
              placeholder="12/25"
              value={values.ccExp}
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => onChangeHandler(text, "ccExp")}
            />
          </View>
          <View className="w-1/2">
            <InputWithLabel
              label="CVV:"
              labelStyle="text-black mb-3"
              placeholder="12341231234"
              value={values.ccCVV}
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => onChangeHandler(text, "ccCVV")}
            />
          </View>
        </View>
      </View>
      {!checked && (
        <View className="mt-8 bg-yellowgreen p-4 rounded-md">
          <View className="first-addy">
            <InputWithLabel
              label="Address 1:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              value={values.ccAddress1}
              onChangeText={(text) => onChangeHandler(text, "ccAddress1")}
            />
          </View>
          <View className="2nd-addy">
            <InputWithLabel
              label="Address 2:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              value={values.ccAddress2}
              onChangeText={(text) => onChangeHandler(text, "ccAddress2")}
            />
          </View>
          <View className="city">
            <InputWithLabel
              label="City:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              value={values.ccCity}
              onChangeText={(text) => onChangeHandler(text, "ccCity")}
            />
          </View>
          <View className="state-zip-container flex-row gap-3 justify-between w-full ">
            <View className="state w-1/2 ">
              <InputWithLabel
                label="DROPDOWN :"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                value={values.ccState}
                onChangeText={(text) => onChangeHandler(text, "ccState")}
              />
            </View>
            <View className="zipcode">
              <InputWithLabel
                label="Zip code:"
                labelStyle="text-black"
                inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
                value={values.ccZip}
                onChangeText={(text) => onChangeHandler(text, "ccZip")}
              />
            </View>
          </View>
        </View>
      )}
      <View className={checked ? "flex-row" :"flex-row justify-evenly mb-5" }>
          <TouchableOpacity
            className={checked? "bg-maize p-3 rounded-lg mt-4 mr-20" : "bg-maize p-3 rounded-lg mt-4"}
            onPress={onBackHandler}
          >
            <AppText className="text-black text-center">
              Back
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-maize p-3 rounded-lg mt-4"
            onPress=""
          >
            <AppText className="text-black text-center">Continue</AppText>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
};
export default CardInfoComponent;

// <View className="bg-yellowgreen">

// </View>
