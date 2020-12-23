import React, {useState} from 'react';
import { View, Text, Button, ImageBackground, Layout } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
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
  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    minHeight: 500
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  button: {
    marginTop:"5%"
  },
});

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
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New" component={NewAlarm} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Alarm" component={Alarm} />
        {/* <Tab.Screen name="PersonList" component={Weather} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}


