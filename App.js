import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ALARM</Text>
    </View>
  );
}
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
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen name="Person" component={NewAlarm} />
        <Tab.Screen name="Product" component={Weather} /> */}
        {/* <Tab.Screen name="Click" component={Click} initialParams={{ count: 10 }}/> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;


