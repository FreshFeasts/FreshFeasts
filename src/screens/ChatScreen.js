import { View, ImageBackground } from 'react-native';
import Chat from '../components/chat/Chat.js';
import AppText from '../utils/components/AppText.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import chefThumb from '../../assets/images/cbthumb.png';

const ChatScreen = ({ navigation }) => {
  return (
    <View className="flex flex-col items-center h-full">
      <View className="flex w-full h-[17.5%] pt-12 items-center justify-center bg-forestgreen drop-shadow-md">
        <View className="overflow-hidden rounded-[50%] h-20 w-20   ">
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
