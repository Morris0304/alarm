import {StatusBar, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#00bfff',
      flex: 1,
       //margin: 'auto',
      width: '100%',
      flexDirection: 'column',
      paddingTop: '15%',
      //marginTop: StatusBar.currentHeight || 250,
    },
    item: {
      // flex: 1,
      flexDirection: 'row',
      backgroundColor: '#00ffff',
      padding: 8,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      // flex: 1,
      fontSize: 24,
    },
    content: {
      
    },
    index: {
      fontSize: 24,
    },
    down:{
      marginTop: StatusBar.currentHeight || 40,
    },
    input: {
      
      // padding: 12,
      // borderRadius: 8,
      // width:'70%',
      // color: "#666",
      // backgroundColor: "#eaeaea",
      alignItems: 'center',
    },
    AddContainer: {
      backgroundColor: '#00bfff',
      flex: 1,
       //margin: 'auto',
      width: '100%',
      flexDirection: 'column',
      paddingTop: '15%',
      //marginTop: StatusBar.currentHeight || 250,
    },
  
  });
export default styles;