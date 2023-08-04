import { useContext, useState } from "react";
import { Text, View, ScrollView, StatusBar, TouchableOpacity, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputWithLabel from "../../utils/components/InputComponent";
import AppText from '../../utils/components/AppText.js';
import { LogInScreenContext } from "../../contexts/LogInScreenContext";
import axios from "axios";
import { SERVER_URL } from '../../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileComponent = ({setLoggedIn}) => {
  const {userInitData} = useContext(LogInScreenContext);
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
    phone: userInitData.info.phone
  });
  const onSignOutHandler = async () => {
    console.log('hi');
    await AsyncStorage.removeItem('stringUserInItData');
    await AsyncStorage.removeItem('loggedIn');
    setLoggedIn(false);
  }
  let handleChange = function (text, input) {
    setProfile({
      ...profile,
      [input]: text
    });
  };
const payload = {
  userId: profile.userId,
        user: {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          darkTheme: profile.darkTheme
        },
        info: {
          deliveryAddress: {
            address1: profile.address1,
            address2: profile.address2,
            city: profile.city,
            state: profile.state,
            zip: profile.zip
          },
          phone: profile.phone
        }
}
  let handleSubmit = async function () {
    axios.put(SERVER_URL + '/api/users/update', payload, {headers: {'Authorization': `Bearer ${userInitData.token}`}})
    .catch((err) => {
      throw err;
    });
  }
  return (
    <>
      <View className="bg-yellowgreen p-6 rounded-2xl">
        <View className="name-container flex-row gap-3 justify-evenly w-full items-center ">
          <View className="firstName w-1/2">
            <InputWithLabel
              label="First Name:"
              labelStyle="text-white"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              defaultValue={profile.firstName}
              onChangeText={(text) => handleChange(text, 'firstName')}
            />
          </View>
          <View className="lastName w-1/2">
            <InputWithLabel
              label="Last Name:"
              labelStyle="text-white"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              defaultValue={profile.lastName}
              onChangeText={(text) => handleChange(text, 'lastName')}
            />
          </View>
        </View>
        <View>
          <InputWithLabel
            label="Email:"
            labelStyle="text-white"
            keyboardType="email-address"
            inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
            defaultValue={profile.email}
            onChangeText={(text) => handleChange(text, 'email')}
          />
        </View>
        <InputWithLabel
          label="Address:"
          labelStyle="text-white"
          keyboardType="email-address"
          inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
          defaultValue={profile.address1}
          onChangeText={(text) => handleChange(text, 'address1')}
        />
        <InputWithLabel
          label="Address Line 2:"
          labelStyle="text-white"
          keyboardType="email-address"
          inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
          defaultValue={profile.address2}
          onChangeText={(text) => handleChange(text, 'address2')}
        />
        <View className="city">
          <InputWithLabel
            label="City:"
            labelStyle="text-white"
            inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
            defaultValue={profile.city}
            onChangeText={(text) => handleChange(text, 'city')}
          />
        </View>
        <View className="name-container flex-row gap-3 justify-evenly w-full items-center ">
          <View className="firstName w-1/2">
            <InputWithLabel
              label="State:"
              labelStyle="text-white"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              defaultValue={profile.state}
              onChangeText={(text) => handleChange(text, 'state')}
            />
          </View>
          <View className="lastName w-1/2">
            <InputWithLabel
              label="Zip Code:"
              labelStyle="text-white"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              defaultValue={profile.zip}
              onChangeText={(text) => handleChange(text, 'zip')}
            />
          </View>
        </View>
        <View>
          <Picker
            selectedValue={profile.darkTheme}
            onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'darkTheme')}>
              <Picker.Item label="Light Theme" value={false}/>
              <Picker.Item label="Dark Theme" value={true}/>
            </Picker>
        </View>
        <Pressable className="px-4 py-4 bg-pakistangreen rounded-md mb-2" onPress={() => handleSubmit()}>
          <Text className="text-lemonchiffon font-main">Save</Text>
        </Pressable>
        <TouchableOpacity className="px-4 py-4 bg-black rounded-md" onPress={onSignOutHandler}>
          <Text className="text-white font-main">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default ProfileComponent;