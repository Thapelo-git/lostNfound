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
      db.ref('/StudentResults').on('value', snap => {

          const Student = []
          snap.forEach(action => {
              const key = action.key
              const data = action.val()
              Student.push({
                  key: key,
                 
                  answers:data.answers,phonenumber:data.phonenumber,
                  name:data.name, email:data.email,
                  
              })
              setStudent(Student)
              setFilteredDataSource(Student);
              setMasterDataSource(Student);
            //   const text='Lost'
            //   if(text){
            //    const newData = Student.filter(function(item){
            //        const itemData = item.Status ? item.Status
            //        :'';
            //        const textData = text;
            //        return itemData.indexOf( textData)>-1;
   
            //    })
              
            //  }
  
          })
      })
  }, [])
  const searchFilterFunction = (text) => {
    if (text) {
        const newData = masterDataSource.filter(function (item) {
            const itemData = item.name? item.name.toUpperCase()
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

  const Card = ({ element, index }) => {
    return (
       <>
    
       <TouchableOpacity
       onPress={()=>navigation.navigate('SplashScreen',{answers:element.answers})}
       style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
      

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
                  Email: {element.email}
                  </Text>
                </View>
                </View>
                <Divider style={{width: 120, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                {/* date */}
                <View style={{ backgroundColor: '#fff', justifyContent: 'center', flexDirection: 'row', padding: 8, alignItems:'center' }}>
               
                  
                  <Text style={{color:'blue', fontWeight:'bold'}}>
                     Name : {element.name}
                  </Text>
                </View>

                <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

              {/* location */}
              <View style={{flexDirection:'row'}}>
              <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                 <Text> Phonenumber: {element.phonenumber}</Text>
              </View>
              <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
               
                
              </View>
              </View>
              <Divider style={{width: 200, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

              
              </TouchableOpacity>
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
                        
                        placeholder="Search by Student Name"
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