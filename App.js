import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Button, ImageBackground, Layout, Platform } from 'react-native';
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
import HomeScreen from './src/Home/HomeScreen';
// import styles from './src/styles';
import NewAlarm from './src/NewAlarm/NewAlarm';
import Notification from './src/Home/notification';
import Alarm from './src/Home/alarm';
import SignUp from './src/account/SignUp';
import SignIn from './src/account/SignIn';


import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/store/index'

import AllRouter from './src/navigation/index'

const store = createStore(reducers)


function Sign() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
  );
}

// const Tab = createBottomTabNavigator();
const TabStack = () =>{
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-alarm'
                : 'ios-alarm';
            } 
            else if (route.name === 'Details') {
              iconName = focused ? 'ios-list' : 'ios-list';
            }
            else if (route.name === 'New') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
            }
            // else if (route.name === 'PersonList') {
            //   iconName = focused ? 'ios-person' : 'ios-person';
            // }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'pink',
          inactiveTintColor: 'gray',
        }}
      >
    
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="New" component={NewAlarm} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Alarm" component={Alarm} />
      </Tab.Navigator>
    );
  }
  

export default function App() {
  return (
    <Provider store={store}>
      <AllRouter/>
    </Provider>
    );
}
