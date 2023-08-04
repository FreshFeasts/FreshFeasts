import React, { useState } from "react";
import {ScrollView,SafeAreaView,StatusBar,} from "react-native";
import ProfileComponent from "../components/profile/ProfileComponent";

const ProfileScreen = ({ navigation, setLoggedIn }) => {
  return (
    <SafeAreaView className="flex-1 items-center">
      <StatusBar barStyle="dark-content" />
        <ProfileComponent setLoggedIn={setLoggedIn} />
    </SafeAreaView>
  );
};
export default ProfileScreen;
