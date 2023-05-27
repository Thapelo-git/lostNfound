import { Pressable, StyleSheet, Text, View } from 'react-native'

import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Questions from './Questions'
import { db,auth } from '../Screens/Firebase'
const QuizScreen = ({navigation}) => {
    const data = Questions
    const totalQuestion=data.length
    //points
    const [points, setPoints] = useState(0)
    //index of the question
    const [index, setIndex] = useState(0)
    //answer Status {true or false}
    const [answerStatus, setAnswerStatus] = useState(null)
    //answer
    const [answer, setAnswer] = useState([])
    //selected answer
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    //Conuter
    const [counter, setCounter] = useState(20)
    //interval
    let interval = null
    //progress bar
    const progressPercentage = Math.floor((index/totalQuestion)*100)
    useEffect(() => {
        if (selectedAnswerIndex !== null) {
            if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
                setPoints((points) => points + 10)
                setAnswerStatus(true)
                answer.push({ question: index + 1, answer: true })
            } else {

                setAnswerStatus(false)
                answer.push({ question: index + 1, answer: false })
            }
        }
    }, [selectedAnswerIndex])

    useEffect(() => {
        setSelectedAnswerIndex(null)
        setAnswerStatus(null)
    }, [index])
    useEffect(() => {
        const myInterval = () => {
            if (counter >= 1) {
                setCounter((counter) => counter - 1)
            }
            if (counter === 0) {
                setIndex(index + 1)
                setCounter(20)
            }
            
        }
        interval = setTimeout(myInterval, 1000)
            //clean up
            return () => {
                clearTimeout(interval)
            }
    }, [counter])
    useEffect(() => {
        if (index + 1 > data.length) {
            clearTimeout(interval)
            navigation.navigate('ResultsScreen', {
                answers: answer,
                points: points,
               
            })
        }
    }, [index])

    useEffect(() => {
        if (!interval) {
            setCounter(20)
        }
    }, [index])
    const currentQuestion = data[index]
    const user = auth.currentUser.uid;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [Uid,setUid]=useState('')
   
    useEffect(() => {
        db.ref('/StudentCard/' + user).on('value', snap => {

            setName(snap.val() && snap.val().fullname);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
            setUid(snap.val().uid)
        }) 

    }, [])
    const AddResults = () => {
      
        db.ref('StudentCard').child(Uid).update({answers: answer,
            points: points,})
            .then(()=>db.ref('StudentCard').once('value'))
            .then(snapshot=>snapshot.val())
            .catch(error => ({
              errorCode: error.code,
              errorMessage: error.message
            })); 
      
          navigation.navigate('HomeScreen')
  
    }
  return (
    <SafeAreaView>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
        <Text>Quiz Challenge</Text>
        <Pressable style={{padding:10,backgroundColor:'magenta',borderRadius:20}}>
        <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}} >{counter}</Text>
        </Pressable>
       
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
        <Text>Your Progress</Text>
        <Text>({index}/{totalQuestion}) questions answered</Text>
    </View>
    {/* Progress Bar */}
    <View 
    style={{
        backgroundColor:'#fff',
        width:'100%',flexDirection:'row',alignItems:'center',
        height:10,borderRadius:20,justifyContent:'center',
        marginTop:20,marginLeft:10
    }}>
        <Text
        style={{backgroundColor:"#ffC0CB",borderRadius:12,position:'absolute',
        left:0,height:10,right:0,width:`${progressPercentage}%`,
        marginTop:20}}/>
    </View>
    <View style={{ backgroundColor: '#f0f8ff', marginTop: 10, padding: 10, borderRadius: 6 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{currentQuestion?.question}</Text>
    </View>
    <View style={{ marginTop: 12 }}>
        {currentQuestion?.options.map((item, index) => (
            <Pressable
                onPress={() => selectedAnswerIndex === null && setSelectedAnswerIndex(index)}

                style={selectedAnswerIndex === index &&
                    index === currentQuestion.correctAnswerIndex ? {
                    flexDirection: 'row', alignItems: 'center', borderWidth: 0.5,
                    borderColor: '#00ffff', marginVertical: 10, borderRadius: 20,
                    backgroundColor: 'green'
                } : selectedAnswerIndex !== null && selectedAnswerIndex === index ?
                    {
                        flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, backgroundColor: 'red',
                        borderColor: '#00ffff', marginVertical: 10, borderRadius: 20
                    } : {
                        flexDirection: 'row', alignItems: 'center', borderWidth: 0.5,
                        borderColor: '#00ffff', marginVertical: 10, borderRadius: 20
                    }}>
                {
                    selectedAnswerIndex === index && index === currentQuestion.correctAnswerIndex ? (
                        <Ionicons style={{
                            borderColor: '#00ffff', textAlign: 'center', borderWidth: 0.5,
                            width: 40, height: 40,  padding: 10,
                        }} name='checkmark-circle' size={20} color='#fff' />
                    ) : selectedAnswerIndex != null && selectedAnswerIndex === index ? (
                        <Ionicons style={{
                            borderColor: '#00ffff', textAlign: 'center', borderWidth: 0.5,
                            width: 40, height: 40, padding: 10,
                        }} name='close-circle-sharp' size={20} color="#fff" />
                    ) : (
                        <Text style={{
                            borderColor: '#00ffff', textAlign: 'center', borderWidth: 0.5,
                            width: 40, height: 40,  padding: 10,
                        }}>{item.options}</Text>
                    )
                }

                <Text style={{ marginLeft: 10 }}>{item.answer}</Text>
            </Pressable>

        ))}
    </View>
        <View style={answerStatus === null ? null : {marginTop:45,backgroundColor:'#f0f8ff',padding:10,
        borderRadius:7,height:120}}>
            {answerStatus === null ? null:(
                <Text style={answerStatus == null ? null :{fontSize:17,
                textAlign:'center',fontWeight:'bold'}}>{!!answerStatus ?"Correct Answer":
                "Wrong Answer"}</Text>
            )}
            {
                index +1 >= Questions.length ?(
                    <Pressable
                    onPress={()=>
                    AddResults()}
                    style={{backgroundColor:'green',padding:10,
                    marginLeft:'auto',marginRight:'auto',marginTop:20,
                    borderRadius:6}}>
                        <Text style={{color:'#fff'}}>Done</Text>
                    </Pressable>
                    
                ):answerStatus === null ? null :(
                    <Pressable 
                    onPress={()=>setIndex(index + 1)}
                    style={{backgroundColor:'green',padding:10,marginLeft:'auto',
                    marginRight:'auto',marginTop:20,borderRadius:6}}>
                        <Text style={{color:'#fff'}}>Next Question</Text>
                    </Pressable>
                )
            }
        </View>
</SafeAreaView>
  )
}

export default QuizScreen

const styles = StyleSheet.create({})