import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import styles from '../styles';
import {axios_config, url} from './config';
import { FlatList, View, Text, Button, ImageBackground, Layout,  ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Datepicker,Toggle } from '@ui-kitten/components';
import { Switch, StyleSheet, StatusBar } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FAB, Portal, Provider, Title, Paragraph, IconButton } from 'react-native-paper';
import { Container, Header, Fab, Icon, Image,Space} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';


export default function HomeScreen({navigation}) {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [alarm, setAlarm] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={image} style={styles.image}>
      {/* <Text style={styles.text}>早安🥰</Text> */}
      {/* <FlatList
      data={alarm} 
      renderItem = {renderItem} 
      keyExtractor={(item, index) => ""+index}>
      </FlatList> */}
      <ScrollView>
      {
        alarm.map((item)=>(
            <Card style={{padding: 15, 
              margin: 10, 
              cornerRadius:30,
              alignSelf:'center', 
              backgroundColor: 'rgba(1000, 1000, 1000, 0.6)', 
              borderRadius: 25}} >
              <Text style={styles.text}>{item.fields.Time}</Text>
                <Switch style={styles.switch}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                  <Icon name="more" style={{ marginLeft:300, marginTop:13, justifyContent:"center"}} />
                  
              </Card>
          
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
