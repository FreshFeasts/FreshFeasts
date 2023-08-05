import { useContext, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Switch,
  ScrollView,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

import InputWithLabel from "../../utils/components/InputComponent";
import AppText from "../../utils/components/AppText.js";
import { LogInScreenContext } from "../../contexts/LogInScreenContext";
import { SERVER_URL } from "../../../config.js";
import OrderHistory from "./OrderHistory.js";

const ProfileComponent = ({ setLoggedIn }) => {
  const { userInitData } = useContext(LogInScreenContext);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [history, setHistory] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [profile, setProfile] = useState({
    userId: userInitData.user._id,
    firstName: userInitData.user.firstName,
    lastName: userInitData.user.lastName,
    email: userInitData.user.email,
    address1: userInitData.info.deliveryAddress.address1,
    address2: userInitData.info.deliveryAddress.address2,
    city: userInitData.info.deliveryAddress.city,
    state: userInitData.info.deliveryAddress.state,
    zip: userInitData.info.deliveryAddress.zip,
    darkTheme: userInitData.user.darkTheme,
    phone: userInitData.info.phone,
  });

  const onSignOutHandler = async () => {
    await AsyncStorage.removeItem("stringUserInItData");
    await AsyncStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  const handleDarkMode = (isEnabled) => {
    setProfile({
      ...profile,
      darkTheme: isEnabled,
    });
    toggleColorScheme();
  };

  let handleChange = function (text, input) {
    setProfile({
      ...profile,
      [input]: text,
    });
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const payload = {
    userId: profile.userId,
    user: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      darkTheme: profile.darkTheme,
    },
    info: {
      deliveryAddress: {
        address1: profile.address1,
        address2: profile.address2,
        city: profile.city,
        state: profile.state,
        zip: profile.zip,
      },
      phone: profile.phone,
    },
  };

  let handleSubmit = async function () {
    axios
      .put(SERVER_URL + "/api/users/update", payload, {
        headers: { Authorization: `Bearer ${userInitData.token}` },
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <>
      <View className="bg-pakistangreen items-center justify-center w-[100%]">
        <AppText
          className="text-3xl text-white ml-2 my-2"
          style={{ fontFamily: "ComfortaaBold" }}
        >
          Profile
        </AppText>
      </View>
      <ScrollView bounces={false}>
        <View className="bg-white p-3 rounded-2xl dark:bg-pakistangreen">
          <View className="name-container flex-row gap-3 justify-evenly w-full items-center">
            <View className="firstName w-1/2">
              <InputWithLabel
                label="First Name:"
                labelStyle="text-black ml-2 dark:text-white"
                inputStyle="border-b-2 border-black  p-2 ml-2 dark:border-white dark:text-white"
                defaultValue={profile.firstName}
                onChangeText={(text) => handleChange(text, "firstName")}
              />
            </View>
            <View className="lastName w-1/2">
              <InputWithLabel
                label="Last Name:"
                labelStyle="text-black dark:text-white"
                inputStyle="border-b-2 border-black  p-2 dark:border-white dark:text-white"
                defaultValue={profile.lastName}
                onChangeText={(text) => handleChange(text, "lastName")}
              />
            </View>
          </View>
          <View>
            <InputWithLabel
              label="Email:"
              labelStyle="text-black dark:text-white"
              keyboardType="email-address"
              inputStyle="border-b-2 border-black p-2 dark:border-white dark:text-white"
              defaultValue={profile.email}
              onChangeText={(text) => handleChange(text, "email")}
            />
          </View>
          <InputWithLabel
            label="Address:"
            labelStyle="text-black dark:text-white"
            keyboardType="email-address"
            inputStyle="border-b-2 border-black p-2 dark:border-white dark:text-white"
            defaultValue={profile.address1}
            onChangeText={(text) => handleChange(text, "address1")}
          />
          <InputWithLabel
            label="Address Line 2:"
            labelStyle="text-black dark:text-white"
            keyboardType="email-address"
            inputStyle="border-b-2 border-black p-2 dark:border-white dark:text-white"
            defaultValue={profile.address2}
            onChangeText={(text) => handleChange(text, "address2")}
          />
          <View className="city">
            <InputWithLabel
              label="City:"
              labelStyle="text-black dark:text-white"
              inputStyle="border-b-2 border-black p-2 dark:border-white dark:text-white"
              defaultValue={profile.city}
              onChangeText={(text) => handleChange(text, "city")}
            />
          </View>
          <View className="name-container flex-row gap-3 justify-evenly w-full items-center mt-2">
            <View className="firstName w-1/2">
              <InputWithLabel
                label="State:"
                labelStyle="text-black ml-2 dark:text-white"
                inputStyle="border-b-2 border-black p-2 ml-2 dark:border-white dark:text-white"
                defaultValue={profile.state}
                onChangeText={(text) => handleChange(text, "state")}
              />
            </View>
            <View className="lastName w-1/2">
              <InputWithLabel
                label="Zip Code:"
                labelStyle="text-black dark:text-white"
                inputStyle="border-b-2 border-black  p-2 dark:border-white dark:text-white"
                defaultValue={profile.zip}
                onChangeText={(text) => handleChange(text, "zip")}
              />
            </View>
          </View>
          <View className="w-[100%]">
            <InputWithLabel
              label="Preferred Language"
              labelStyle="text-black dark:text-white"
              inputStyle="border-b-2 border-black p-2 dark:border-white dark:text-white"
              defaultValue="Coming Soon"
            />
            {/* <AppText className="mb-10 dark:text-white">
             Preferred language:
            </AppText>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={handleLanguageChange}
              mode="modal"
              style={{ width: 200, height: 40, marginTop: 0 }}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Spanish" value="es" />
              <Picker.Item label="French" value="fr" />
            </Picker> */}
          </View>
          <View className="flex-row mb-2 items-center">
            <Text className="font-main text-lg dark:text-white">
              {" "}
              Dark Mode:{" "}
            </Text>
            <Switch
              value={colorScheme === "dark"}
              onChange={handleDarkMode}
              trackColor={{ true: "#238A28", false: "#FFFFFF" }}
            />
          </View>
          <Pressable
            className="px-4 py-4 bg-pakistangreen rounded-md mb-2 dark:bg-black"
            onPress={() => handleSubmit()}
          >
            <Text className="text-white font-main">Save</Text>
          </Pressable>
        </View>
      </ScrollView>
      {history ? (
        <View>
          <OrderHistory history={history} setHistory={setHistory} />
        </View>
      ) : (
        <Pressable
          className="px-4 py-4 bg-pakistangreen rounded-md my-2 w-[92%] dark:bg-black"
          onPress={() => setHistory(!history)}
        >
          <Text className="text-white font-main">View History</Text>
        </Pressable>
      )}
      <TouchableOpacity
        className="px-4 py-4 bg-black rounded-md my-2 w-[92%]"
        onPress={onSignOutHandler}
      >
        <Text className="text-white font-main">Sign Out</Text>
      </TouchableOpacity>
    </>
  );
};
export default ProfileComponent;
