import React, { useState } from "react";
import { SafeAreaView, Text, View, StatusBar, Pressable } from "react-native";
import OrderHistory from "../components/profile/OrderHistory";

const ProfileScreen = ({ navigation }) => {
  const [history, setHistory] = useState(false);

  return (
    <SafeAreaView className="flex-1 items-center">
      {history ? (
        <OrderHistory history={history} setHistory={setHistory} />
      ) : (
        <>
        <Text className="font-main text-2xl mb-2">Profile</Text>
        <Pressable className="px-4 py-2 bg-pakistangreen rounded-md" onPress={() => setHistory(!history)}>
          <Text className="text-lemonchiffon font-main"> Show History </Text>
        </Pressable>
        </>
      )}
    </SafeAreaView>
  );
};
export default ProfileScreen;
