import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import io from 'socket.io-client';

import AppText from '../../utils/components/AppText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CHAT_URL } from '../../../config';
import { formatDistanceToNow } from 'date-fns';

const SOCKET_SERVER_URL = CHAT_URL;
const socket = io(SOCKET_SERVER_URL);

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
  console.log('user sent:', msg);
};

const quitChat = () => {
  socket.emit('quit');
  socket.disconnect();
};

const Chat = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribeBlur = navigation.addListener('blur', () => {
      socket.disconnect();
      console.log('User left this screen');
    });

    const unsubscribeFocus = navigation.addListener('focus', () => {
      socket.connect();
      socket.emit('join', { sender: 'user', action: 'join' });
      console.log('User joined chat this screen');
    });

    return () => {
      unsubscribeBlur();
      unsubscribeFocus();
    };
  }, [navigation]);

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
          <Icon name={'arrow-up'} size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
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
        {`${formatDistanceToNow(new Date(item.time))} ago`}
      </AppText>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    maxWidth: 300,
  },
});

export default Chat;
