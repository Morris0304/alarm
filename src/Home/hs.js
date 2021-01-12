import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import styles from '../styles';
import {axios_config, url} from './config';
import { FlatList, View, Text, Button, ImageBackground, Layout,  ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator, useCardAnimation } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Datepicker,Toggle, MenuItem, OverflowMenu  } from '@ui-kitten/components';
import { Switch, StyleSheet, StatusBar,RefreshControl,SafeAreaView,TouchableHighlight } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FAB, Portal, Provider, Title, Paragraph, IconButton } from 'react-native-paper';
import { Container, Header, Fab, Icon, Image,Space} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import moment from 'moment/moment';
import NewAlarm from '../NewAlarm/NewAlarm';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { colors } from 'react-native-elements';
import { Size } from '@ui-kitten/components/devsupport';
import OptionsMenu from "react-native-option-menu";
import Airtable, { Record } from 'airtable';
import UpdateAlarm from '../NewAlarm/UpdateAlarm';
import { useDispatch, useSelector } from 'react-redux'
import { authLogin, authLogout } from '../store/action/index'
import Notification from './notification'


export default function HomeScreen({navigation}) {

  const dispatch = useDispatch();
  
  const userId = useSelector(state=>state.authReducer.userID);

  console.warn('userId', userId);

  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'key7kYifU3zDRcM3K'}).base('apphKXGnHFSeqIixf');
  const get_url=url+"?maxRecords=50&view=Grid%20view";
  
  const [input, setInput] = useState(false);
  const [alarm, setAlarm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [refreshing,setRefreshing] = useState(false);
  const [alarmNotice, setAlarmNotice] = useState();
  


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchData().then(() => setRefreshing(false));
  }, []);

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

 

  async function fetchData () {
      const result = await axios.get(get_url,axios_config);

      const userAlarm = [];
      for(i=0;i<result.data.records.length;i++){
        if(result.data.records[i].fields.userId == userId){
          userAlarm.push(result.data.records[i])
          console.log(result.data.records[i])
        }
      }
      console.log("userAlarm",[...userAlarm])
      setAlarm([...userAlarm]);
      console.log("alarm",alarm)
      //console.warn(result.data.records)
  }

  async function fetchData_alarm () {
    const result = await axios.get(get_url,axios_config);
    setAlarmNotice(result.data.records);
    //setDate(alarm.fields.Time);

}

  useEffect(() => {
    console.log("in useEffect");
    fetchData();
    fetchData_alarm();
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // 取得時間
    const moment = require('moment');
    const currentDateTime = moment().format('HH:mm');

    for (i=0;i<alarmNotice.length;i++){
        if(moment(alarmNotice[i].fields.Time).format('HH:mm') == currentDateTime){
        
            sendPushNotification()
            // gogo()
            
            console.log("響")
        } 
    }
   
    console.log("123")
  });

  function press(){
    Alert.alert(
      "登出",
      "確定要登出嗎？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "登出", onPress: () => dispatch(authLogout()) }
      ],
      { cancelable: false }
    );
  }


  const onChange = (id) => {
    //找到要改的那個switch的index(用id判斷)
    const findAlarmIndex = alarm.findIndex(item=>item.id === id)

    //複製一份出來
    const temp = [...alarm]
    //改那個switch的status 如果本來是ＯＮ改成ＯＦＦ 反之
    temp[findAlarmIndex].fields.Status = temp[findAlarmIndex].fields.Status === 'ON' ? 'OFF' : 'ON'
    setAlarm(temp)

    base('alarm').update(id, {
      "Status": temp[findAlarmIndex].fields.Status,
    }, function(err, record) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(record.get('Status'));
    });
  }


  async function deleteAlarm(id){
    console.warn('selectedId', id)
    Alert.alert(
      "刪除鬧鐘",
      "確定要刪除嗎？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "是", onPress: () =>  
        base('alarm').destroy([id], function(err, deletedRecords) {
          if (err) {
            console.error(err);
            return;
          }
          Alert.alert("刪除成功！")    
        }) }
      ],
      { cancelable: false }
    );
  }

  useEffect(()=>{
    console.log('alarm', alarm)
  }, [alarm])

  function press(){
    Alert.alert(
      "登出",
      "確定要登出嗎？",
      [
        {
          text: "取消",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "是", onPress: () => dispatch(authLogout()) }
      ],
      { cancelable: false }
    );
  }

  const MoreIcon = {uri:"https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"};
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground style={styles.form}>
      
      
      <ScrollView style={{backgroundColor:'#003f5c'}} 
    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {
        alarm && alarm.map(( item )=>(
          <TouchableOpacity>
            <Card style={{padding: 15, 
              margin: 10, 
              cornerRadius:30,
              alignSelf:'center', 
              backgroundColor: 'rgba(1000, 1000, 1000, 0.9)', 
              borderRadius: 25}} keyExtractor={(item, index) => ""+index}
              key={item.fields.id}>
              <View style={{flexDirection:'row'}}><Icon name="alarm" style={{marginLeft:10}}/><Text style={{fontSize:15, marginTop:8}}>  {item.fields.Name}</Text></View>
              <Switch style={styles.switch}
                    trackColor={{ false: "#767577", true: "#fb5b5a" }}
                    // 如果這個switch的狀態是on, color => f4f3f4
                    thumbColor={item.fields.Status === 'ON' ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>onChange(item.id)}
                    value={item.fields.Status === 'ON' ? true : false}
                    keyExtractor={(item, index) => ""+index}
                    key={item.fields.id}
                  />
              <Text style={styles.text}>{moment(item.fields.Time).format('H:mm')}</Text>
              <Text style={{marginLeft:13,marginTop:5,color:'#fb5b5a'}}>{item.fields.Day}</Text>
                  <OptionsMenu
                    button={MoreIcon}
                    buttonStyle={{ width: 40, height: 28, margin: 7.5, marginLeft:270,marginTop:-20, resizeMode: "contain" }}
                    destructiveIndex={1}
                    options={["編輯鬧鐘", "刪除鬧鐘", "取消"]}
                    actions={[() => navigation.navigate('UpdateAlarm', {item }) , ()=>deleteAlarm(item.id)]}
                     />
              </Card>
              
              </TouchableOpacity>
              
        ))
        
      }
      </ScrollView>
      <View style={styles.acclogout}>
        <Button onPress={press} color="#ffffff" title="登出"/>
      </View>
   
    </ImageBackground>
    </View>
    
  );

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
}
