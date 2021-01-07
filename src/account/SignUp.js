import React, {useState} from 'react';
import {Button, View, Text, TextInput,Navigator,Modal,Alert} from 'react-native';
import axios from 'axios';
import styles from '../styles';
import SignIn from './SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const alertMessage = '註冊成功，請前往登入！';
const alertErrorMessage = '註冊失敗，請重新輸入！';

export default function SignUp({props,navigation}) {


  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");


    const axios_config = {
        headers: {
          'Authorization': 'Bearer keyi2ADHz7suoWkJ0',
          'Content-Type': 'application/json'}
      };
      const url="https://api.airtable.com/v0/apphKXGnHFSeqIixf/user"; 

  
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
        //setPersons(result.data.records);
        props.update();
    }
    catch (e){
      console.log("error:"+e);
    }
}
function Press(){
  ID && password != null ? sendData():Alert.alert(
    '註冊失敗',
    alertErrorMessage,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  )
  
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