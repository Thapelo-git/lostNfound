import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  
} from 'react-native' 
import Feather from 'react-native-vector-icons/Feather'
import { Divider } from 'react-native-paper';
import { db,auth } from './Firebase';
const LostScreen = () => {
    const [Student, setStudent] = useState([])
    const [filteredDataSource, setFilteredDataSource] = useState();
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
    const Card = ({ element, index }) => {
        return (
           <>
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
                  {/* <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity style={styles.signinButton}
              onPress={()=>updateAccept(element.key,element.Avalability,
              element.Gender,element.Price,element.StartDate,element.Subject,element.fullname,
              element.location,)} >
                <Text style={styles.signinButtonText}
                
                >Request</Text>
            </TouchableOpacity>
                  </View> */}
                  </View>
           </>)
    }
  return (
    <View>
       <FlatList
            keyExtractor={(_, key) => key.toString()}
           horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            data={Student}
            renderItem={({ item, index }) => <Card element={item} index={index} />}
        />
    </View>
  )
}

export default LostScreen

const styles = StyleSheet.create({})