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
<Text>A prefix is generally a letter or a group of letters which appears at the beginning of any word. 
    It can also change the original meaning of any word. Like heat and preheat, here “pre” is the prefix of the word ‘heat’.</Text>

<Text style={{fontWeight:'bold',color:"green"}}>Important Points on Prefixes</Text>
<Text>-Different prefixes which are used in the English language can also have the same meaning. For example: in-, un-, not all of them have the same meaning which is, ‘opposite of’ or ‘not’. Similarly, the prefix is- and mis- means incorrectly or wrongly.
</Text>

<Text>-Repetition of letters is also possible. If the word starts with ‘m’ and ‘n’ respectively then the double letters are also possible. For example immeasurable and unnoticeable.</Text>

<Text>-You need to be careful while seeing the words which contain the prefix, but do not contain the prefix. For example: uncle, uncle is a whole word. It doesn’t have any prefix at the beginning.
</Text>
  </View>
  )
}

export default PrefixesScreen

const styles = StyleSheet.create({})