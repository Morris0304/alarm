import { Card } from 'native-base';
import React, {useState,useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import styles from '../styles';

const Weather = () => {

    const [info,setInfo] = useState({
        name : "loading",
        temp : "loading",
        temp_min : "loading",
        temp_max : "loading",
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
                temp_min : results.main.temp_min,
                temp_max : results.main.temp_max,
                humidity : results.main.humidity,
                desc : results.weather[0].description,
                icon : results.weather[0].icon
            })
        })
    }

    return(
        <View style={styles.accform}>
            <Text>地區：{info.name}</Text>
            <Text>氣溫：{info.temp}</Text>
            <Text>最低溫：{info.temp_min}</Text>
            <Text>最高溫：{info.temp_max}</Text>
            <Text>濕度：{info.humidity}</Text>
            <Text>{info.desc}</Text>
            <Image 
            style={{width:120,height:120}}
            source={{uri:"http://openweathermap.org/img/w/"+info.icon+".png"}}/>
            
            </View>
    )
}
export default Weather;