import {  Text, View, StatusBar, TouchableOpacity, Modal, Pressable, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Calendar, LocaleConfig,Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import React, {useState, useEffect} from 'react';


const CalendarScreen = ({navigation}) => {

  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState({})

  //SAMPLE DATA TO TEST GET REQUESTS
  const orders = {
    _id: '1',
    userId: '1',
    meals: ['Skittles','Gushers','Calimari','Sushi'],
    deliveryDate: '08/11/2023',
  };


  const meals = orders.meals.map((food,index) => {
    //adding 1 to index so users will not see the 0th index at start and see #1.
    return(
      <>
      <Text>Meal #{index+1}: {food}</Text>
      </>
    )
  })

  const showNestedModal = () => {
    setNestedModalVisible(true);
  };

  const closeNestedModal = () => {
    setNestedModalVisible(false);
  };

  const renderItem = () => {
      return (
        <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selected !== null}
          onRequestClose={() => {
            setSelected(null);
          }}
        >
            <Pressable style={{ flex: 1}} onPress={() => setSelected(null)}>

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
              <Text>Delivery Date: {orders.deliveryDate}</Text>
              {meals}
              <TouchableOpacity style={[
                {
                  borderRadius: 15,
                  padding: 10,
                  elevation: 5,
                },
                  {
                    backgroundColor: "#A5E06B",
                  },
                ]}>
              <Text>Edit Delivery Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
        </Modal>
        </View>
      )

  }

  return (
    <>
      <View style={{ flex: 1}}>
        <Calendar

          //Send it as an object or JSON
          //maybe day can be the delivery dates so that users cannot select other dates with a pop up modal

          onDayPress={(day) => {
            setSelected(day.dateString)
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: "#238A28",
              todayTextColor: '#FFA500',
              dayTextColor: '#FFA500',
              selectedDayTextColor: '#ffffff',
              marked: true,
            },
          }}
        />
      </View>

      {/* Conditionally render items for delivery dates */}
      {renderItem()}
    </>
  )
}
export default CalendarScreen;