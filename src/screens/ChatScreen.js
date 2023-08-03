import {  Text, View, StatusBar } from "react-native";
import Chat from '../components/chat/Chat.js';


const ChatScreen = ({navigation}) => {

  return (
    <>
    <View className="flex-1 items-center justify-center">
      <Text className="font-main">This is the Chat page</Text>
      <Chat/>
    </View>
    </>
  );
};
export default ChatScreen;