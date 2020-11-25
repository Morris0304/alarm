import React, {useState, useEffect} from 'react';
import {FlatList, View, Text} from 'react-native';
import {Icon, Fab} from 'native-base';
import axios from 'axios';
import styles from '../styles';
import {axios_config, url} from './config';


export default function HomeScreen() {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [alarm, setAlarm] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
    <Text>{index+1}</Text>
    <Text style={styles.title}>{item.fields.Name}</Text>
    <Text>{item.fields.Time},</Text>
    <Text>{item.fields.Status}</Text>
    </View>
  );

  async function fetchData () {
      const result = await axios.get(get_url,axios_config);
      //console.log(result);
      setAlarm(result.data.records);
  }

  useEffect(() => {
    fetchData();
  },[modalVisible]);

  function update(){
    setModalVisible(false);
  }

 return (
   <View style={styles.container}>
   <FlatList 
    data={alarm} 
    renderItem = {renderItem}
    keyExtractor={(item, index) => ""+index}
    >
   </FlatList>
   {/* <Fab onPress={()=>setModalVisible(true)}>
     <Icon ios='ios-add' android="md-add"/>
   </Fab>
   <PersonAdd modalVisible = {modalVisible} update={update}/> */}
   </View>
   
 );
}