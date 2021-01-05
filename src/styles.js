import {StatusBar, StyleSheet} from 'react-native';



const styles = StyleSheet.create({
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
  text1:{
    fontSize:20,
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
      minHeight: 500,
      backgroundColor: '#97CBFF'
    },

  content: {
      flex: 1,
       //margin: 'auto',
      width: '100%',
      flexDirection: 'column',
      paddingTop: '12%',
      //marginTop: StatusBar.currentHeight || 250,
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
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    form: {
      flex: 1,
      backgroundColor:'#003f5c',
      // flexDirection: 'column',
      // alignItems:'center',
      justifyContent: 'center',
      // padding: 35,
      // marginTop: StatusBar.currentHeight || 0,
    },
    inputStyle: {
      // width: '80%',
      // marginBottom: 15,
      // paddingBottom: 15,
      // alignSelf: "center",
      // borderColor: "#ccc",
      // borderBottomWidth: 1,
      height:50,
      color:"white",
    },
    headerStyle: {
      height: 70,
      
    },
    headerText :{
      marginTop:10,
      marginLeft: 15,
      fontSize: 40,
      fontWeight: 'bold',
      flexDirection:'row',
      alignSelf:'center',
      color:'white',
    },
    checkbox:{
      flexDirection: 'column', 
      marginTop:12,
      marginLeft:10,
    },
    checkboxText:{
      marginTop:7,
      color:'white',
    },
    subtitle:{
      fontSize:20,
      marginLeft:38,
      marginTop:12,
      color:'white',
    },
    NewAlarmInputBtn:{
      width:'80%',
      backgroundColor:'#fb5b5a',
      borderRadius:25,
      height:50,
      alignItems:'center',
      justifyContent:'center',
      marginTop:40,
      marginBottom:10,
      alignSelf:'center',
    },
    NewAlarmInputView:{
      width:'80%',
      backgroundColor:'#465881',
      borderRadius:25,
      height:50,
      marginBottom:20,
      marginTop:20,
      justifyContent:'center',
      padding:20,
      alignSelf:'center',
    },
    NewAlarmDivider:{
      width: '80%',
      backgroundColor:'gray',
      marginTop:20,
      marginBottom:20,
      alignSelf:'center'
    },
    NewAlarmChooseTimeView:{
      fontSize:20,
      color:'white',
      marginTop:5,
      
    },
    // text: {
    //   color: "white",
    //   fontSize: 42,
    //   fontWeight: "bold",
    //   textAlign: "center",
    //   backgroundColor: "#000000a0"
    // },
    button: {
      marginTop:"5%",
    },
    switch: {
      marginLeft: 280, 
      marginTop:-40,
    },

    accform: {
      flex: 1,
      backgroundColor: '#003f5c',
      alignItems: 'center',
      justifyContent: 'center',
    },
    accinputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    accloginBtn:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10,
    },
    accinputStyle: {
      height:50,
      color:"white",
    },
    acclogo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#fb5b5a",
      marginBottom:40
    },
  
  });


export default styles;