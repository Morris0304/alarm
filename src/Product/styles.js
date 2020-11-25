import {StatusBar, StyleSheet} from 'react-native';



const styles = StyleSheet.create({

  container: {

    //backgroundColor: '#00bfff',

    flex: 1,

    flexDirection: 'column',

    marginTop: StatusBar.currentHeight || 200,

  },

  item: {

    flex: 1,

    flexDirection: 'row',

    backgroundColor: '#97CBFF',

    padding: 8,

    marginVertical: 8,

    marginHorizontal: 16,

    alignItems:'center',

  },

  toggle: {
    margin: 2,
  },

  title: {

    fontSize: 24,

  },

  text:{

    fontSize:20


  },

  input:{
    flexDirection: 'column',
    alignItems:'center',
    padding:8,
    marginTop: StatusBar.currentHeight || 20,
  },

});

export default styles;