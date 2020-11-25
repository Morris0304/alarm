import React, {useState} from 'react';

import { Button , Modal, TextInput, View } from 'react-native';

import styles from './styles';
export default function ProductAdd(props) {



  const [desc, setDesc] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCate] = useState("");

  const [inventory, setinven] = useState("");

  const [safetyStock, setsafe] = useState("");



  function update(){

    props.update({desc,price,category, inventory,safetyStock});
    props.setisvisible(false);
  }



  return (



    <Modal visible={props.modalVisible}>

    <TextInput style={styles.input} placeholder="產品說明" value={desc} onChangeText={text=>setDesc(text)}/>

    <TextInput style={styles.input} placeholder="價格" value={price} onChangeText={text=>setPrice(text)}/>

    <TextInput style={styles.input} placeholder="類型" value={category} onChangeText={text=>setCate(text)}/>

    <TextInput style={styles.input} placeholder="存貨" value={inventory} onChangeText={text=>setinven(text)}/>

    <TextInput style={styles.input} placeholder="安全庫存" value={safetyStock} onChangeText={text=>setsafe(text)}/>

    <Button onPress={update} title="新增🥰"/>

    </Modal>



  );

}