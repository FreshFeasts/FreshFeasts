import React, { useState } from "react";
import { ScrollView, SafeAreaView, Text, View, StatusBar, Pressable } from "react-native";
import OrderHistory from "../components/profile/OrderHistory";
import ProfileComponent from "../components/profile/ProfileComponent";

const ProfileScreen = ({ navigation, setLoggedIn }) => {


  return (
    <ScrollView>
    <SafeAreaView className="flex-1 items-center">
    <ProfileComponent setLoggedIn={setLoggedIn}/>
    </SafeAreaView>
    </ScrollView>
  );
};
export default ProfileScreen;
