import { View, Text ,Dimensions, SafeAreaView,Image,StyleSheet,TouchableOpacity,TextInput,
  FlatList} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import React ,{useState,useEffect} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { auth ,db} from './Firebase'
import {Avatar ,Button, Divider} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler'
const FoundDetails = () => {
 
  const [Student, setStudent] = useState([])
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const user = auth.currentUser.uid;
  const [searchText,setSearchText]=useState('')
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
  const updateAvailability = (key) => { 
    db.ref('LostCard').child(key).update({Status:'Lost'})
      .then(()=>db.ref('LostCard').once('value'))
      .then(snapshot=>snapshot.val())
      .catch(error => ({
        errorCode: error.code,
        errorMessage: error.message
      }));
 
 
 }
  return (
    <SafeAreaView style={{padding:10}}>
          <View style={styles.headerContainer}>
     <Text style={styles.headerTitle}>Lost Student Card?</Text>
            </View>
   
    <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:20,
      justifyContent:'flex-start',width:100}}/>
     <Text>Enter Student Number</Text>
        <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <View style={styles.inputContainer}>

                    {/* <Ionicons name="profile" size={24} /> */}

                    <TextInput
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        
                        placeholder="Enter  Student Number"
                        onChangeText={(text) => setSearchText(text)} />
                  
                </View>
            </View>
            {
            Student.map((element)=>{return(<>
           
           {
              element.StudentNumber === searchText ?(
                <View style={{padding:20}}>
                
                <Text>Post Card to Lost List</Text>
                <TouchableOpacity style={styles.signinButton}
          onPress={()=>updateAvailability(element.key,)} >
                  <Text style={styles.signinButtonText}>Post Card</Text>
                  </TouchableOpacity></View>
              ):(<>
              <Text>We don't have that  Student number Register with Admin</Text></>)
            }
              
                </>
            )})
        }
    
    </SafeAreaView>
  )
}

export default FoundDetails

const styles = StyleSheet.create({
  iconContainer:{
    justifyContent: "center",
    alignItems: "center",
    justifyContent:'center',
    backgroundColor: "#DEEDF0",
    width: 40,
    height: 40,
    borderRadius: 10
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
// inputContainer:{
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: "rgba(0,0,0,.2)",
//     borderWidth: 1,
//     height: 60,
//     borderRadius: 15,
//     paddingHorizontal: 5,
//     marginVertical: 10
// },
inputInitials:{
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,.2)",
    borderWidth: 1,
    height: 60,
    width:100,
    borderRadius: 15,
    paddingHorizontal: 5,
    marginVertical: 10 
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
signinButton:{
    backgroundColor:'#3EA055',
    
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
})