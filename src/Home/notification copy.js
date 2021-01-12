// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as React from 'react';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { useState, useEffect, useRef } from 'react';
import { View, Button, Platform } from 'react-native';
import { Audio } from 'expo-av';
import ring1 from './ring1.mp3';
import {axios_config, url} from './config';
import axios from 'axios';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        soundName: './ring1.mp3',
    }),
});

// Notifications.scheduleNotificationAsync({
//     content: {
//       title: "10秒會自動發",
//       body: 'Change sides!',
//       sound: 'default',
//     },
//     // trigger: {
//     //   seconds: 10,
//     //   //repeats: true
//     // },
// });

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
//按第一個button

// async function sendPushNotification(expoPushToken) {
//     console.log('來了')
//     const message = {
//         to: expoPushToken,
//         sound: 'default',
//         title: '鬧鐘',
//         body: '起床',
//         data: { data: 'goes here' },
//     };
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
    // const message = {
    //     to: expoPushToken,
    //     sound: 'default',
    //     title: '鬧鐘',
    //     body: '起床',
    // };
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

    // // 取得時間
    // const moment = require('moment');
    // // const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
    // const currentDateTime = moment().format('HH:mm:ss');
    // //console.log(currentDateTime);

    //接值
    const get_url=url+"?maxRecords=50&view=Grid%20view";

    const [alarm, setAlarm] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState('');

    async function fetchData () {
        const result = await axios.get(get_url,axios_config);
        //console.log(result);
        //console.log(result.data.records[0].fields.Time)
        setAlarm(result.data.records);
        //setDate(alarm.fields.Time);
        // console.log(alarm)
        // console.log('1',alarm)
        // console.log('2',date)

    }

    useEffect(() => {
        fetchData();
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // // This listener is fired whenever a notification is received while the app is foregrounded
        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     setNotification(notification);
        // });
    
        // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log(response);
        // });
      

        // 取得時間
        const moment = require('moment');
        // const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');
        const currentDateTime = moment().format('HH:mm');
        //console.log(currentDateTime);

      for (i=0;i<alarm.length;i++){
          if(moment(alarm[i].fields.Time).format('HH:mm') == currentDateTime){
            
            sendPushNotification()
            // gogo()
            
            console.log("響")
          } 
         // console.log('沒得響')
      }
    //   if (currentDateTime === alarm.Time){
    //     scheduleAndCancel()
    //   }
    console.log("123")
    // return () => {
    //         Notifications.removeNotificationSubscription(notificationListener);
    //         Notifications.removeNotificationSubscription(responseListener);
    // }
    });
    
    function update(){
        setModalVisible(false);
    }




    //通知
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const [sound, setSound] = React.useState();
    const [playingStatus, setPlayingStatus] = useState('nosound');

    // async function scheduleAndCancel() {
    //     console.log('進來了')
    //     const identifier = await Notifications.scheduleNotificationAsync({
    //       content: {
    //         title: 'Hey!',
    //       },
    //       //trigger: { seconds: 5, repeats: true },
    //     });
    //     await Notifications.cancelScheduledNotificationAsync(identifier);
    //   }

    // async function playRecording() {
    //     const [sound, setSound] = await Audio.Sound.create(
    //       source,
    //       {
    //         shouldPlay: true,
    //         isLooping: true,
    //       },
    //     );
    //     setSound(sound);
    //     setPlayingStatus('playing');
    //   }

    // async function playSound() {
    //     console.log('Loading Sound');
    //     const { sound } = await Audio.Sound.createAsync(
    //     require('./ring1.mp3'),
    //     {
    //         shouldPlay: true,
    //         isLooping: false,
    //       },
    //     );
    //     setSound(sound);
    //     setPlayingStatus('playing');

    //     console.log('Playing Sound');
    //     await sound.playAsync(); 
    // }
      

    // async function pauseAndPlayRecording() {
    //     if (sound != null) {
    //       if (playingStatus == 'playing') {
    //         console.log('pausing...');
    //         await this.sound.pauseAsync();
    //         console.log('paused!');
    //         setPlayingStatus('donepause');
    //       } 
    //       else {
    //         console.log('playing...');
    //         await this.sound.playAsync();
    //         console.log('playing!');
    //         setPlayingStatus('playing');
    //       }
    //     }
    //   }
      

    // async function playAndPause () {
    //     switch (playingStatus) {
    //       case 'nosound':
    //         playSound();
    //         break;
    //       case 'donepause':
    //       case 'playing':
    //         pauseAndPlayRecording();
    //         break;
    //     }
    //   }

    // const gogo = () => {
    //     console.log('hihi')
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //         setNotification(notification);
    //     });
  
    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //         console.log(response);
    //     });
  
    //   return () => {
    //     Notifications.removeNotificationSubscription(notificationListener);
    //     Notifications.removeNotificationSubscription(responseListener);
    //     sound ? () => {
    //         console.log('Unloading Sound');
    //         sound.unloadAsync(); }
    //         : undefined;
    //   };
    // };
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
        <Button
            title="Press to Send Notification"
            onPress={async () => {
                await sendPushNotification(expoPushToken);
            }}
        />
        {/* <Button title="Play Sound" onPress={playSound} />
        <Button title="Pause Sound" onPress={playAndPause} /> */}
        {/* <Button title="STOP" onPress={scheduleAndCancel} /> */}
        
        </View>
    );
  }
  

// const handleScheduleNotification = (title, message) => {
//     const date = new Date();
//     date.setSeconds (date.getSeconds () + 5);
//     PushNotificationIOS.addNotificationRequest({ 
//         alertTitle: title, 
//         alertBody: message, 
//         fireDate: date.toISOstring(),
//      });
//  };

//  export {handleScheduleNotification};
