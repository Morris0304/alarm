import { Card } from 'native-base';
import React, {useState,useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import { colors } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-ionicons';
import { color } from 'react-native-reanimated';
import styles from '../styles';
import ProgressCircle from 'react-native-progress-circle';


const Weather = () => {

    const [info,setInfo] = useState({
        name : "loading",
        temp1 : "loading",
        temp2 : "loading",
        temp3 : "loading",
        temp4 : "loading",
        temp5 : "loading",
        temp6 : "loading",
        temp7 : "loading",
        temp8 : "loading",
        temp_min : "loading",
        temp_max : "loading",
        humidity : "loading",
        desc : "loading",
        icon : "loadong",
    })
    const [currentInfo,setCurrentInfo] = useState({
        name : "loading",
        temp : "loading",
        temp_min : "loadong",
        temp_max : "loading",
        humidity : "loading",
        desc : "loading",
        icon : "loadong",
        time : "loading",
        wind : "loading",
    })

    useEffect(() => {
        getWeather();
        getCurrentWeather();
      },[]);

      const getCurrentWeather =() => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=9d5b712b34901085d9523ca9b8eec19b&units=metric")
        .then(data => data.json())
        .then(results => {
            setCurrentInfo({
                name : results.name,
                temp : results.main.temp,
                temp_min : results.main.temp_min,
                temp_max : results.main.temp_max,
                humidity : results.main.humidity,
                desc : results.weather[0].description,
                icon : results.weather[0].icon,
                wind : results.wind.speed,
            })
        })
    }
    const getWeather =() => {
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=Taipei&appid=9d5b712b34901085d9523ca9b8eec19b&units=metric")
        .then(data => data.json())
        .then(results => {
            setInfo({
                name : results.city.name,
                time : results.list[3].dt_txt,
                time1 : results.list[4].dt_txt,
                time2 : results.list[5].dt_txt,
                time3 : results.list[6].dt_txt,
                time4 : results.list[7].dt_txt,
                time5 : results.list[0].dt_txt,
                time6 : results.list[1].dt_txt,
                time7 : results.list[2].dt_txt,
                temp1 : results.list[0].main.temp,
                temp2 : results.list[1].main.temp,
                temp3 : results.list[2].main.temp,
                temp4 : results.list[3].main.temp,
                temp5 : results.list[4].main.temp,
                temp6 : results.list[5].main.temp,
                temp7 : results.list[6].main.temp,
                temp8 : results.list[7].main.temp,
                temp_min : results.list[0].main.temp_min,
                temp_max : results.list[0].main.temp_max,
                humidity : results.list[0].main.humidity,
                desc : results.list[0].weather[0].description,
                icon1 : results.list[0].weather[0].icon,
                icon2 : results.list[1].weather[0].icon,
                icon3 : results.list[2].weather[0].icon,
                icon4 : results.list[3].weather[0].icon,
                icon5 : results.list[4].weather[0].icon,
                icon6 : results.list[5].weather[0].icon,
                icon7 : results.list[6].weather[0].icon,
                icon8 : results.list[7].weather[0].icon,
            })
        })
    }

    const moment = require('moment');
    const currentDateTime = moment().format('YYYY/MM/DD HH:mm:ss');

    return(
        <ScrollView style={{backgroundColor:'#003f5c'}}>
        <View style={styles.weather}>
            <View style={{flexDirection:'row', marginTop:80}}>
            <Image style={{width:20,height:20,marginTop:5}} 
            source={require('../img/location.png')}/>
            <Text style={{fontSize:30, color:'#FFFFFF', fontWeight:"bold"}}>  {currentInfo.name}</Text>
            </View>
            <Text style={{fontSize:20, color:'#FFFFFF', marginTop:10}}>{currentDateTime}</Text>
            <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'column'}}>
            <Image 
            style={{width:120,height:120,marginTop:20}}
            source={{uri:"http://openweathermap.org/img/w/"+currentInfo.icon+".png"}}/>
            <Text style={{ color:'#FFFFFF' ,marginLeft:20,marginTop:-8}}>{currentInfo.desc}</Text>
            </View>
            <View style={{flexDirection:'column'}}>
            <Text style={{fontSize:60, color:'#FFFFFF',marginTop:50, marginLeft:20}}>{currentInfo.temp}°C</Text>
            <Text style={{ color:'#FFFFFF' ,marginLeft:30,marginTop:10}}>最低：{currentInfo.temp_min}° / 最高：{currentInfo.temp_max}°</Text>
            <Text style={{ color:'#FFFFFF' ,marginLeft:30}}>濕度：{currentInfo.humidity}%</Text>
            </View>
            </View>
            <View style={{flexDirection:'row', marginTop:30,marginLeft:3}}>
                <ProgressCircle
                percent={currentInfo.temp_max}
                radius={40}
                borderWidth={8}
                color="#fb5b5a"
                shadowColor="#999"
                bgColor="#003f5c">
                <Text style={{ fontSize: 16, color:'#fff' }}>最高溫</Text>
                <Text style={{ fontSize: 18, color:'#fff' }}>{currentInfo.temp_max}°</Text>
                </ProgressCircle>
                <Text>  </Text>
                <ProgressCircle
                percent={currentInfo.temp_min}
                radius={40}
                borderWidth={8}
                color="#fb5b5a"
                shadowColor="#999"
                bgColor="#003f5c">
                <Text style={{ fontSize: 16, color:'#fff' }}>最低溫</Text>
                <Text style={{ fontSize: 18, color:'#fff' }}>{currentInfo.temp_min}°</Text>
                </ProgressCircle>
                <Text>  </Text>
                <ProgressCircle
                percent={currentInfo.humidity}
                radius={40}
                borderWidth={8}
                color="#fb5b5a"
                shadowColor="#999"
                bgColor="#003f5c">
                <Text style={{ fontSize: 16, color:'#fff' }}>濕度</Text>
                <Text style={{ fontSize: 18, color:'#fff' }}>{currentInfo.humidity}%</Text>
                </ProgressCircle>
                <Text>  </Text>
                <ProgressCircle
                percent={currentInfo.wind}
                radius={40}
                borderWidth={8}
                color="#fb5b5a"
                shadowColor="#999"
                bgColor="#003f5c">
                <Text style={{ fontSize: 16, color:'#fff' }}>風速</Text>
                <Text style={{ fontSize: 18, color:'#fff' }}>{currentInfo.wind}</Text>
                <Text style={{ fontSize: 16, color:'#fff' }}>公尺/秒</Text>
                </ProgressCircle>
            </View>

            <ScrollView horizontal={true} style={{marginTop:20, padding:10,margin:20}}>
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(currentDateTime).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon1+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{currentInfo.temp}°</Text>
             </View>
             <Text>      </Text>
            <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon1+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp1}°</Text>
             </View>
             <Text>      </Text>
             <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time1).format("H:mm")}</Text>
             <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon2+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp2}°</Text>
            </View>
            <Text>      </Text>
            <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time2).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon3+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp3}°</Text>
            </View> 
            <Text>      </Text>
            <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time3).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon4+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp4}°</Text>
            </View> 
            <Text>      </Text>
            <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time4).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon5+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp5}°</Text>
            </View> 
            <Text>      </Text>
            <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time5).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon6+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp6}°</Text>
            </View>
            <Text>      </Text> 
            <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time6).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon7+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp7}°</Text>
            </View> 
            <Text>      </Text>
            <View style={{flexDirection:'column',alignItems:'center'}}>
             <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>{moment(info.time7).format("H:mm")}</Text>
                <Image 
                    style={{width:40,height:40,marginTop:40}}
                    source={{uri:"http://openweathermap.org/img/w/"+info.icon8+".png"}}/>
                <Text style={{fontSize:20, fontWeight:'bold', color:'#fff',marginTop:40}}>{info.temp8}°</Text>
            </View> 
            <Text>      </Text>
            </ScrollView>
            
        </View>
        </ScrollView>
    )
}
export default Weather;