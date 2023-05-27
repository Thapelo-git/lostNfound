import { StyleSheet, Text, TouchableOpacity,TextInput, View,FlatList,Image,Pressable } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React,{useEffect} from 'react'

import { useState } from 'react' 

import { db,auth } from './Firebase'
const FoundScreen = () => {
  const [Student, setStudent] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const user = auth.currentUser.uid;
  const [searchText,setSearchText]=useState('')
  useEffect(() => {
      db.ref('/StudentResults').on('value', snap => {

          const Student = []
          snap.forEach(action => {
              const key = action.key
              const data = action.val()
              Student.push({
                  key: key,
                  answers: data.answers,user:data.user,
                  email:data.email,name:data.name,
                  phonenumber:data.phonenumber, points:data.points,
                  
              })
              setStudent(Student)
              const text='Found'
              if(text){
               const newData = Student.filter(function(item){
                   const itemData = item.Status ? item.Status
                   :'';
                   const textData = text;
                   return itemData.indexOf( textData)>-1;
   
               })
              
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
            <Text>{route.params.index}</Text>
        </View>
        <Pressable style={{backgroundColor:'#fff',height:300,borderRadius:7,marginTop:20}}>
        <Text style={{color:'magenta',fontSize:15,fontWeight:'500',textAlign:'center',marginTop:8}}>Score Card</Text>
        <FlatList numColumns={2} data={route.params.answers} renderItem={({item,i})=>(
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
        {/* <Text>{Passcount}</Text> */}
        {/* <Pressable
        onPress={navigation.navigate('HomeScreen')}
         style={{backgroundColor:'green',padding:8,marginLeft:'auto',marginRight:'auto',marginBottom:20,}}>
            <Text style={{color:'#fff',textAlign:'center'}}>Continue</Text>
        </Pressable> */}
        </SafeAreaView>
  )
}

export default FoundScreen

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
})