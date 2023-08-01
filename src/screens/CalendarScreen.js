import {  Text, View, StatusBar, TouchableOpacity, Modal, Pressable, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Calendar, LocaleConfig,Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect} from 'react';


const CalendarScreen = ({navigation}) => {

  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState({})
  const [selectedDate, setSelectedDate] = useState();
  const [deliveryDate, setDeliveryDate] = useState([])

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [days, setDays] = useState([
    {label: '08/11/2023', value: 'Scheduled'},
    {label: '08/15/2023', value: 'New Date'},
    {label: 'Cancel Order', value: 'Cancel'}
  ])
  const highlightedDates = {
    [selected]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#FF0000', // Red color in hexadecimal format
      todayTextColor: 'orange', // Set the color for today's date number
      dayTextColor: '#FFA500', // Orange color for other days' text
      selectedDayTextColor: '#FFFFFF', // White color for selected date's text
      marked: true,
    },
  };

  //SAMPLE DATA TO TEST GET REQUESTS
  const orders = {
    _id: '1',
    userId: '1',
    meals: ['Skittles','Gushers','Calimari','Sushi'],
    deliveryDate: '08/11/2023',
  };

deliveryDate.push()

  const meals = orders.meals.map((food,index) => {
    //adding 1 to index so users will not see the 0th index at start and see #1.
    return(
      <>
      <Text>Meal #{index+1}: {food}</Text>
      </>
    )
  })


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

          <View style={{ flex: 1}}>
            <View
              style={{
                margin: 30,
                backgroundColor: "white",
                borderRadius: 15,
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

              {meals}

              <Text>Delivery Date:</Text>
              <DropDownPicker
              textStyle={{ fontSize: 12 }}
              placeholder = {orders.deliveryDate}
              placeholderStyle={{
                color: 'black',
              }}
              containerStyle={{
                width: 118,
              }}
              labelStyle={{
                textAlign: 'center', // Center the text
              }}
              open={open}
              value={value}
               items={days}
               setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
               />
            </View>
          </View>
        </Pressable>
        </Modal>
        </View>
      )

  }

  return (
    <>

        <Calendar

          //Send it as an object or JSON
          //maybe day can be the delivery dates so that users cannot select other dates with a pop up modal

          onDayPress={(day) => {
            setSelected(day.dateString)
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: 'orange', // Change this to your desired color
            dayTextColor: '#2d4150',
          }}

        />


      {/* Conditionally render items for delivery dates */}
      {renderItem()}
    </>
  )
}
export default CalendarScreen;