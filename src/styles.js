// import {StatusBar, StyleSheet} from 'react-native';

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: '#00bfff',
//       flex: 1,
//        //margin: 'auto',
//       width: '100%',
//       flexDirection: 'column',
//       paddingTop: '15%',
//       //marginTop: StatusBar.currentHeight || 250,
//     },
//     item: {
//       // flex: 1,
//       flexDirection: 'row',
//       backgroundColor: '#00ffff',
//       padding: 8,
//       marginVertical: 8,
//       marginHorizontal: 16,
//     },
//     title: {
//       // flex: 1,
//       fontSize: 24,
//     },
//     content: {
      
//     },
//     index: {
//       fontSize: 24,
//     },
//     down:{
//       marginTop: StatusBar.currentHeight || 40,
//     },
//     input: {
      
//       // padding: 12,
//       // borderRadius: 8,
//       // width:'70%',
//       // color: "#666",
//       // backgroundColor: "#eaeaea",
//       alignItems: 'center',
//     },
//     AddContainer: {
//       backgroundColor: '#00bfff',
//       flex: 1,
//        //margin: 'auto',
//       width: '100%',
//       flexDirection: 'column',
//       paddingTop: '15%',
//       //marginTop: StatusBar.currentHeight || 250,
//     },
  
//   });
// export default styles;

import {StatusBar, StyleSheet} from 'react-native';



const styles = StyleSheet.create({

  // container: {

  //   //backgroundColor: '#00bfff',

  //   flex: 1,

  //   flexDirection: 'column',

  //   marginTop: StatusBar.currentHeight || 200,

  // },

  item: {

    flex: 1,

    flexDirection: 'row',

    backgroundColor: '#97CBFF',

    padding: 10,

    marginVertical: 8,

    marginHorizontal: 16,

    alignItems:'center',

  },

  title: {

    fontSize: 24,

  },

  text:{
    fontWeight:'500', 
    fontSize:50,
    marginLeft:10
  },

  input:{
    flexDirection: 'column',
    alignItems:'center',
    padding:8,
    marginTop: StatusBar.currentHeight || 20,
  },

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
      justifyContent: "center"
    },
    // text: {
    //   color: "white",
    //   fontSize: 42,
    //   fontWeight: "bold",
    //   textAlign: "center",
    //   backgroundColor: "#000000a0"
    // },
    button: {
      marginTop:"5%"
    },
    switch: {
      marginLeft: 280, 
      marginTop:-40
    }
  });


export default styles;