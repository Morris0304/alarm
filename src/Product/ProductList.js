import React, {useState} from 'react';

import {FlatList, View, Text, StatusBar,StyleSheet, TouchableOpacity} from 'react-native';

import styles from './styles';

import ProductAdd from '../Product/ProductAdd';
import {Icon, Fab} from 'native-base';



// const data =[

//   {name:"iPhone 7", price:12000, category:"智慧型手機", inventory:100, safetyStock:50},

//   {name:"iPhone 8", price:10000, category:"平板電腦", inventory:100, safetyStock:50},

//   {name:"iPhone X", price:10000, category:"平板電腦", inventory:100, safetyStock:50},

// ]

/*

const Item = ({name}) => (

  <View>

    <Text>{name}</Text>

  </View>

);

*/



// const renderItem = ({ item, index }) => (

//   <View style={styles.item}>

//   <Text style={styles.text}>{index+1}. </Text>

//   <Text style={styles.title}>{item.name}</Text>

//   <Text> </Text>

//   <Text style={styles.text}>{item.price}/</Text>

//   <Text style={styles.text}>{item.category}/</Text>

//   <Text style={styles.text}>{item.inventory}/</Text>

//   <Text style={styles.text}>{item.safetyStock}</Text>

//   </View>



// );



export default function ProductList() {
  const [selected, setSelected] = useState(null);
  const [products, setProducts] = useState([

    {desc:"iPad", price:20000, category:"平板電腦", inventory:100, safetyStock:50},

    {desc:"iPhone 8", price:10000, category:"智慧型手機", inventory:100, safetyStock:50},

    {desc:"iPhone X", price:10000, category:"智慧型手機", inventory:100, safetyStock:50},

    ]);
  const[isvisible,setisvisible]=useState(false)
  const renderItem = ({ item, index }) => {

    const backgroundColor = index === selected ? "#FFFF00" : "#87CEFA";

    return(  

      <TouchableOpacity onPress = {()=>setSelected(index)} style={[styles.item, {backgroundColor}]}>

      <Text style={styles.text}>{index+1}. </Text>
      
      <Text style={styles.title}>{item.desc}</Text>
      
      <Text> </Text>
      
      <Text style={styles.text}>{item.price}/</Text>
      
      <Text style={styles.text}>{item.category}/</Text>
      
      <Text style={styles.text}>{item.inventory}/</Text>
      
      <Text style={styles.text}>{item.safetyStock}</Text>
      
      </TouchableOpacity>

    )

  };

  function update(newProduct){

    setProducts(oldProducts=>[...oldProducts, newProduct]);

  }



 return (

   <View style={styles.container}>

  <ProductAdd update={update} modalVisible={isvisible} setisvisible={setisvisible}/>

   <FlatList 

    data={products} 

    renderItem = {renderItem}

    keyExtractor={item => item.desc}

    >

   </FlatList>
   <Fab onPress={()=>setisvisible(true)}>

    <Icon ios='ios-add' android="md-add"/>

  </Fab>


   </View>

 );

}