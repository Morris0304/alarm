import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import styles from '../styles';
import {axios_config, url} from './config';
import { FlatList, View, Text, Button, ImageBackground, Layout,  ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import Airtable from 'airtable';
import UpdateAlarm from '../NewAlarm/UpdateAlarm';



export default function HomeScreen({navigation}) {
  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'key7kYifU3zDRcM3K'}).base('apphKXGnHFSeqIixf');
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [alarm, setAlarm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [alarms, setAlarms] = useState({
    Name:"",
    Time:"",
    Day:"",
    Status:"",
    Repeat:"",
  });

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  // const renderItem = ({ item, index }) => (
  //   <View style={styles.item}>
  //     <Text style={styles.title}>{item.fields.Time}</Text>
  //     <Text>{item.fields.Name}</Text>
  //   </View>
  // );

  async function fetchData () {
      const result = await axios.get(get_url,axios_config);
      setAlarm(result.data.records);
      console.warn(result.data.records)
  }

  useEffect(() => {
    console.log("in useEffect");
    fetchData();
  },[modalVisible]);

  function update(){
    setModalVisible(false);
  }

  const onChange = (id) => {
    const findAlarmIndex = alarm.findIndex(item=>item.id === id)
    const temp = [...alarm]
    temp[findAlarmIndex] = temp[findAlarmIndex].Status === 'ON' ? 'OFF' : 'ON'
    console.log('temp', temp)
    // setAlarm(temp)
  }

  async function editAlarm(){
<<<<<<< HEAD
    
=======
    () => navigation.navigate('UpdateAlarm')
    const id = "morris";
    props.update(id)

>>>>>>> 8e666a29e0bbba95521045544dce883b933c9fdb
  }

  async function deleteAlarm(){
    console.log(selectedId)
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
        base('alarm').destroy([selectedId], function(err, deletedRecords) {
          if (err) {
            console.error(err);
            return;
          }
          Alert.alert("刪除成功！")    
        }) }
      ],
      { cancelable: false }
    );
    console.warn('id',selectedId)
  }

  useEffect(()=>{
    console.log('alarm', alarm)
  }, [alarm])

  const MoreIcon = {uri:"https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/more-512.png"};
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground style={styles.form}>
      {/* <Text style={styles.text}>早安🥰</Text> */}
      {/* <FlatList
      data={alarm} 
      renderItem = {renderItem} 
      keyExtractor={(item, index) => ""+index}>
      </FlatList> */}
      
      <ScrollView>
      {
        alarm && alarm.map(( item )=>(
          <TouchableOpacity onPress={()=> setSelectedId(item.id)}>
            <Card style={{padding: 15, 
              margin: 10, 
              cornerRadius:30,
              alignSelf:'center', 
              backgroundColor: 'rgba(1000, 1000, 1000, 0.9)', 
              borderRadius: 25}} keyExtractor={(item, index) => ""+index}
              key={item.fields.id}>
                {/* <Icon name="alarm" style={{marginLeft:10}}><Text style={{fontSize:20, marginLeft:20}}>{item.fields.Name}</Text></Icon> */}
              <Text style={styles.text}>{moment(item.fields.Time).format('H:mm')}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: "#767577", true: "#fb5b5a" }}
                    thumbColor={item.fields.Status === 'ON' ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>onChange(item.id)}
                    value={item.fields.Status === 'ON' ? true : false}
                    keyExtractor={(item, index) => ""+index}
                    key={item.fields.id}
                  />
                  <OptionsMenu
                    onPress={()=> setSelectedId(item.id)}
                    button={MoreIcon}
                    buttonStyle={{ width: 40, height: 28, margin: 7.5, marginLeft:290,marginTop:10, resizeMode: "contain" }}
                    destructiveIndex={1}
                    onPress={()=> setSelectedId(item.id)}
                    options={["編輯鬧鐘", "刪除鬧鐘", "取消"]}
<<<<<<< HEAD
                    actions={[editAlarm , deleteAlarm]} />
=======
                    actions={[() => navigation.navigate('UpdateAlarm') , deleteAlarm]}
                    onPress={()=> setSelectedId(item.id)}
                     />
                     
>>>>>>> 8e666a29e0bbba95521045544dce883b933c9fdb
                   {/* <Text>{switchValue ? 'Switch is ON' : 'Switch is OFF'}</Text> */}
                  {/* <Text style={styles.text1}>{item.fields.Day}</Text> */}
                  {/* <UpdateAlarm id={item.id}/> */}
              </Card>
              
              </TouchableOpacity>
              
        ))
        
      }
      </ScrollView>
      
    <Provider>
      <Portal>
        <FAB.Group 
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'plus', 
              onPress: () => navigation.navigate('addPhoneNum') },
            {
              icon: 'star',
              label: 'Star',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              label: 'Remind',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
    </ImageBackground>
    </View>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: "center",
//     // justifyContent: "center",
//     flexDirection: "column",
//     minHeight: 500
//   },
//   image: {
//     flex: 1,
//     resizeMode: "cover",
//     justifyContent: "center"
//   },
//   text: {
//     color: "white",
//     fontSize: 42,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#000000a0"
//   },
//   button: {
//     marginTop:"5%"
//   },
// });


  

//  return (
//    <View style={styles.container}>
//    <FlatList 
//     data={alarm} 
//     renderItem = {renderItem}
//     keyExtractor={(item, index) => ""+index}
//     >
//    </FlatList>
//    {/* <Fab onPress={()=>setModalVisible(true)}>
//      <Icon ios='ios-add' android="md-add"/>
//    </Fab>
//    <PersonAdd modalVisible = {modalVisible} update={update}/> */}
//    </View>
   
//  );
