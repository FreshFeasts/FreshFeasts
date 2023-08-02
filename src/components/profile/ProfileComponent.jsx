import { useContext, useState } from "react";
import { Text, View, ScrollView, StatusBar, TouchableOpacity, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import InputWithLabel from "../../utils/components/InputComponent";
import AppText from '../../utils/components/AppText.js';
import { LogInScreenContext } from "../../contexts/LogInScreenContext";
const axios = require("axios");

const ProfileComponent = () => {
  const {values} = useContext(LogInScreenContext);
  const [profile, setProfile] = useState({
    userId: values.userId,
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.createUserEmail || values.signInEmail,
    address1: values.address1,
    address2: values.address2,
    city: values.city,
    state: values.state,
    zip: values.zip,
    darkTheme: false,
    phone: values.phone
  });

  let handleChange = function (text, input) {
    setProfile({
      ...profile,
      [input]: text
    });
  };

  let handleSubmit = function () {
    axios({
      method: 'PUT',
      url: 'api/users/update',
      headers: {AUTHORIZATION: token},
      data: {
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
    });
  }
  return (
    <>
      <ScrollView className="bg-yellowgreen p-6 rounded-2xl w-10/12">
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
            onChangeText={(text) => handleChange(text, 'email')}
          />
        </View>
        <InputWithLabel
          label="Address:"
          labelStyle="text-white"
          keyboardType="email-address"
          inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
          onChangeText={(text) => handleChange(text, 'address1')}
        />
        <InputWithLabel
          label="Address Line 2:"
          labelStyle="text-white"
          keyboardType="email-address"
          inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
          onChangeText={(text) => handleChange(text, 'address2')}
        />
        <View className="city">
          <InputWithLabel
            label="City:"
            labelStyle="text-white"
            inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
            onChangeText={(text) => handleChange(text, 'city')}
          />
        </View>
        <View className="name-container flex-row gap-3 justify-evenly w-full items-center ">
          <View className="firstName w-1/2">
            <InputWithLabel
              label="State:"
              labelStyle="text-white"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => handleChange(text, 'state')}
            />
          </View>
          <View className="lastName w-1/2">
            <InputWithLabel
              label="Zip Code:"
              labelStyle="text-white"
              inputStyle="border-b-2 border-black  p-3 bg-yellowgreen"
              onChangeText={(text) => handleChange(text, 'zip')}
            />
          </View>
        </View>
        <View>
          <Picker
            selectedValue="english">
              <Picker.Item label="English" value="english"/>
            </Picker>
        </View>
        <View>
          <Picker
            selectedValue={profile.darkTheme}
            onValueChange={(itemValue, itemIndex) => handleChange(itemValue, 'darkTheme')}>
              <Picker.Item label="Light Theme" value={false}/>
              <Picker.Item label="Dark Theme" value={true}/>
            </Picker>
        </View>
        <Pressable className="px-4 py-4 bg-pakistangreen rounded-md" onPress={() => console.log(profile)}>
          <Text className="text-lemonchiffon font-main">Save</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
export default ProfileComponent;