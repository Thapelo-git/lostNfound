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
const SuffixesScreen = () => {
  return (
    <View style={{backgroundColor:'#fff',height:300,marginTop:20,padding:30}}>
      <Text style={{fontWeight:'bold',color:"green"}}>SUFFIXES</Text>
      <Divider />
      <Text>Surfix- a letter or set of letters joined to the end of a word to make another word.</Text>
      <Divider />
      <Text style={{fontWeight:'bold',color:"green"}}>Types of sufixes</Text>
      <Divider style={{height:8}}/>
<Text>-...ing - Action or results[ painting, cooking]</Text>
<Text>-... ion - A process[ Decoration, organisation]</Text>
<Text>-...ess - makes a feminine form [ mistress, waitress]</Text>
<Text>Suffix is a letter or group of letters, but it appears at the end of any word. It is used to change the word so that it can fit into a sentence grammatically. Like forget and forgetful “ful” is the suffix here.</Text>

<Text style={{fontWeight:'bold',color:"green"}}>Important Points on Suffix</Text>
<Text>-Like prefixes, many suffixes have the same meaning. The best example is: ‘-er’, which you add at the end of any word, represent a person who’s  performing an action. Further, ‘er’  is also added at the end of an adverbs and adjectives. This helps in the comparison of two things. 
    Like slow will be slower and fast will be faster.</Text>
<Text>-For suffixes, the spelling of the base word can change when you add a suffix at the end. For example: crazy will change to crazier or craziness.
</Text>
    </View>
  )
}

export default SuffixesScreen

const styles = StyleSheet.create({})