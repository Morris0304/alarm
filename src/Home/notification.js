import * as React from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useState, useEffect, useRef } from 'react';
import { View, Button, Platform } from 'react-native';
import {axios_config, url} from './config';
import axios from 'axios';

import { useDispatch } from 'react-redux'
import { authLogin } from '../store/action/index'


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        soundName: './ring1.mp3',
    }),
});

async function sendPushNotification(expoPushToken) {
    console.log('來了')

    Notifications.scheduleNotificationAsync({
            content: {
              title: "鬧鐘",
              body: '時間到！！！',
              sound: 'default',
            },
            trigger: {
                seconds: 5,
            
             },
    });
    console.log('哈哈')
}
  
async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        //console.log('token:',token);
    } 
    else {
        alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

  
export default function App() {
    //接值
    const get_url=url+"?maxRecords=50&view=Grid%20view";

    const [alarm, setAlarm] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');

    async function fetchData () {
        const result = await axios.get(get_url,axios_config);
        setAlarm(result.data.records);
        //setDate(alarm.fields.Time);

    }
    const dispatch = useDispatch()
    dispatch(authLogin())

    useEffect(() => {
        fetchData();
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token).then(dispatch(authLogin())));
    
        // 取得時間
        const moment = require('moment');
        const currentDateTime = moment().format('HH:mm');

        for (i=0;i<alarm.length;i++){
            if(moment(alarm[i].fields.Time).format('HH:mm') == currentDateTime){
            
                sendPushNotification()
                // gogo()
                
                console.log("響")
            } 
        }
   
    console.log("123")
    // dispatch(authLogin())
    });

    
    
    function update(){
        setModalVisible(false);
    }




    //通知
    const [expoPushToken, setExpoPushToken] = useState('');

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
        {/* <Button
            title="Press to Send Notification"
            onPress={async () => {
                await sendPushNotification(expoPushToken);
            }}
        /> */}
        </View>
    );
  }
  