import { View, Text ,Dimensions, SafeAreaView,Image,StyleSheet,TouchableOpacity,TextInput,
    FlatList} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import React ,{useState} from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { auth ,db} from './Firebase'
import {Avatar ,Button, Divider} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler'
const LostDetails = () => {
    const ReviewSchem=yup.object({
        IDnumber:yup.string().required().min(13).max(13),
        Name:yup.string().required().min(3),
        Initials:yup.string().required().min(1),
        StudentNumber:yup.number().required().min(9),

    })
    const user = auth.currentUser.uid;
  const addVehicle = (data) => {
    const {IDnumber,StudentNumber,Name,Initials} =data
      db.ref('StudentList').push({
      
        IDnumber,
        StudentNumber,
        Name,
        Initials,user
      })
    //   navigation.goBack()
  
  };
  return (
    <SafeAreaView style={{padding:10}}>
          {/* <View style={styles.headerContainer}>
     <Text style={styles.headerTitle}>Lost Student Card?</Text>
            </View>
   
    <Divider style={{alignItems:'flex-start',alignSelf:'flex-start',marginVertical:20,
      justifyContent:'flex-start',width:100}}/> */}
      <Formik
        initialValues={{IDnumber:'',Name:'',StudentNumber:'',Initials:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addVehicle(values)
        }}
        >
            {(props)=>(<ScrollView>
                <View style={{display:'flex',flexDirection:'row',}}>
                    <View>
        <Text>Enter   Surname </Text>
    <View style={styles.inputContainer}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                      
                        placeholder="Enter Surname"
                        onChangeText={props.handleChange('Name')}
             value={props.values.Name}
             onBlur={props.handleBlur('Name')}
                         />
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.Name && props.errors.Name}</Text>
                    </View>
                    <View style={{display:'flex',alignItems:'flex-end',justifyContent:'flex-end'}}>
        <Text>Enter  Initials </Text>
    <View style={styles.inputInitials}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                      
                        placeholder="Initials"
                        onChangeText={props.handleChange('Initials')}
             value={props.values.Initials}
             onBlur={props.handleBlur('Initials')}
                         />
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.Initials && props.errors.Initials}</Text>
                    </View>
                    </View>
    <Text>Enter  ID Number </Text>
    <View style={styles.inputContainer}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                    
                        placeholder="Enter ID Number"
                        onChangeText={props.handleChange('IDnumber')}
                        value={props.values.IDnumber}
                        onBlur={props.handleBlur('IDnumber')}/>
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.IDnumber && props.errors.IDnumber}</Text>
                    <Text>Enter  Student Number</Text>
    <View style={styles.inputContainer}><View style={styles.iconContainer} >
                        <Feather name="user" size={22} style={{marginRight:10}}/></View>
                       <TextInput
                        style={styles.input}
                     
                        placeholder="Enter Student Number"
                        onChangeText={props.handleChange('StudentNumber')}
                        value={props.values.StudentNumber}
                        onBlur={props.handleBlur('StudentNumber')} />
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.StudentNumber && props.errors.StudentNumber}</Text>
                                    <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
                                    <TouchableOpacity style={styles.signinButton}
                                 onPress={props.handleSubmit}>
                              <Text style={styles.signinButtonText}>Submit</Text>
                          </TouchableOpacity>
                                   
                            </View></ScrollView>)}
                    </Formik>
    
    </SafeAreaView>
  )
}

export default LostDetails

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
        flexDirection: "row",
        alignItems: "center",
        borderColor: "rgba(0,0,0,.2)",
        borderWidth: 1,
        height: 60,
        borderRadius: 15,
        paddingHorizontal: 5,
        marginVertical: 10
    },
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