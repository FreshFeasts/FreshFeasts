import { Text, View, StatusBar, Image, ImageBackground } from 'react-native';
import Chat from '../components/chat/Chat.js';
import AppText from '../utils/components/AppText.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import chefThumb from '../../assets/images/cbthumb.png';

const ChatScreen = ({ navigation }) => {
  return (
    <View className="flex flex-col items-center h-full">
      <View className="w-full h-[15%] flex items-center justify-center  bg-forestgreen drop-shadow-md">
        <View className="overflow-hidden rounded-[50%] h-20 w-20 self-center">
          <ImageBackground
            source={chefThumb}
            className="bg-contain h-20 w-20 "
          />
        </View>
      </View>
      <Chat />
    </View>
  );
};
export default ChatScreen;
