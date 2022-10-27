import React,{useEffect, useState,} from 'react'
import { StyleSheet, Text, View ,StatusBar,Alert,
    TextInput,TouchableOpacity,Image,Modal,Dimensions, SafeAreaView} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"
//Adminlogin
import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import * as yup from 'yup'
import {auth,db} from '../Screens/Firebase'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorageLib from '@react-native-async-storage/async-storage'

const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const SignIn = ({props}) => {
    const navigation =useNavigation()
    const [Idnumber,setIdnumber]=useState([])
    const [isPasswordShow,setPasswordShow]=useState(false)
    const ReviewSchem =yup.object({
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
    })
    
  
    
    const signIn = async(data)=>{
        const { email, password ,idnumber} = data;
        try {
           
                    const user = await auth
                    .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
                    .then( async res => {
                        try {
                            const jsonValue = JSON.stringify(res.user)
                            await AsyncStorageLib.setItem("StudentCard", res.user.uid)
                          
        
                            navigation.navigate('HomeScreen')
                        } catch (e) {
                            console.log("no data ");
                        }
                    });

         
        } catch (error) {
            Alert.alert(error.name, error.message);
        }
    }

   
  return (
<SafeAreaView style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
            <TouchableOpacity style={{width:'100%',display:'flex',justifyContent:'flex-start',marginVertical:30}}
            onPress={()=>navigation.navigate('Adminlogin')}>
            <Image style={styles.image} source={require('../Images/lostCard.jpg')}/>
            </TouchableOpacity>
            <View style={{width:'100%',padding:20,}}>
            
              <ScrollView>
                  <Formik
                  initialValues={{email:'',password:''}}
                 validationSchema={ReviewSchem}
                 onSubmit={(values,action)=>{
                     action.resetForm()
                     signIn(values)
                 }}
                 >
                     {(props)=>(
                         <>
        
       <View style={{height:15}}></View>
             
       
        
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="mail" size={22}
      
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="Email"
                     onChangeText={props.handleChange('email')}
                     value={props.values.email}
                     onBlur={props.handleBlur('email')}
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    />
                </View>
            </View>
            {props.errors.email? <Text style={{color:"red"}}>{props.errors.email}</Text>:null}
            <View style={{height:15}}></View>
            <View >
            
        </View>
            
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Feather name="lock" size={22} color="#000"
                    style={{marginRight:10}}/>
                 <TextInput
                 secureTextEntry={isPasswordShow? false :true}
                 placeholder="Password"
                 onChangeText={props.handleChange('password')}
                 value={props.values.password}
                 onBlur={props.handleBlur('password')}
                 selectionColor='gainsboro'
                 style={styles.inputText}/>
                 <Feather
                 name="eye" size={22}
                 style={{marginRight:10}}
                 onPress={()=>setPasswordShow(!isPasswordShow)}
                 />
                </View>
            </View>
            {props.errors.password? <Text style={{color:"red"}}>{props.errors.password}</Text>:null}
            
            <Text></Text>
            <View style={styles.forgotPasswordContainer}>
                <View>
                    <Text style={styles.rememberMeText}></Text>
                </View>
                <Text style={styles.forgotPasswordText}
                onPress={()=>navigation.navigate('ForgetPassword')}
                >Forget Password</Text>
            </View>
    
            <TouchableOpacity style={styles.signinButton}
              onPress={props.handleSubmit}>
                <Text style={styles.signinButtonText}
                
                >Sign in</Text>
            </TouchableOpacity>
            </>
            )}
            </Formik>
            <View style={{width:'100%',justifyContent:'center',flexDirection:'row',marginVertical:30}}>
            <Text>Dont have account?</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
                <Text style={{color:'#3EA055',marginHorizontal:20}}>Sign Up</Text>
            </TouchableOpacity>
            </View>
            </ScrollView>
            </View>
            
 
    
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff'
        
    },
    image:{
        height:100,
        width:100,
        
      },
    headerContainer:{
       flexDirection:'row' ,
       alignItems:'center',
       justifyContent:'center',
       paddingVertical:10,
       paddingHorizontal:20
    },
    headerTitle:{
      fontSize:20,
      lineHeight:20 * 1.4,
      width:80,
      textAlign:'center'  

    },
    title:{
fontSize:20,
lineHeight:20 * 1.4,
marginTop:20,
marginBottom:50,
marginHorizontal:20
    },
    content:{
        fontSize:20,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
    inputContainer:{
        backgroundColor:'#fff',
        
       marginVertical:10,
        borderWidth:1,
        borderColor:'#000',
        justifyContent:'center',
    },
    inputSubContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    inputText:{
        fontSize:18,
        textAlignVertical:'center',
        padding:0,
        height:60,
        color:"#000",
        flex:1

    },
    forgotPasswordContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    rememberMeText:{
        marginLeft:10,
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'grey'
    },
    forgotPasswordText:{
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'#3EA055',
        fontWeight:'bold'
    },
    signinButton:{
        backgroundColor:'#3EA055',
      
        marginHorizontal:20,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
    signupContainer:{
        marginHorizontal:20,
        justifyContent:'center',
        paddingVertical:20,
        flexDirection:'row',
        alignItems:'center'
    },
    accountText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:'#000'
    },
    signupText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:'#EC8F05',
        marginLeft:5,

    },
    orText:{
        fontSize:15,
        lineHeight:15 * 1.4,
        color:'#000',
        marginLeft:5,
        alignSelf:'center'
    },
    facebookButton:{
        backgroundColor:'blue',
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    googleButton:{
        backgroundColor:'#fff',
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    }
})