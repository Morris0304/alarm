import React, {useState} from 'react';

import { Button , TextInput, Modal } from 'react-native';

import axios from 'axios';
import {axios_config, url} from './config';



export default function PersonAdd(props) {

  const [name, setName] = useState("");

  const [time, setTime] = useState("");

  const [game, setGame] = useState("");

  const [day, setDay] = useState("");

  const [status, setStatus] = useState("");

  const [repeat, setRepeat] = useState("");

  

  async function sendData () {

      const newPerson={

        fields:{

          Name:name,

          City:time,

          Game:game,

          Day:day,

          Status:status,

          Repeat:repeat

        }

      }

      //console.log(newPerson);

      try {

      	const result = await axios.post(url,newPerson, axios_config);

      	console.log(result);

      	//setPersons(result.data.records);

      	props.update();

      }

      catch (e){

        console.log("error:"+e);

      }

  }



  function update(){

    sendData();

  }



  return (

    <Modal visible={props.modalVisible}>

    <TextInput placeholder="姓名" value={name} onChangeText={text=>setName(text)}/>

    <TextInput placeholder="時間" value={time} onChangeText={text=>setTime(text)}/>

    <TextInput placeholder="遊戲" value={game} onChangeText={text=>setGame(text)}/>

    <TextInput placeholder="日期" value={day} onChangeText={text=>setDay(text)}/>

    <TextInput placeholder="狀態" value={status} onChangeText={text=>setStatus(text)}/>

    <TextInput placeholder="重複" value={repeat} onChangeText={text=>setRepeat(text)}/>



    <Button onPress={update} title="新增"/>

    </Modal>

  );

}