import React, {useState,useEffect} from 'react';
import {Button, View, Text, TextInput,Navigator,Alert,FlatList} from 'react-native';
import axios from 'axios';
import styles from '../styles';
import SignIn from './SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const alertMessage = '註冊成功，請前往登入！';
const alertErrorMessage = '註冊失敗，請重新輸入！';

export default function SignUp({props,navigation}) {

  const [persons,setPersons] = useState([]);
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");


    const axios_config = {
        headers: {
          'Authorization': 'Bearer keyi2ADHz7suoWkJ0',
          'Content-Type': 'application/json'}
      };
      const url="https://api.airtable.com/v0/apphKXGnHFSeqIixf/user"; 

      async function fetchData () {
        const result = await axios.get(url,axios_config);
        //console.log('result',result);      
        setPersons(result.data.records); 
      }
      useEffect(() => {
        fetchData();
      },[]);

  
  async function sendData () {
    const newPerson={
      fields:{
        ID:ID,
        password:password,
      }
    }

    Alert.alert(
      '註冊成功！',
      alertMessage,
      [
        {text: 'OK', onPress: () => navigation.navigate('SignIn')},
      ]
    )
    
    try {
        const result = await axios.post(url,newPerson, axios_config);
        console.log(result);
        props.update();
    }
    catch (e){
      console.log("error:"+e);
    }
}

let acc=[];
const renderItem = ({ item,index }) => {
  acc.push(item.fields.ID);
  return (
    <View>
    <Text>{index}</Text>
    <Text style={styles.title}>{item.fields.ID}</Text>
    </View>
  )
};

function compare(){
  if(acc.includes(ID)){
    return false;
  }return true;
}

function Press(){
  const res = compare();
  if((res == true) &&(ID && password != null)){
    sendData();
  }else{
    Alert.alert(
      '註冊失敗',
      alertErrorMessage,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed!')},
      ]
    )
  }
  
  setID("");
  setPassword("");

}
  
  return(
    <View style={styles.accform}>
    <Text style={styles.acclogo}> SIGNUP </Text>
    <View style={styles.accinputView}>
    <TextInput style={styles.accinputStyle}
     placeholderTextColor="#003f5c"
     placeholder="帳號"
     value={ID} 
     onChangeText={text=>setID(text)}/></View>
    <View style={styles.accinputView}> 
    <FlatList 
    data={persons} 
    renderItem = {renderItem}
    keyExtractor={(item, index) => ""+index}
    ></FlatList>
    <TextInput style={styles.accinputStyle}
    placeholderTextColor="#003f5c" 
    placeholder="密碼" 
    value={password} 
    onChangeText={text=>setPassword(text)} 
    maxLength={15} 
    secureTextEntry={true}/></View>
    

    <View style={styles.accloginBtn}>
      <Button
        title="SignUp"
        onPress={Press}
        color="#ffffff"
      /></View>
      <Button        
        title="Login"
        onPress={() => navigation.navigate('SignIn')}
        color="#ffffff"
        />

    </View> 
    
  );
}