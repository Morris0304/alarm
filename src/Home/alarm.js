import * as React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import AlarmClock from 'react-native-alarm-clock';

// const create = () => {
//   let date = new Date();
//   date.setDate(date.getDate() + 1);
//   date.setHours(9, 55);

//   AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');
// };

function create () {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(10, 17);
  
    AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');
  };

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Button title="Create Alarm at 1:55PM" onPress={() => create()} /> */}
      <Button title="Create Alarm at 10:10PM" onPress={create} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});