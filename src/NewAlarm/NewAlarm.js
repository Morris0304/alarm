import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {axios_config, url} from './config';
import { View, Text, Button, ImageBackground, Layout ,TextInput} from 'react-native';
import {CheckBox} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Datepicker,Toggle } from '@ui-kitten/components';
import { Switch, StyleSheet, StatusBar } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { FAB, Portal, Provider, Title, Paragraph, IconButton } from 'react-native-paper';
import { Container, Header, Fab, Icon, Image,Space} from 'native-base';
import {Card} from 'react-native-shadow-cards';
import { AsyncStorage } from 'react-native';
import styles from '../styles';
import { Divider } from 'react-native-elements';
import moment from "moment/moment";

export default function NewAlarm() {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  const [Name, setName] = useState("鬧鐘");
  const [Time, setTime] = useState('');
  const [TimeString, setTimeString] = useState('');
  const [Repeat, setRepeat] = useState("");

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(()=>{
    if(isEnabled==true){
      setRepeat("1");
    }
    else{
      setRepeat("0");
    }

  })
  
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

  const handleConfirmt = (time) => {
    // console.warn("A time has been picked: ", time);
    console.log(time) //這邊顯示的時間有問題
    const time1 = moment(time).format('H:mm') //這邊把時間變成正確的
    console.log(time1)
    setTime(time1) 
    const timeString = moment(time).format('YYYY-MM-DD HH:mm:ss');
    setTimeString(timeString) //時間以字串方式儲存
    
    console.log(Time)
    console.log(TimeString) 
    hideTimePicker();
  };

  const [Monday, setMonday] = useState(false);
  const [Tuesday,setTuesday] = useState(false);
  const [Wednesday, setWednesday] = useState(false);
  const [Thursday, setThursday] = useState(false);
  const [Friday, setFriday] = useState(false);
  const [Saturday, setSaturday] = useState(false);
  const [Sunday, setSunday] = useState(false);
  const [week, setWeek] = useState([false,false,false,false,false,false,false]);
  // const [toggleCheckBox, setToggleCheckBox] = useState(false)

  handleCheck = (day) => {
    week[day] = !week[day]
    setWeek([...week])
  }
  
  async function sendData () {
    const weeks = [];
      if(week[0] == true){
        weeks.push("日")
      }
      if(week[1] == true){
        weeks.push("一")
      }
      if(week[2] == true){
        weeks.push("二")
      }
      if(week[3] == true){
        weeks.push("三")
      }
      if(week[4] == true){
        weeks.push("四")
      }
      if(week[5] == true){
        weeks.push("五")
      }
      if(week[6] == true){
        weeks.push("六")
      }
      console.log([...weeks])
      
    const newAlarm={
      fields:{
        Name:Name,
        Repeat:Repeat,
        Day:[...weeks],
        Time:TimeString,
        Status:"ON",
        userId:"rec8116cdd76088af",
      }
    }
    console.log(Time)
    // console.log(week)
    // alert(Name);
    // alert(Time);
    // alert(Repeat);
    //console.log(newPerson);
    try {
      const result = await axios.post(get_url,newAlarm, axios_config);
      // console.log(result);
      props.update();
    }
    catch (e){
      console.log("error:"+e);
    }
}

function update(){
  sendData();
}

  return(
    
    <View style = {styles.form}> 

    <View style={styles.headerStyle}>
        <Text style={styles.headerText}>新增鬧鐘</Text>
        
      </View> 
      
      <View >
      <Text style={styles.subtitle}>鬧鐘名稱</Text>
      </View>
      <View style={styles.NewAlarmInputView}>
      <TextInput
        style={styles.inputStyle}
        placeholderTextColor="#003f5c"
        placeholder="鬧鐘名"
        value={Name}
        onChangeText={text=>setName(text)}
      /> 
      </View>
      
      <View style={{alignSelf:'center', flexDirection:'row'}}>
      <Text style={styles.NewAlarmChooseTimeView}>
        {Time}
        </Text>
     
      <Button title="選擇時間" onPress={showTimePicker} />
      
         <DateTimePickerModal
           isVisible={isTimePickerVisible}
           mode="time"
           locale="en-GB"
           onConfirm={handleConfirmt}
           onCancel={hideTimePicker}
           isDarkModeEnabled={false}
          //  onChangeTime={time=>setTime(time)}
         />
        </View>
       {/* <TextInput
        style={styles.inputStyle}
        placeholder=""
        value={email}
        onChangeText={text=>setEmail(text)}
      /> */}
      <Divider style={styles.NewAlarmDivider} />
      <View style={{flexDirection: 'row'}}>
      <Text style={styles.subtitle}>重複提醒</Text>
      <Switch style={{ marginLeft: 200}}
            trackColor={{ false: "#767577", true: "#fb5b5a" }}
            thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Divider style={styles.NewAlarmDivider} />
      <Text style={styles.subtitle}>選擇星期重複</Text>
      {/* {checkboxes.map(checkbox => (
        <View style={{flexDirection: 'row'}}>
         <CheckBox
           center
           key={checkbox.id}
           checked={checkbox.id == checkedId}
           onPress={() => handleCheck(checkbox.id)}
         />
      <Text>    {checkbox.title}</Text>
         </View>
       ))} */}

       
       <View style={{flexDirection:'row', alignSelf:'center'}}>
        <View style={styles.checkbox}>
          <CheckBox checked={week[1]} color="#fc5185" onPress={() => handleCheck(1)}/>
          <Text style={styles.checkboxText}>星期一</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={week[2]} color="#fc5185" onPress={() => handleCheck(2)}/>
          <Text style={styles.checkboxText}>星期二</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={week[3]} color="#fc5185" onPress={() => handleCheck(3)}/>
          <Text style={styles.checkboxText}>星期三</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={week[4]} color="#fc5185" onPress={() => handleCheck(4)}/>
          <Text style={styles.checkboxText}>星期四</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={week[5]} color="#fc5185" onPress={() => handleCheck(5)}/>
          <Text style={styles.checkboxText}>星期五</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={week[6]} color="#fc5185" onPress={() => handleCheck(6)}/>
          <Text style={styles.checkboxText}>星期六</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={week[0]} color="#fc5185" onPress={() => handleCheck(0)}/>
          <Text style={styles.checkboxText}>星期日</Text>
        </View>
        </View>

        <View style={styles.NewAlarmInputBtn}>
          <Button color="white" title="新增" onPress={update}/>
          </View>
      
    </View>
  )
 
}
const styles1 = StyleSheet.create({
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
    // justifyContent: "center"
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

  
    
