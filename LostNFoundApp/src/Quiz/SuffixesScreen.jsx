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
    </View>
  )
}

export default SuffixesScreen

const styles = StyleSheet.create({})