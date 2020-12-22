import React, {useState} from 'react';
import {Button, View, Text, TextInput, Modal } from 'react-native';
import axios from 'axios';
import styles from '../styles';

export default function SignIn({navigation}) {


  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [persons,setPersons] = useState([]);
  
  const axios_config = {
    headers: {
      'Authorization': 'Bearer keyi2ADHz7suoWkJ0',
      'Content-Type': 'application/json'}
  };
  const url="https://api.airtable.com/v0/apphKXGnHFSeqIixf/user?maxRecords=3&view=Grid%20view"; 

  async function fetchData () {
    const result = await axios.get(url,axios_config);      
    setPersons(result.data.records); 
  }

  async function signIn(){
    try {
      // const res= firebase.auth()
      //   .signInWithEmailAndPassword(email, password);
      console.log('User login successfully!');
      setID('');
      setPassword('');
      setMessage('');
    }
    catch(error){
      setMessage(error.message);
    } 
   };
  return(
    <View style={styles.accform}>
      <Text style={styles.acclogo}> LOGIN </Text>
      <View style={styles.accinputView}>
      <TextInput
        style={styles.accinputStyle}
        placeholderTextColor="#003f5c"
        placeholder="帳號"
        value={ID}
        onChangeText={text=>setID(text)}
      /></View>
      <View style={styles.accinputView}>
      <TextInput
        style={styles.accinputStyle}
        placeholderTextColor="#003f5c"
        placeholder="密碼"
        value={password}
        onChangeText={text=>setPassword(text)}
        maxLength={15}
        secureTextEntry={true}
      /></View> 

      <View style={styles.accloginBtn}>
      <Button
        title="Login"
        onPress={signIn}
        color="#ffffff"
      /></View>
      <Text>{message}</Text>
      <Button
        title="Signup"
        onPress={() => navigation.navigate('SignUp')}
        color="#ffffff"
        />

    </View>
  )
}