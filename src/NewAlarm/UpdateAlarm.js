import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {axios_config, url} from './config';
import { View, Text, Button, ImageBackground, Layout ,TextInput , Alert} from 'react-native';
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
import styles from '../styles';
import { Divider } from 'react-native-elements';
import moment from "moment/moment";
import { useSelector } from 'react-redux';
import HomeScreen from '../Home/HomeScreen';

const alertMessage = "";

export default function UpdateAlarm(props,{navigation}) {
  const get_url=url+"?maxRecords=50&view=Grid%20view";

  var Airtable = require('airtable');
  var base = new Airtable({apiKey: 'keyL8TPVhwqWvqFfI'}).base('apphKXGnHFSeqIixf');

  const { item } = props.route.params

  const userId = useSelector(state=>state.authReducer.userID);
  const [Name, setName] = useState("");
  const [Time, setTime] = useState(item.fields.Time);
  const [showTime,setShowTime] = useState(moment(item.fields.Time).format('H:mm'));
  const [TimeString, setTimeString] = useState('');
  const [Repeat, setRepeat] = useState("");
  const [changeRepeat, setChangeRepeat] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const image = { uri: "https://uploadfile.bizhizu.cn/up/5b/0d/0f/5b0d0f26cf2f9cdce9abe4422cc5aac9.jpg" };

  const [isEnabled, setIsEnabled] = useState(false);
  //const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [week, setWeek] = useState([false,false,false,false,false,false,false]);
  const [weeks,setWeeks] = useState([false,false,false,false,false,false,false]);

  useEffect(()=>{
    for(i=0;i<item.fields.Day.length;i++){
        if(item.fields.Day[i]=="一"){
            weeks[1]=true
        }
        if(item.fields.Day[i]=="二"){
            weeks[2]=true
        }
        if(item.fields.Day[i]=="三"){
            weeks[3]=true
        }
        if(item.fields.Day[i]=="四"){
            weeks[4]=true
        }
        if(item.fields.Day[i]=="五"){
            weeks[5]=true
        }
        if(item.fields.Day[i]=="六"){
            weeks[6]=true
        }
        if(item.fields.Day[i]=="日"){
            weeks[0]=true
        }
        setWeeks(weeks)
    }
    console.log(weeks)
    if(item.fields.Repeat=="1"){
        setIsEnabled(true)
    }
    else{
        setIsEnabled(false)
    }
    setRepeat(item.fields.Repeat)
    setName(item.fields.Name)
    console.log(item.fields.Time)
    setTimeString(moment(item.fields.Time).subtract(8,'hours').format('YYYY-MM-DD HH:mm:ss'))
    console.log("TimeString",TimeString)
    // if(isEnabled==true){
    //   setRepeat("1");
    // }
    // else{
    //   setRepeat("0");
    // }
  },[modalVisible])

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const toggleSwitch = () => {
    
    setIsEnabled(previousState => !previousState);
    setInRepeat()

  }

  const setInRepeat = () =>{
    if(isEnabled==true){
      setRepeat("1");
      }
    else{
       setRepeat("0");
    }
    console.log(Repeat)
    setChangeRepeat(Repeat)
  }

  const handleConfirmt = (time) => {
    // console.warn("A time has been picked: ", time);

    console.log(time) //這邊顯示的時間有問題
    const time1 = moment(time).format('H:mm') //這邊把時間變成正確的
    console.log(time1)
    setShowTime(time1) 
    const timeString = moment(time).subtract(8,'hours').format('YYYY-MM-DD HH:mm:ss');
    console.log("時間減8小",moment(time).subtract(16,'hours').format('YYYY-MM-DD HH:mm:ss'))
    setTimeString(timeString) //時間以字串方式儲存
    console.log(TimeString) 
    
    hideTimePicker();
  };

  // const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const handleCheck = (day) => {
    week[day] = !week[day]
    setWeek([...week])
  }
  
  async function sendData () {
    console.log(item.id)
    console.log(Name)
    console.log(Repeat)
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
        // userId:["rec8116cdd76088af"],
      }
    }
    console.log("時間",Time)
    console.log("時間String",TimeString)
    // console.log(week)
    // alert(Name);
    // alert(Time);
    // alert(Repeat);
    //console.log(newPerson);
    try {
      base('alarm1').update(item.id, {
        "Name":Name,
        "Repeat":changeRepeat,
        "Day":[...weeks],
        "Time":TimeString,
        "Status":"ON",
        "userId":userId
      }, function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.get('Status'));
      });
      // const result = await axios.post(get_url,newAlarm, axios_config);
      // console.log(result);
      // props.update();
    }
    catch (e){
      console.log("error:"+e);
    }
    //navigation.navigate('HomeScreen')
}

