import {  Text, View, StatusBar, TouchableOpacity, Modal, Pressable, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Calendar, LocaleConfig,Agenda, DateData, AgendaEntry, AgendaSchedule, CalendarList} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { compareAsc, format, addDays, addBusinessDays, parseISO} from 'date-fns'

  //SAMPLE DATA TO TEST GET REQUESTS
  const orders = {
    _id: '1',
    userId: '1',
    meals: ['Skittles','Gushers','Calimari','Sushi'],
    orderDate: '2023-08-02T07:00:00.000+00:00',
    deliveryDate: '2023-08-15T07:00:00.000+00:00',
  };

const CalendarScreen = ({navigation}) => {

  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState({})
  const [orderDate, setOrderDate] = useState('')
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const [restOfDays,setRestOfDays] = useState(5)
  const [dateArr, setDateArr] = useState([])
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [mealsArr, setMealsArr] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:3000/orders/:orderId', { headers: { "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM4MDA5OTYyNzU5Yzk4NWMyNjBiMDQiLCJlbWFpbCI6Ik9sYS5Nb3NjaXNraTEzQGhvdG1haWwuY29tIiwiaWF0IjoxNjkwOTM1MDA2fQ.vVRpJR6Jtv7HYXMPf0QGxA44fvOYgIXdM8u4g9qBiZg` }}).
  //     then((response) => {
  //       setOrderDate(response.data.orderDate);
  //       setDeliveryDate(response.data.deliveryDate)
  //       setMealsArr(response.data.meals)
  //       // console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }, [selected]);

  // useEffect(() => {
  //   axios.put('http://localhost:3000/orders/update-delivery', {
  //     "orderId": `{{orders_id}}`,
  //     "userId": "{{ordersUser_id}}",
  //     "orderDate": "{{today}}",
  //     "deliveryDate": `${value}`
  // },{ headers: { "Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGM4MDA5OTYyNzU5Yzk4NWMyNjBiMDQiLCJlbWFpbCI6Ik9sYS5Nb3NjaXNraTEzQGhvdG1haWwuY29tIiwiaWF0IjoxNjkwOTM1MDA2fQ.vVRpJR6Jtv7HYXMPf0QGxA44fvOYgIXdM8u4g9qBiZg` }}).
  //     then((response) => {
  //       // console.log(response.data)
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }, [open]);

  const date = format(new Date(selected), 'MM-dd-yyyy');
  const orderDay = format(new Date(orders.orderDate), 'MM-dd-yyyy');
  const newDate = addBusinessDays(deliveryDate,restOfDays)


  const formatted = []
for(let i = 1; i <= restOfDays; i++){
  const labels = {}
  const dates = addBusinessDays(new Date(selected),i)
  labels.label = format(new Date(`${dates}`), 'MM-dd-yyyy')
  labels.value = i
  formatted.push(labels)
}


//replace orders.meal with mealsArr
  const meals = orders.meals.map((food,index) => {
    //adding 1 to index so users will not see the 0th index at start and see #1.
    return(
      <>
      <Text
      key = {index}
      style= {{
                fontSize: 15,
                color: 'white',
                padding: 10
              }}>Meal #{index+1}: {food}</Text>
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
                margin: 45,
                backgroundColor: "#0E4000",
                borderRadius: 20,
                padding: 15,
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

              <Text
              style= {{
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white',
                padding: 10
              }}>
                Order Information
              </Text>
              <Text
              style= {{
                fontSize: 15,
                color: 'white',
                padding: 5
              }}>Order Date: {orderDay}</Text>

              {meals}

              <Text
              style= {{
                fontWeight: 'bold',
                fontSize: 15,
                color: 'white',
                padding: 5
              }}>Delivery Date:</Text>
              <DropDownPicker
              textStyle={{ fontSize: 12 }}
              placeholder = {selected}
              placeholderStyle={{
                color: 'black',
              }}
              containerStyle={{
                width: 130,
              }}
              labelStyle={{
                textAlign: 'center', 
              }}
              open={open}
              value={value}
              items={formatted}
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
// console.log(formatted[formatted.length-1])

//get API from user to see what weekly date they'd want and use code to find all days and mark to dynamically render
const markedDates = {
  "2023-08-09": { selected: true, selectedColor: "#238A28" },
  "2023-08-16": { selected: true, selectedColor: "#238A28" },
  "2023-08-23": { selected: true, selectedColor: "#238A28" },
  "2023-08-30": { selected: true, selectedColor: "#238A28" },
};

  return (
    <>

        <CalendarList
        futureScrollRange={6}
        scrollEnabled={true}
          //Send it as an object or JSON
          //maybe day can be the delivery dates so that users cannot select other dates with a pop up modal
          // maxDate={formatted[formatted.length-1].label}
          onDayPress={(day) => {
            setSelected(day.dateString)
          }}
          markedDates={markedDates}
          theme={{
            textMonthFontSize: 20,
            calendarBackground: '#FFF7C6',
            textSectionTitleColor: '#238A28',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#238A28',
            // dayTextColor: '#2d4150',
          }}

        />


      {/* Conditionally render items for delivery dates */}

      {markedDates[selected] ? renderItem() : <></>}
    </>
  )
}
export default CalendarScreen;