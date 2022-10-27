
import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
     <Image style={styles.image} source={require('../Images/black-lost-found.jpg')}/>
     <View style={{display:'flex',justifyContent:'center',marginVertical:60,}}>
     <Text>Let Us help You Find Your Student Card</Text>
     </View>
     
     <View style={{justifyContent:'center',flexDirection:'row',marginVertical:60,}}>
    <TouchableOpacity style={styles.borderbutton} onPress={()=>navigation.navigate('SignIn')}>
    <Text style={{color:'#fff'}}>Login</Text>
    </TouchableOpacity >
    <TouchableOpacity style={styles.blackbutton} onPress={()=>navigation.navigate('SignUp')}>
    <Text style={{color:'#3EA055'}}>Register</Text>   
    </TouchableOpacity>
     </View>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        height:180,
        width:280,
        
      },
      borderbutton:{
        borderWidth:2,
        backgroundColor:'#3EA055',marginHorizontal:10,
        borderColor:'#3EA055',width:150,height:70,
        justifyContent:'center',alignItems:'center'
      },
      blackbutton:{
        borderWidth:2,
        backgroundColor:'#DBF9DB',marginHorizontal:10,
        borderColor:'#3EA055',width:150,height:70,
        justifyContent:'center',alignItems:'center'
      }
})