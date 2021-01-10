import React, {useState,useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import { colors } from 'react-native-elements';
import Icon from 'react-native-ionicons';
import { color } from 'react-native-reanimated';
import styles from '../styles';


const Weather = () => {

    const [info,setInfo] = useState({
        name : "loading",
        temp : "loading",
        humidity : "loading",
        desc : "loading",
        icon : "loadong"
    })
    useEffect(() => {
        getWeather();
      },[]);
    const getWeather =() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Taiwan&appid=9d5b712b34901085d9523ca9b8eec19b&units=metric")
        .then(data => data.json())
        .then(results => {
            setInfo({
                name : results.name,
                temp : results.main.temp,
                humidity : results.main.humidity,
                desc : results.weather[0].description,
                icon : results.weather[0].icon
            })
        })
    }

    const moment = require('moment');
    const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');

    return(
        <View style={styles.weather}>
            <View style={{flexDirection:'row', marginTop:80}}>
            <Image style={{width:20,height:20, color:'#FFFFFF',marginTop:5}} 
            source={require('../img/location.png')}/>
            <Text style={{fontSize:30, color:'#FFFFFF', fontWeight:"bold"}}>  {info.name}</Text>
            </View>
            <Text style={{fontSize:20, color:'#FFFFFF', marginTop:10}}>{currentDateTime}</Text>
            <View style={{flexDirection:'row'}}>
            <Image 
            style={{width:120,height:120,marginTop:20}}
            source={{uri:"http://openweathermap.org/img/w/"+info.icon+".png"}}/>
            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:60, color:'#FFFFFF',marginTop:40, marginLeft:20}}>{info.temp}°C</Text>
            <Text style={{ color:'#FFFFFF' ,marginLeft:55}}>{info.desc}</Text>
            <Text style={{ color:'#FFFFFF' ,marginLeft:70}}>濕度：{info.humidity}</Text>
            </View>
            </View>
            
        </View>
    )
}
export default Weather;