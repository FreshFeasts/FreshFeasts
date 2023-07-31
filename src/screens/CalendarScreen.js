import {  Text, View, StatusBar, TouchableOpacity} from "react-native";
import {Calendar, LocaleConfig,Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import React, {useState, useEffect} from 'react';


const CalendarScreen = ({navigation}) => {

  const [selected, setSelected] = useState('');
  const [items, setItems] = useState({})

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  //old className style = className="flex-1 items-center justify-center"
const renderItem = (item) => {
  return(
    <TouchableOpacity>
      <Card>
        <Card.Content>
          <View>
            <Text>
              {item.name}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}
  return (
    <>
<<<<<<< HEAD
    <View style ={{flex:1}}>
    <Agenda
    items={items}
    loadItemsForMonth ={loadItems}
    // renderItem={renderItem}
    />
=======
    <View className="flex-1 items-center justify-center">
      <Text className="font-main">This is the Calendar page</Text>
>>>>>>> dev
    </View>
    </>
  );
};
export default CalendarScreen;