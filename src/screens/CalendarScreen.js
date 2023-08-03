import {  Text, View, StatusBar, TouchableOpacity, Modal, Pressable, Image, StyleSheet, TouchableWithoutFeedback, SafeAreaView} from "react-native";
import {Calendar, LocaleConfig,Agenda, DateData, AgendaEntry, AgendaSchedule, CalendarList} from 'react-native-calendars';
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { compareAsc, format, addDays, addBusinessDays, parseISO} from 'date-fns'
import {LogInScreenContext} from '../contexts/LogInScreenContext.jsx'
import {getMeals, getOrders, updateDeliveryDate} from '../utils/apis/api'



const CalendarScreen = ({navigation}) => {
  const { userInitData } = useContext(LogInScreenContext);
  const [selected, setSelected] = useState(null);
  const [items, setItems] = useState({})
  const [orderDate, setOrderDate] = useState(new Date())
  const [deliveryDate, setDeliveryDate] = useState(new Date())
  const [restOfDays,setRestOfDays] = useState(5)
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)
  const [fetchmeals, setFetchMeals] = useState([])
  const [userId, setUserId] = useState('')
  const [orderId, setOrderId] = useState('')
  const [label, setLabel] = useState('')
  const [userMeal, setUserMeal] = useState([])
  const [markedDates, setMarkedDates] = useState({});

  // console.log(userInitData.token)
  // console.log(userInitData.user._id)

  useEffect(() => {
    getOrders(userInitData.user._id, userInitData.token)
      .then((response) => {
        setUserMeal(response)

        const updatedMarkedDates = {}
        for (let i = 0; i < response.length; i++) {
          const deliveryDay = format(
            parseISO(response[i].deliveryDate),
            'yyyy-MM-dd'
          );
          console.log(response[i])
          updatedMarkedDates[deliveryDay] = {
            selected: true,
            selectedColor: '#238A28',
          };
        }
        setMarkedDates(updatedMarkedDates)

      })
      .catch((error) => {
        console.log(error)
      });
  }, []);


  const fetchMeals = async () => {
    try {
      let response = await getMeals(userInitData.token);
      setFetchMeals(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMeals()
  }, [])


  useEffect(() => {
    if(value !== null){
      updateDeliveryDate(userInitData.token, userInitData.user._id, format(orderDate, 'MM-dd-yyyy'), formatted[value - 1].label)
        .then((response) => {
          const updatedMarkedDates = { ...markedDates }
          updatedMarkedDates[selected] = undefined
          updatedMarkedDates[formatted[value - 1].label] = {
            selected: true,
            selectedColor: "#238A28",
          };
          setMarkedDates(updatedMarkedDates);
        })
        .catch((error) => {
          console.log("Error updating data:",error);
        })
    }
  }, [value]);

  // useEffect(() => {
  //   axios.get(`http://localhost:3000/api/orders/user/${userInitData.user._id}?count=5&page=1`, { headers: { "Authorization" : `Bearer ${userInitData.token}` }})
  //     .then((response) => {
  //       setUserMeal(response.data)
  //       const updatedMarkedDates = {};
  //       for (let i = 0; i < response.data.length; i++) {
  //         const deliveryDay = format(
  //           parseISO(response.data[i].deliveryDate),
  //           'yyyy-MM-dd'
  //         );
  //         updatedMarkedDates[deliveryDay] = {
  //           selected: true,
  //           selectedColor: '#238A28',
  //         };
  //       }
  //       setMarkedDates(updatedMarkedDates);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }, []);


  // const fetchMeals = async () => {
  //   try {
  //     let response = await axios.get('http://localhost:3000/api/meals?count=10', { headers: { "Authorization" : `Bearer ${userInitData.token}` }});
  //     setFetchMeals(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchMeals();
  // }, []);


  // useEffect(() => {
  //   if(value !== null){
  //     axios({
  //       method: "PUT",
  //       url: 'http://localhost:3000/api/orders/update-delivery',
  //       headers: {"Authorization" : `Bearer ${userInitData.token}`},
  //       data: {
  //               "orderId": orderId,
  //               "userId": userId,
  //               "orderDate": format(orderDate, 'MM-dd-yyyy'),
  //               "deliveryDate": formatted[value - 1].label
  //           }
  //       })
  //       .then((response) => {

  //         const updatedMarkedDates = { ...markedDates }
  //         updatedMarkedDates[selected] = undefined
  //         updatedMarkedDates[formatted[value - 1].label] = {
  //           selected: true,
  //           selectedColor: "#238A28",
  //         };
  //         setMarkedDates(updatedMarkedDates);
  //       })
  //       .catch((error) => {
  //         console.log("Error updating data:",error);
  //       })
  //   }
  // }, [value]);

  const formatted = []
  for(let i = 1; i <= restOfDays; i++){
  const labels = {}
  const dates = addBusinessDays(new Date(selected),i)
  labels.label = format(new Date(`${dates}`), 'MM-dd-yyyy')
  labels.value = i
  formatted.push(labels)
}

useEffect(() => {
    if (selected !== null) {
      const selectedDateOrders = userMeal.find(
        (order) => format(parseISO(order.deliveryDate), 'yyyy-MM-dd') === selected
      );

      if (selectedDateOrders) {
        setUserId(selectedDateOrders.userId);
        setOrderId(selectedDateOrders.orderId);
      }
    }
  }, [selected]);

if(userMeal && userMeal.length > 0){

  const mapCal = userMeal.map((orders) => {

    const orderDay = format(parseISO(orders.orderDate), 'MM-dd-yyyy')
    // console.log(orderDay)
    const date = format(new Date(selected), 'MM-dd-yyyy');
    // console.log('testdate', deliveryDay)
    let filteredMeals = fetchmeals.filter((e) => orders.meals.includes(e._id)).map((e) => e.name);
    const meals = filteredMeals.map((name, index) => {
      //adding 1 to index so users will not see the 0th index at start and see #1.
      return (
        <Text
          key={index}
          style={{
            fontSize: 15,
            color: 'white',
            padding: 10,
          }}
        >
          Meal #{index + 1}: {name}
        </Text>
      );
    });


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
            label = {label}
            value={value}
            items={formatted}
            setOpen={setOpen}
            setValue={setValue}
            setLabel={setLabel}
            setItems={setItems}
            />
          </View>
        </View>
      </Pressable>
      </Modal>
      </View>
    )
  })
} else {
  return (
    <SafeAreaView>
      <Text
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >Loading...</Text>
    </SafeAreaView>
  );
}



if(Object.keys(markedDates).length > 0){
  return (
    <>
    <SafeAreaView>
        <CalendarList
        pastScrollRange={2}
        futureScrollRange={2}
        scrollEnabled={true}
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

      {markedDates[selected] ? mapCal : <></>}
      </SafeAreaView>
    </>
  )
}
}
export default CalendarScreen;