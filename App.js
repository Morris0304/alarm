import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Home/HomeScreen';


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>ALARM</Text>
//     </View>
//   );
// }
function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [count, setCount] = useState(10);
  let countString = "count in App:"+count;
  function updateCount(newCount){
    setCount(newCount);
  }
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen style={{ alignItems: 'flex-start'}} name="Home" component={HomeScreen}  />
        {/* <Tab.Screen name="Person" component={NewAlarm} />
        <Tab.Screen name="Product" component={Weather} /> */}
        {/* <Tab.Screen name="Click" component={Click} initialParams={{ count: 10 }}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

import React, {useState} from 'react';
import { View, Text, Button, ImageBackground, Layout } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductList from './src/Product/ProductList';
import PersonList from './src/Person/PersonList';
import PersonAdd from './src/Person/PersonAdd';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Datepicker,Toggle } from '@ui-kitten/components';
import { Switch, StyleSheet, StatusBar } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FAB, Portal, Provider, Title, Paragraph, IconButton } from 'react-native-paper';
import { Container, Header, Fab, Icon, Image,Space} from 'native-base';
import {Card} from 'react-native-shadow-cards';




// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>閉嘴啦🥰</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }
function DetailsScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
        <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
      </ImageBackground>
      </View>
    );
  }

  const New = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleConfirmd = (date) => {
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };

    const handleConfirmt = (time) => {
      console.warn("A time has been picked: ", time);
      hideTimePicker();
    };

  
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
        <Button title="選擇日期" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          locale="zh-Cn"
          onConfirm={handleConfirmd}
          onCancel={hideDatePicker}
          isDarkModeEnabled={false}
        />
        <Button title="選擇時間" onPress={showTimePicker} />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          locale="zh-Cn"
          onConfirm={handleConfirmt}
          onCancel={hideTimePicker}
          isDarkModeEnabled={false}
        />
        </ImageBackground>
      </View>
    );
  };

// const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <NavigationContainer>
    //   <Tab.Navigator>
        // <Tab.Screen name="Home" component={HomeScreen} />
        // <Tab.Screen name="Details" component={DetailsScreen} />
        // <Tab.Screen name="New" component={New} />
        // <Tab.Screen name="ProductList" component={ProductList} />
        // <Tab.Screen name="PersonList" component={PersonList} />
    //   </Tab.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
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
            else if (route.name === 'PersonList') {
              iconName = focused ? 'ios-person' : 'ios-person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'pink',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New" component={New} />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="PersonList" component={PersonList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


