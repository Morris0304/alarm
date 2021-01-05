import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {axios_config, url} from './config';
import { View, Text, Button, ImageBackground, Layout ,TextInput} from 'react-native';
import {CheckBox} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Datepicker,Toggle } from '@ui-kitten/components';
import { Switch, StyleSheet, StatusBar } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { FAB, Portal, Provider, Title, Paragraph, IconButton } from 'react-native-paper';
import { Container, Header, Fab, Icon, Image,Space} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import styles from '../styles';
import { Divider } from 'react-native-elements';
import moment from "moment/moment";

export default function UpdateAlarm({ navigation }) {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [Name, setName] = useState("");
  const [Time, setTime] = useState("");
  const [Day, setDay] = useState("");
  const [Status, setStatus] = useState("");
  const [Repeat, setRepeat] = useState("");

  useEffect(()=>{
    setName(props.person.Name);
    setTime(props.person.Time);
    setDay(props.person.Day);
    setStatus(props.person.Status);
    setRepeat(props.person.Repeat);
  },[props.id]);

  function update(){
    async function sendData () {
      // if id exists, assign a newPerson with id
      // else assign a newPerson without id
      const newAlarm = props.id 
      ?{records:[{
        id: props.id,
        fields:{
          Name:name,
          Time:time,
          Day:day,
          Status:status,
          Repeat:repeat
        }}]
      }
      :{fields:{
          Name:name,
          Time:time,
          Day:day,
          Status:status,
          Repeat:repeat
      }}

      try {
      // if id exists, call put
      // else call post      
      const result = props.id
        ?await axios.put(url,newAlarm, axios_config)
        :await axios.post(url,newAlarm, axios_config);
      props.hide();}
      catch (e){
        console.log("error:"+e);
      }
    }
    sendData();
  }

  return (
    <Modal visible={props.modalVisible}>
      <TextInput placeholder="姓名" value={name} onChangeText={text=>setName(text)}/>
      <TextInput placeholder="時間" value={time} onChangeText={text=>setTime(text)}/>
      <TextInput placeholder="星期" value={day} onChangeText={text=>setDay(text)}/>
      <TextInput placeholder="開關" value={status} onChangeText={text=>setStatus(text)}/>
      <TextInput placeholder="重複" value={repeat} onChangeText={text=>setRepeat(text)}/>
      <Button onPress={update} title="確定"/>
      <Button onPress={props.hide} title="取消"/>
    </Modal>
  );
}