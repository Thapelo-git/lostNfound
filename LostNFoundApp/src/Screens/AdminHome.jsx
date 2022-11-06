import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  
} from 'react-native' 
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-paper';
import { db,auth } from './Firebase';
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const AdminHome = ({navigation}) => {
  const [Student, setStudent] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const user = auth.currentUser.uid;
  useEffect(() => {
      db.ref('/LostCard').on('value', snap => {

          const Student = []
          snap.forEach(action => {
              const key = action.key
              const data = action.val()
              Student.push({
                  key: key,
                  Status: data.Status,
                  IDnumber:data.IDnumber,Initials:data.Initials,
                  Name:data.Name, StudentNumber:data.StudentNumber,
                  
              })
              const text='Lost'
              if(text){
               const newData = Student.filter(function(item){
                   const itemData = item.Status ? item.Status
                   :'';
                   const textData = text;
                   return itemData.indexOf( textData)>-1;
   
               })
               setStudent(newData)
               setFilteredDataSource(newData);
               setMasterDataSource(newData);
             }
  
          })
      })
  }, [])
  const searchFilterFunction = (text) => {
    if (text) {
        const newData = masterDataSource.filter(function (item) {
            const itemData = item.StudentNumber? item.StudentNumber.toUpperCase()
                : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;

        })
        setFilteredDataSource(newData);
        
    } else {
        setFilteredDataSource(masterDataSource);
        
    }
}
//DESIRE DESTINATION
//enter 
  const updateAvailability = (key) => { 
    db.ref('LostCard').child(key).update({Description:'Admin have your  Card'})
      .then(()=>db.ref('LostCard').once('value'))
      .then(snapshot=>snapshot.val())
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message
      }));
 

}
  const Card = ({ element, index }) => {
    return (
       <>
       <Text>Student Want Card </Text><TouchableOpacity 
       onPress={()=>navigation.navigate('ViewRating',{element:element,index:index})}>
        <Text style={{color:'blue'}}>Click here</Text></TouchableOpacity>
       <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
       <View style={{width:'100%'}}>
        
                  <View style={{  justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                <Image source={require('../Images/tutemblem.jpg')}
                style={{ width:230,height:70}}/>
                  </View>
                </View>

                <Divider style={{width: 10, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                {/* event type */}
                <View style={{flexDirection:'row',}}>
                <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                  {/* <Ionicons name="documents" color='#333' size={20} /> */}
                  <Text style={{paddingHorizontal: 5,color:'#333'}}>
                   
                  </Text>
                </View>
                <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                
                  <Text style={{paddingHorizontal: 5,color:'#333'}}>
                   {element.Name}  : {element.Initials} 
                  </Text>
                </View>
                </View>
                <Divider style={{width: 120, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                {/* date */}
                <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center' }}>
                  {/* <Feather
                    name="calendar" size={20}
                    style={{ paddingHorizontal: 5 }}
                    color='blue'
                  /> */}
                  
                  <Text style={{color:'blue', fontWeight:'bold'}}>
                     {element.StudentNumber}
                  </Text>
                </View>

                <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

              {/* location */}
              <View style={{flexDirection:'row'}}>
              <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                  {/* <Image source={reqiure('../')}/> */}
              </View>
              <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                <View>
                <Image source={require('../Images/bar_code.jpg')}
                style={{ width:230,height:20}}/>
                </View>
                
              </View>
              </View>
              <Divider style={{width: 200, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

              {/* description */}
              <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                <Text>If you have the Card please alert Student</Text>
              <TouchableOpacity style={styles.signinButton}
          onPress={()=>updateAvailability(element.key,)} >
            <Text style={styles.signinButtonText}>Alert Student</Text>
        </TouchableOpacity>
              </View>
              </View>
       </>)
}
 
  
  return (
    <View>
     <View>
     <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <View style={styles.inputContainer}>

                    <Ionicons name="search" size={24} />

                    <TextInput
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        
                        placeholder="Search by Student Number"
                        onChangeText={(text) => searchFilterFunction(text)} />
                  
                </View>
            </View>
       <FlatList
            keyExtractor={(_, key) => key.toString()}
           
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            data={filteredDataSource}
            renderItem={({ item, index }) => <Card element={item} index={index} />}
        />
    </View>
    </View>
  )
}

export default AdminHome

const styles = StyleSheet.create({
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
    headerContainer: {
      top: 10,
      flexDirection: 'row', justifyContent: 'space-between',
      alignContent: 'center'
  
  
    },
})