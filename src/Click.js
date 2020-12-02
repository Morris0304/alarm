import React, {useState, useEffect} from 'react';

import {Alert, Button} from 'react-native';



export default function Click(props) {

  const [count, setCount] = useState(props.count);

  let countString = "count:"+count;



  function showCount(){
    props.update(count);
  }



  useEffect(showCount);



  return (

    <Button title={countString} onPress={()=>setCount(count+1)}/>

   

  );

}