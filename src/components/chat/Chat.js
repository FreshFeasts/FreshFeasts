import React, { useContext, useEffect, useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Button,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import io from 'socket.io-client';
// const socket = io("http://44.211.123.112:3005");
// import ViewPropTypes from 'deprecated-react-native-prop-types';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppText from '../../utils/components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LogInScreenContext } from '../../contexts/LogInScreenContext';
import { CHAT_URL } from '../../../config';
import { formatDistanceToNow } from 'date-fns';

// import MealModal from './MealModal';

const SOCKET_SERVER_URL = CHAT_URL; // Replace with your socket server URL
const socket = io(SOCKET_SERVER_URL);

socket.on('connect', () => {
  console.log('Connected to server');
});

// socket.on('disconnect', () => {
//   console.log('Disconnected from server');
// });

socket.on('chat message', (msg) => {
  console.log('New message:', msg);
});

const sendMessage = (msg) => {
  socket.emit('chat message', {
    sender: 'chen',
    action: 'broadcast',
    time: new Date(),
    msg: msg,
  });
  // socket.emit("broadcast", {"sender": 'chen', "action": "broadcast", "msg": msg});
  console.log('user sent:', msg);
};

const quitChat = () => {
  socket.emit('quit');
  //   socket.disconnect();
};

// // display messages of other clients in our client
// socket.on('broadcast', (data) => {
//   console.log(data.msg);
// });

const Chat = () => {
  // const { userInitData } = useContext(LogInScreenContext);
  const [messages, setMessages] = useState([
    {
      // msg: `hi ${userInitData.info.firstName} im the nutritionist`,
      msg: `hi im the nutritionist`,
      sender: 'nutritionist',
      time: new Date(),
    },
    {
      msg: 'what can I help you',
      sender: 'nutritionist',
      time: new Date(),
    },
    {
      msg: 'yooooooo yooooooo yooooooo yooooooo yooooooo yooooooo yooooooo',
      sender: 'chen',
      time: new Date(),
    },
  ]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage(message);
    setMessage('');
  };

  const renderItem = (item) => {
    return (
      <View>
        <Text>{item.msg}</Text>
        <Text>{item.sender}</Text>
      </View>
    );
  };

  return (
    // <SafeAreaView style={styles.container}>
    <View className="h-[81%] bg-inherit">
      <ScrollView
        className=""
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: true })
        }
      >
        {messages.map((item, index) => {
          return <Message key={index} item={item} />;
        })}
      </ScrollView>
      <View className="flex-row items-center px-4 mt-auto justify-between">
        <TextInput
          className=" flex w-[87.5%] px-2 h-10 bg-white  rounded-lg text-xl  "
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          className="flex items-center justify-center h-10 bg-blue-600 px-2 py-1 rounded full  "
          onPress={handleSendMessage}
        >
          {/* <Text className="text-lg text-white">Send</Text> */}
          <Icon name={'arrow-up'} size={20} color="white" />
        </TouchableOpacity>
      </View>
      {/* Add your components and UI elements here */}
    </View>
    // </SafeAreaView>
  );
};

const Message = ({ item }) => {
  return (
    <View
      className={`px-2  ${
        item.sender === 'nutritionist'
          ? 'w-screen mb-2 items-start'
          : 'w-screen mb-2 items-end'
      }`}
    >
      <View
        style={styles.item}
        className={`
          ${
            item.sender === 'nutritionist'
              ? 'bg-gray-300 rounded-lg p-4 mb-2 '
              : 'bg-lemonchiffon rounded-lg p-4 '
          }`}
      >
        <AppText className="text-pakistangreen">{item.msg}</AppText>
      </View>
      <AppText className="text-pakistangreen">
        {formatDistanceToNow(new Date(item.time))}
      </AppText>
    </View>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   margin: 10,
  //   height: 230,
  //   flexWrap: 'wrap',
  // },
  // itemContainer: {
  //   position: 'relative',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 50,
  //   width: 160,
  //   margin: 5,
  //   borderWidth: 2,
  //   borderRadius: 10,
  // },
  // item: {
  //   height: 10,
  // }
  container: {
    flex: 1,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    maxWidth: 300,
    // marginHorizontal: 16,
  },
  // text: {
  //   color: 'red
  // }
});

export default Chat;
