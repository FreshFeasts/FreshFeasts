import { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Pressable,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputWithLabel from "../../utils/components/InputComponent";
import AppText from "../../utils/components/AppText.js";
import { LogInScreenContext } from "../../contexts/LogInScreenContext";
import axios from "axios";
import { SERVER_URL } from "../../../config.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderHistory from "./OrderHistory.js";
import { useColorScheme } from "nativewind";

const ProfileComponent = ({ setLoggedIn }) => {
  const { userInitData } = useContext(LogInScreenContext);
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [history, setHistory] = useState(false);
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
  let handleChange = function (text, input) {
    setProfile({
      ...profile,
      [input]: text,
    });
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

  const handleDarkMode = (isEnabled) => {
    setProfile({
      ...profile,
      darkTheme: isEnabled,
    });
    toggleColorScheme();
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
      <View className="bg-white p-6 rounded-2xl">
        <View className="name-container flex-row gap-3 justify-evenly w-full items-center ">
          <View className="firstName w-1/2">
            <InputWithLabel
              label="First Name:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3"
              defaultValue={profile.firstName}
              onChangeText={(text) => handleChange(text, "firstName")}
            />
          </View>
          <View className="lastName w-1/2">
            <InputWithLabel
              label="Last Name:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3"
              defaultValue={profile.lastName}
              onChangeText={(text) => handleChange(text, "lastName")}
            />
          </View>
        </View>
        <View>
          <InputWithLabel
            label="Email:"
            labelStyle="text-black"
            keyboardType="email-address"
            inputStyle="border-b-2 border-black  p-3"
            defaultValue={profile.email}
            onChangeText={(text) => handleChange(text, "email")}
          />
        </View>
        <InputWithLabel
          label="Address:"
          labelStyle="text-black"
          keyboardType="email-address"
          inputStyle="border-b-2 border-black  p-3"
          defaultValue={profile.address1}
          onChangeText={(text) => handleChange(text, "address1")}
        />
        <InputWithLabel
          label="Address Line 2:"
          labelStyle="text-black"
          keyboardType="email-address"
          inputStyle="border-b-2 border-black  p-3 "
          defaultValue={profile.address2}
          onChangeText={(text) => handleChange(text, "address2")}
        />
        <View className="city">
          <InputWithLabel
            label="City:"
            labelStyle="text-black"
            inputStyle="border-b-2 border-black  p-3 "
            defaultValue={profile.city}
            onChangeText={(text) => handleChange(text, "city")}
          />
        </View>
        <View className="name-container flex-row gap-3 justify-evenly w-full items-center mt-2">
          <View className="firstName w-1/2">
            <InputWithLabel
              label="State:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 "
              defaultValue={profile.state}
              onChangeText={(text) => handleChange(text, "state")}
            />
          </View>
          <View className="lastName w-1/2">
            <InputWithLabel
              label="Zip Code:"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black  p-3 "
              defaultValue={profile.zip}
              onChangeText={(text) => handleChange(text, "zip")}
            />
          </View>
        </View>
        <View className="w-full">
        <InputWithLabel
              label="Preferred Language"
              labelStyle="text-black"
              inputStyle="border-b-2 border-black p-3 "
              defaultValue="Coming Soon"
            />
        </View>
        <View className="flex-row mb-2 items-center">
          <Text className="font-main text-lg"> Dark Mode: </Text>
          <Switch
            value={colorScheme === "dark"}
            onChange={handleDarkMode}
            trackColor={{ true: "#0E4000", false: "#FFFFFF" }}
          />
        </View>
        {history ? (
          <OrderHistory history={history} setHistory={setHistory} />
        ) : (
          <>
            <Pressable
              className="px-4 py-4 bg-pakistangreen rounded-md mb-2"
              onPress={() => setHistory(!history)}
            >
              <Text className="text-lemonchiffon font-main">View History</Text>
            </Pressable>
          </>
        )}
        <Pressable
          className="px-4 py-4 bg-pakistangreen rounded-md mb-2"
          onPress={() => handleSubmit()}
        >
          <Text className="text-lemonchiffon font-main">Save</Text>
        </Pressable>
        <TouchableOpacity
          className="px-4 py-4 bg-black rounded-md"
          onPress={onSignOutHandler}
        >
          <Text className="text-white font-main">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default ProfileComponent;
