import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import AlarmClock from 'react-native-alarm-clock';
import {axios_config, url} from './config';
import axios from 'axios';
import * as Notifications from 'expo-notifications';


// const create = () => {
//   let date = new Date();
//   date.setDate(date.getDate() + 1);
//   date.setHours(9, 55);

//   AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');
// };

//const [date, setDate] = useState('');

// function create () {
//     const [date, setDate] =useState(Date);
//     setDate(date.getDate() + 1);
//     date.setHours(10, 17);
//     console.warn(date)
//     AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');
    
//   };

Notifications.scheduleNotificationAsync({
    content: {
      title: "Time's up!",
      body: 'Change sides!',
      sound: 'default',
    },
    trigger: {
      seconds: 10,
      //repeats: true
    },
  });



    

export default function App() {
    
    // 取得時間
    const moment = require('moment');
    // const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
    const currentDateTime = moment().format('HH:mm:ss');
    console.log(currentDateTime);


    const get_url=url+"?maxRecords=50&view=Grid%20view";

    const [alarm, setAlarm] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');


    async function fetchData () {
        const result = await axios.get(get_url,axios_config);
        //console.log(result);
        setAlarm(result.data.records);
        //setDate(alarm.fields.Time);
        // console.log(alarm)
        console.log(alarm.Time)
        console.log(date)

    }

    useEffect(() => {
      fetchData();
    //   if (currentDateTime === alarm.Time){

    //   }
    },[modalVisible]);
    
    function update(){
        setModalVisible(false);
      }
  return (
    <View style={styles.container}>
      {/* <Button title="Create Alarm at 1:55PM" onPress={() => create()} /> */}
      
      <Button title="Create Alarm at 10:10PM" />
      {alarm.map((item)=>(
     <Text>時間{item.fields.Time}</Text>
     ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});