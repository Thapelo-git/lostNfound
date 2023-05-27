import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { db,auth } from './Firebase';
import Feather from 'react-native-vector-icons/Feather'
import { Rating, AirbnbRating } from 'react-native-ratings';
import LostScreen from './LostScreen';
import LostDetails from './LostDetails';
import {Avatar ,Button, Divider} from 'react-native-elements';
import AdminHome from './AdminHome';
import SplashScreen from './SplashScreen';
//AdminView
const AdminView = ({navigation,route}) => {
  const [page,setPage]=useState(1)
  return (
    <View>
      <View style={styles.headerContainer}>
     <Text style={styles.headerTitle}></Text>
            </View>
   
    {/* <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:20,
      justifyContent:'flex-start',width:100}}/> */}
         <View style={styles.headerContainer}
        >
          <View style={{
            backgroundColor: 'white',
            opacity: 0.7, width: 30,
            height: 30, justifyContent: 'center', alignItems: 'center',
            borderRadius: 10,
          }}>
            <Feather name="arrow-left" size={30} color='black'
              onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.headerTitle}>Logout</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
    width:250,height:60,}}>
          {/* <TouchableOpacity style={{width:130,height:45,borderColor:page === 0?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(0)}>
              <Text style={{color:page===0?'#3EA055':'gainsboro',fontWeight:'bold'}}>list of  Student</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={{width:130,height:45,borderColor:page === 1?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(1)}>
              <Text style={{color:page===1?'#3EA055':'gainsboro',fontWeight:'bold'}}>List of students</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={{width:130,height:45,borderColor:page === 2?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}}
        onPress={()=>setPage(2)}>
              <Text style={{color:page===2?'#3EA055':'gainsboro',fontWeight:'bold'}}>Found Card</Text>
          </TouchableOpacity> */}
      </View>
      <View style={{
    width:'100%',}}>
      {/* {
            page === 0?(<LostDetails/>):(null)
        } */}
        {
            page === 1?(<AdminHome navigation={navigation}/>):(null)
        }
         {/* {
            page === 2?(<SplashScreen navigation={navigation}/>):(null)
        } */}
        
        </View>
      
        </View>
    </View>
  )
}

export default AdminView

const styles = StyleSheet.create({
    headerContainer: {
        top: 10,
        flexDirection: 'row', justifyContent: 'space-between',
        alignContent: 'center'
  
      },
      signinButton:{
        backgroundColor:'#000',
        borderWidth:1,
        marginHorizontal:20,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width:'100%'
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20
  },
  headerTitle: {
      fontSize: 20,
      lineHeight: 20 * 1.4,  
      textAlign: 'center'

  },
})