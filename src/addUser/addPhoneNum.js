import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import styles from '../styles';
import {axios_config, url} from './config';
import { View, Text, Button, ImageBackground, Layout, TextInput } from 'react-native';
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


export default function addPhoneNum() {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [phone, setPhone] = useState([]);

  
  const [modalVisible, setModalVisible] = useState(false);

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };


  async function sendData () {
    const newUser={
      fields:{
        ID:phone
      }
    }
    //console.log(newPerson);
    try {
      const result = await axios.post(get_url,newUser, axios_config);
      console.log(result);
      //setPersons(result.data.records);
      props.update();
    }
    catch (e){
      console.log("error:"+e);
    }
}
  
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.inputStyle}
        placeholder="手機號碼"
        value={phone}
        onChangeText={text=>setPhone(text)}
        />
        <Button onPress={sendData} title="確認"/>
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