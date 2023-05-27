import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar, Pressable 
} from 'react-native' 

const LostScreen = ({navigation}) => {

  return (
    <View>
        <Pressable   onPress={()=>
     navigation.navigate("SuffixesScreen")}
    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#00ffff', marginVertical: 20, borderRadius: 10,
    height:80}}>
      <Text>SUFFIXES</Text>
    </Pressable>
    <Pressable   onPress={()=>
     navigation.navigate("PrefixesScreen")}
    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#00ffff', marginVertical: 20, borderRadius: 10,
    height:80}}>
      <Text>PREFIXES</Text>
    </Pressable>
     <Pressable   onPress={()=>
     navigation.navigate("QuizScreen")}
    style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1,
    borderColor: '#00ffff', marginVertical: 20, borderRadius: 10,
    height:80}}>
      <Text>EXAM</Text>
    </Pressable>
    </View>
  )
}

export default LostScreen

const styles = StyleSheet.create({})