import { StyleSheet, Text, TouchableOpacity,TextInput, View,FlatList,Image,
SafeAreaView,Pressable } from 'react-native'
import React,{useEffect} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from 'react' 
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-elements'
import { db,auth } from './Firebase'
const SplashScreen = ({navigation,route}) => {
 const [Answers,setAnswers]=useState(route.params.answers)
 

  return (
    <SafeAreaView style={{margin:10}}>
        
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Text>Results</Text>
      {/* <View style={{flexDirection:'row',alignItems:'center',marginRight:14}}>
        <Text>Share</Text>
        <Ionicons style={{marginLeft:4}} name='share-social-outline' size={18} color='black'/>
      </View> */}
    </View>
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:10}}>
        <Text>Questions Answered</Text>
        {/* <Text>{route.params.index}</Text> */}
    </View>
    <Pressable style={{backgroundColor:'#fff',height:300,borderRadius:7,marginTop:20}}>
    <Text style={{color:'magenta',fontSize:15,fontWeight:'500',textAlign:'center',marginTop:8}}>Score Card</Text>
    <FlatList numColumns={2} data={Answers} renderItem={({item,i})=>(
        <View style={{alignItems:'center',justifyContent:'center',margin:10,flexDirection:'row',
       marginLeft:'auto',marginRight:'auto' }}>
            <Text>{item.question}</Text>
            {item.answer === true ?(
                <>
                {/* {setPasscount(Passcount+1)} */}
                  <Ionicons style={{
                    borderColor: '#00ffff', textAlign: 'center', borderWidth: 0.5,
                    width: 40, height: 40,  padding: 10,marginLeft:5,
                }} name='checkmark-circle' size={20} color='green' />
                </>
            ):(
                <Ionicons style={{
                    marginLeft:5,
                }} name='close-circle-sharp' size={20} color="red" />
            )}
        </View>
    )}/>
   
    </Pressable>
    
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image:{
        height:150,
        width:210,
        
      },
      inputContainer:{
      
        height:50,
        width:'100%',
        borderRadius:10,
        // borderWidth:1,
        flexDirection:'row',
        backgroundColor:'#eee',
        alignItems:'center',
        paddingHorizontal:20, 
        
        
    },
    signinButton:{
      backgroundColor:'#fff',
      borderWidth:1,
      marginHorizontal:20,
      height:40,
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
  },
  signinButtonText:{
      fontSize:18,
      lineHeight:18 * 1.4,
      color:'#000',
      
  },
})