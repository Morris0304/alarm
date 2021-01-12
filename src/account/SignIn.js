import React, {useState,useEffect} from 'react';
import {Button, View, Text, TextInput, Modal,FlatList, Alert,ScrollView,RefreshControl } from 'react-native';
import axios from 'axios';
import styles from '../styles';
import Home from '../Home/HomeScreen';

import { useDispatch } from 'react-redux'
import { authLogin, setuserID } from '../store/action/index'


export default function SignIn({navigation,props}) {

  const dispatch = useDispatch()

  const alertMessage="帳號或密碼錯誤！";
  const [ID, setID] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [persons,setPersons] = useState([]);
  const [refreshing,setRefreshing] = useState(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    fetchData().then(() => setRefreshing(false));
  }, []);


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

  let acc=[];
  let pass=[];
  
  const renderItem = ({ item,index }) => {
    acc.push(item.fields.ID);
    pass.push(item.fields.password);
    return (
      <View>
      <Text>{index}</Text>
      <Text style={styles.title}>{item.fields.ID}</Text>
      <Text>{item.fields.password},</Text>
      </View>
    )
  };

  function compare(){
    if(acc.includes(ID)==true){
      var acc_index = acc.indexOf(ID);
      if(pass[acc_index]===password){
         return true
      }else
      { 
        return false 
      }
    }
  }

  async function signIn(){
    try {
      const res = compare();
      if(res) {
        dispatch(setuserID(ID))
        navigation.navigate('notification')
        // dispatch(authLogin())
      }else{
        Alert.alert('登入失敗！',alertMessage,[{text: 'OK', onPress: () => console.log('OK Pressed!')}]);
      }
      setID("");
      setPassword("");
      setMessage("");
      
    }
    catch(error){
      setMessage(error.message);
    } 
   };
  return(
    <ScrollView style={{backgroundColor:'#003f5c'}} 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
     <View style={styles.signform}>
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
      
      <FlatList 
    data={persons} 
    renderItem = {renderItem}
    keyExtractor={(item, index) => ""+index}
    ></FlatList>

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
    </ScrollView>
  )
  
}