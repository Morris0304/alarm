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


const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };
 
const toggle = (navigation) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ImageBackground source={image} style={styles.image}>
      {/* <Text style={styles.text}>早安🥰</Text> */}
      <View style={{marginVertical:20}}>
      <Card style={{padding: 15, margin: 20, cornerRadius:30, backgroundColor: 'rgba(1000, 1000, 1000, 0.6)', borderRadius: 25}} >
        <Text style={{ fontWeight:'500', fontSize:50, marginLeft:10 }}>09:25</Text>
        <Switch style={{ marginLeft: 280, marginTop:-40}}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Icon name="more" style={{ marginLeft:300, marginTop:13, justifyContent:"center"}} />
          
      </Card>
      <Card style={{padding: 15, margin: 20, cornerRadius:30, backgroundColor: 'rgba(1000, 1000, 1000, 0.6)', borderRadius: 25}} >
        <Text style={{ fontWeight:'500', fontSize:50, marginLeft:10 }}>09:25</Text>
        <Switch style={{ marginLeft: 280, marginTop:-40}}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Icon name="more" style={{ marginLeft:300, marginTop:13, justifyContent:"center"}} />
          
      </Card>
      </View>
    <Provider>
      <Portal>
        <FAB.Group 
          open={open}
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add') },
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
        <Tab.Screen name="Home" component={toggle} />
        <Tab.Screen name="New" component={New} />
        <Tab.Screen name="Details" component={DetailsScreen} />
        <Tab.Screen name="PersonList" component={PersonList} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}