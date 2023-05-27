import { StyleSheet, Text, TouchableOpacity,TextInput, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState } from 'react' 
import Feather from 'react-native-vector-icons/Feather'
import { db } from './Firebase'
import { Rating, AirbnbRating } from 'react-native-ratings';
//AdminView
const ViewRating = ({navigation,route}) => {
    const [Student,setStudent]=useState(route.params.element)
   const [searchText,setSearchText]=useState('')
   const updateAvailability = (key) => { 
    db.ref('LostCard').child(key).update({Status:''})
      .then(()=>db.ref('LostCard').once('value'))
      .then(snapshot=>snapshot.val())
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message
      }));
 

}
  return (
    <View>
         <View style={styles.headerContainer}
        >
          <View style={{
            backgroundColor: 'white',
            opacity: 0.7, width: 30,
            height: 100, justifyContent: 'center', alignItems: 'center',
            borderRadius: 10,
          }}>
            <Feather name="arrow-left" size={30} color='black'
              onPress={() => navigation.goBack()} />
          </View>
          <Text style={styles.headerTitle}></Text>
        </View>
        <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <View style={styles.inputContainer}>

                    <Ionicons name="search" size={24} />

                    <TextInput
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        
                        placeholder="Enter  Student  Number"
                        onChangeText={(text) => setSearchText(text)} />
                  
                </View>
            </View>
            {
              Student.StudentNumber === searchText ?(
                <>
                <Text>Correct Student number</Text>
                <Text>Remove Card from List</Text>
                <TouchableOpacity style={styles.signinButton}
          onPress={()=>updateAvailability(Student.key)} >
                  <Text style={styles.signinButtonText}>Remove</Text>
                  </TouchableOpacity></>
              ):(<>
              <Text>Wrong Student number</Text></>)
            }
    </View>
  )
}

export default ViewRating

const styles = StyleSheet.create({
    headerContainer: {
        top: 10,
        flexDirection: 'row', justifyContent: 'space-between',
        alignContent: 'center'
    
    
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