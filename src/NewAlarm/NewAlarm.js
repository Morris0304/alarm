import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import styles from '../styles';
import {axios_config, url} from './config';
import { View, Text, Button, ImageBackground, Layout } from 'react-native';
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


export default function NewAlarm() {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [alarmName, setAlarmName] = useState([]);
  const [time, setTime] = useState([]);
  const [game, setGame] = useState([]);
  const [day, steDay] = useState([]);
  
  const [modalVisible, setModalVisible] = useState(false);

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleConfirmd = (date) => {
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };

    const handleConfirmt = (time) => {
      console.warn("A time has been picked: ", time);
      hideTimePicker();
    };

  
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
        <Button title="選擇日期" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          locale="zh-Cn"
          onConfirm={handleConfirmd}
          onCancel={hideDatePicker}
          isDarkModeEnabled={false}
        />
        <Button title="選擇時間" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          locale="zh-Cn"
          onConfirm={handleConfirmt}
          onCancel={hideTimePicker}
          isDarkModeEnabled={false}
        />
        </ImageBackground>
      </View>
    );
  

  // const renderItem = ({ item, index }) => (
  //   <View style={styles.item}>
  //   <Text>{index+1}</Text>
  //   <Text style={styles.title}>{item.fields.Name}</Text>
  //   <Text>{item.fields.City},</Text>
  //   <Text>{item.fields.Age}</Text>
  //   </View>
  // );

  async function fetchData () {
      const result = await axios.get(get_url,axios_config);
      //console.log(result);
      setAlarmName(result.data.records);
  }

  useEffect(() => {
    fetchData();
  },[modalVisible]);

  function update(){
    setModalVisible(false);
  }
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    minHeight: 500
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  button: {
    marginTop:"5%"
  },
});

//  return (
//    <View style={styles.container}>
//    <FlatList 
//     data={persons} 
//     renderItem = {renderItem}
//     keyExtractor={(item, index) => ""+index}
//     >
//    </FlatList>
//    <Fab onPress={()=>setModalVisible(true)}>
//      <Icon ios='ios-add' android="md-add"/>
//    </Fab>
//    <PersonAdd modalVisible = {modalVisible} update={update}/>
//    </View>
   
//  );
