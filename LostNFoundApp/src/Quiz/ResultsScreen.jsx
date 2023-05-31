import { Pressable, StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useState ,useEffect} from 'react'
import { db,auth } from '../Screens/Firebase'
const ResultsScreen = ({navigation,route}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [Uid,setUid]=useState('')
    const [answers, setAnswers] = useState('')
   const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/StudentCard/' + user).on('value', snap => {

            setName(snap.val() && snap.val().fullname);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
            setAnswers(snap.val().answers)
            setUid(snap.val().uid)
        }) 

    }, [])
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
    {/* <Pressable style={{backgroundColor:'#fff',height:400,borderRadius:7,marginTop:20}}> */}
    <Text style={{color:'magenta',fontSize:15,fontWeight:'500',textAlign:'center',marginTop:8}}>Score Card</Text>
    <FlatList numColumns={2} data={answers} renderItem={({item,i})=>(
        <View style={{alignItems:'center',justifyContent:'center',margin:10,flexDirection:'row',
       marginLeft:'auto',marginRight:'auto' }}>
            <Text>{item.question}</Text>
            {item.answer === true ?(
                <>
                {/* {setPasscount(Passcount+1)} */}
                  <Ionicons style={{
                    borderColor: '#00ffff', textAlign: 'center', borderWidth: 0.5,
                    width: 20, height: 20,  padding: 10,marginLeft:5,
                }} name='checkmark-circle' size={20} color='green' />
                </>
            ):(
                <Ionicons style={{
                    marginLeft:5,
                }} name='close-circle-sharp' size={20} color="red" />
            )}
        </View>
    )}/>
   
    {/* </Pressable> */}
    {/* <Text>{Passcount}</Text> */}
    {/* <Pressable
    onPress={navigation.navigate('HomeScreen')}
     style={{backgroundColor:'green',padding:8,marginLeft:'auto',marginRight:'auto',marginBottom:20,}}>
        <Text style={{color:'#fff',textAlign:'center'}}>Continue</Text>
    </Pressable> */}
    </SafeAreaView>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({})