import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, Image, Pressable, TextInput, Button, FlatList, SafeAreaView } from 'react-native';
import io from 'socket.io-client';
// const socket = io("http://44.211.123.112:3005");
// import ViewPropTypes from 'deprecated-react-native-prop-types';
// import Carousel, { Pagination } from 'react-native-snap-carousel';
import AppText from '../../utils/components/AppText'
// import MealModal from './MealModal';

const SOCKET_SERVER_URL = 'http://44.211.123.112:3005'; // Replace with your socket server URL
const socket = io(SOCKET_SERVER_URL);


socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('chat message', (msg) => {
  console.log('New message:', msg);
});

const sendMessage = (msg) => {
  socket.emit('chat message', {"sender": 'chen', "action": "broadcast", "msg": msg});
  // socket.emit("broadcast", {"sender": 'chen', "action": "broadcast", "msg": msg});
  console.log('user sent:', msg)
};

// display messages of other clients in our client
socket.on("broadcast", (data) => {
  console.log(data.msg)
});


const Chat = () => {
  const [messages, setMessages] = useState([{
    msg: 'hi im the nutritionist',
    sender: 'nutritionist'
  },{
    msg: 'what can I help you',
    sender: 'nutritionist'
  },
  {
    msg: 'yooooooo yooooooo yooooooo yooooooo yooooooo yooooooo yooooooo',
    sender: 'chen'
  }
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
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Text>Chat Screen</Text>
        </View>
        <View className=''>
          {/* {
            messages[0] &&
            <FlatList
              style={styles.item}
              data={messages}
              renderItem={renderItem}
            />
          } */}
          {
            messages.map((item, index) => {
              return (
                <Message key={index} item={item}/>
              )
            })
          }
        </View>
        <View className='flex-row justify-center'>
          <TextInput
            className='w-80 bg-white h-8 '
            value={message}
            onChangeText={setMessage}
          />
          <Button
            title="Send"
            onPress={handleSendMessage}
          />
        </View>
        {/* Add your components and UI elements here */}
      </View>
    </SafeAreaView>
  );
};

const Message = ({ item }) => {
  return (
    <View className={
      item.sender === 'nutritionist' ? (
        'w-screen mb-2 items-start'
      )
      : (
        'w-screen mb-2 items-end'
      )
    }>
      <View
        style={styles.item}
        className={
          item.sender === 'nutritionist' ? (
            'bg-gray-300 rounded-lg p-4 mb-2 ml-2'
          )
          : (
            'bg-lemonchiffon rounded-lg p-4 mr-2'
          )
        }>
        <AppText className='text-pakistangreen'>
          {item.msg}
        </AppText>
      </View>
        <AppText className='text-pakistangreen'>
          {item.sender}
        </AppText>
    </View>
  )
}
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
    maxWidth: 300
    // marginHorizontal: 16,
  },
  // text: {
  //   color: 'red
  // }
});

export default Chat;