function update(){
  sendData();
  Alert.alert(
    '修改完成！',
    alertMessage,
    [
      {text: 'OK', onPress: () => console.log('OK Pressed!')},
    ]
  )
  
}

  return(
    
    <View style = {styles.form}> 

    <View style={styles.headerStyle}>
        <Text style={styles.headerText}>編輯鬧鐘</Text>
        
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
        {showTime}
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
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
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
          <CheckBox checked={weeks[1]} color="#fc5185" onPress={() => handleCheck(1)}/>
          <Text style={styles.checkboxText}>星期一</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={weeks[2]} color="#fc5185" onPress={() => handleCheck(2)}/>
          <Text style={styles.checkboxText}>星期二</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={weeks[3]} color="#fc5185" onPress={() => handleCheck(3)}/>
          <Text style={styles.checkboxText}>星期三</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={weeks[4]} color="#fc5185" onPress={() => handleCheck(4)}/>
          <Text style={styles.checkboxText}>星期四</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={weeks[5]} color="#fc5185" onPress={() => handleCheck(5)}/>
          <Text style={styles.checkboxText}>星期五</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={weeks[6]} color="#fc5185" onPress={() => handleCheck(6)}/>
          <Text style={styles.checkboxText}>星期六</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox checked={weeks[0]} color="#fc5185" onPress={() => handleCheck(0)}/>
          <Text style={styles.checkboxText}>星期日</Text>
        </View>
        </View>

        <View style={styles.NewAlarmInputBtn}>
          <Button color="white" title="修改" onPress={update}/>
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

// import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import {axios_config, url} from './config';
// import { View, Text, Button, ImageBackground, Layout ,TextInput} from 'react-native';
// import {CheckBox} from 'native-base';
// import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import Ionicons from 'react-native-vector-icons/Ionicons';
// // import { Datepicker,Toggle } from '@ui-kitten/components';
// import { Switch, StyleSheet, StatusBar } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// // import { FAB, Portal, Provider, Title, Paragraph, IconButton } from 'react-native-paper';
// import { Container, Header, Fab, Icon, Image,Space} from 'native-base';
// import {Card} from 'react-native-shadow-cards';
// import styles from '../styles';
// import { Divider } from 'react-native-elements';
// import moment from "moment/moment";

// export default function UpdateAlarm({ navigation }) {
//   const get_url=url+"?maxRecords=50&view=Grid%20view";

//   const [Name, setName] = useState("");
//   const [Time, setTime] = useState("");
//   const [Day, setDay] = useState("");
//   const [Status, setStatus] = useState("");
//   const [Repeat, setRepeat] = useState("");

//   useEffect(()=>{
//     setName(props.person.Name);
//     setTime(props.person.Time);
//     setDay(props.person.Day);
//     setStatus(props.person.Status);
//     setRepeat(props.person.Repeat);
//   },[props.id]);

//   function update(){
//     async function sendData () {
//       // if id exists, assign a newPerson with id
//       // else assign a newPerson without id
//       const newAlarm = props.id 
//       ?{records:[{
//         id: props.id,
//         fields:{
//           Name:name,
//           Time:time,
//           Day:day,
//           Status:status,
//           Repeat:repeat
//         }}]
//       }
//       :{fields:{
//           Name:name,
//           Time:time,
//           Day:day,
//           Status:status,
//           Repeat:repeat
//       }}

//       try {
//       // if id exists, call put
//       // else call post      
//       const result = props.id
//         ?await axios.put(url,newAlarm, axios_config)
//         :await axios.post(url,newAlarm, axios_config);
//       props.hide();}
//       catch (e){
//         console.log("error:"+e);
//       }
//     }
//     sendData();
//   }

//   return (
//     <Modal visible={props.modalVisible}>
//       <TextInput placeholder="姓名" value={name} onChangeText={text=>setName(text)}/>
//       <TextInput placeholder="時間" value={time} onChangeText={text=>setTime(text)}/>
//       <TextInput placeholder="星期" value={day} onChangeText={text=>setDay(text)}/>
//       <TextInput placeholder="開關" value={status} onChangeText={text=>setStatus(text)}/>
//       <TextInput placeholder="重複" value={repeat} onChangeText={text=>setRepeat(text)}/>
//       <Button onPress={update} title="確定"/>
//       <Button onPress={props.hide} title="取消"/>
//     </Modal>
//   );
// }