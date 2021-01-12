import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from '../Home/HomeScreen';
import Weather from '../weather/Weather';
import NewAlarm from '../NewAlarm/NewAlarm';
import SignUp from '../account/SignUp';
import SignIn from '../account/SignIn';
import UpdateAlarm from '../NewAlarm/UpdateAlarm';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="UpdateAlarm" component={UpdateAlarm} />
      <Stack.Screen name="NewAlarm" component={NewAlarm} />
    </Stack.Navigator>
  );
}

function weather() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weather" component={Weather} />
    </Stack.Navigator>
  );
}

function newAlarm() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NewAlarm" component={NewAlarm} />
    </Stack.Navigator>
  );
}

function Sign() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
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
            else if (route.name === 'weather') {
              iconName = focused ? 'ios-cloud' : 'ios-cloud';
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
          activeTintColor: '#fb5b5a',
          inactiveTintColor: 'gray',
        }}
      >
    
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="New" component={newAlarm} />
        <Tab.Screen name="weather" component={weather} />
      </Tab.Navigator>
    );
  }
  

  export default function AllRouter() {
    const login = useSelector(state=>state.authReducer.login)
    return (

    <NavigationContainer>
    {login ?
    <TabStack/>
    :
    <Sign/>
    }
  </NavigationContainer>
    )
  }