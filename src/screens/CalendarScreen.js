import {  Text, View, StatusBar, TouchableOpacity, Modal, Pressable, Image, StyleSheet} from "react-native";
import {Calendar, LocaleConfig,Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import React, {useState, useEffect} from 'react';


const CalendarScreen = ({navigation}) => {

  const [selected, setSelected] = useState(null);
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
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selected !== null}
          onRequestClose={() => {
            setSelected(null);
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 20,
                padding: 35,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Text style={{ marginBottom: 15, textAlign: "center" }}>
                Order Information
              </Text>
              <Pressable
                style={[
                  {
                    borderRadius: 20,
                    padding: 10,
                    elevation: 2,
                  },
                  {
                    backgroundColor: "#A5E06B",
                  },
                ]}
                onPress={() => setSelected(null)}
              >
                <Text>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )

  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <Calendar
          items={items}
          loadItemsForMonth={loadItems}
          onDayPress={(day) => {
            setSelected(day.dateString); // Set the selected state to the date string
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "#238A28",
              todayTextColor: '#black',
              dayTextColor: '#2d4150',
              selectedDayTextColor: '#ffffff',
              marked: true,
            },
          }}
        />
      </View>
      {renderItem()}
    </>
  )
}
export default CalendarScreen;