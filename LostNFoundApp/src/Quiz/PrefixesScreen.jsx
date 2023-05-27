import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
    Avatar,
    Button,
    Caption,
    Card,
    Divider,
    Title,
    Text as Texts,
  } from "react-native-paper";
const PrefixesScreen = () => {
  return (
    <View style={{backgroundColor:'#fff',height:300,marginTop:20,padding:30}}>
    <Text style={{fontWeight:'bold',color:"green"}}>PREFFIXES</Text>
    <Divider />
    <Text>Prefix-  a word or syllable joined to the front of a word to change or add its meaning</Text>
    <Divider />
    <Text style={{fontWeight:'bold',color:"green"}}>Types of prefixes</Text>
    <Divider style={{height:8}}/>
<Text>- mis... - wrongly[ mistake, misunderstand]</Text>
<Text>- dis... - opposite of or Not[disconnect, dismiss]</Text>
<Text>- anti...- Against[ antibiotic, antifreeze]</Text>
  </View>
  )
}

export default PrefixesScreen

const styles = StyleSheet.create({})