import { View, Text } from 'react-native'
import React, {Component} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from './HomeScreen';
import Profile from './Profile';
import LostDetails from './LostDetails';
import FoundDetails from './FoundDetails';

const Tab = createMaterialBottomTabNavigator()
const TabScreen = () => {
    return (
      <Tab.Navigator
      initialRouteName="Home"
      activeColor="#3EA055"
      barStyle={{
        backgroundColor:'#fff',
          borderRadius: 15, elevation: 6, alignItems:'center', justifyContent: 'center', position:'absolute', marginVertical:20,marginHorizontal:25, height:65,paddingBottom:10, paddingLeft:10, paddingRight:10,bottom:20, paddingTop:10
      }}
      
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
          <FontAwesome name="home" color={color} size={24} />
          ),
        }}
      />
     
      {/* <Tab.Screen
        name="Lost"
        component={LostDetails}
        options={{
          tabBarLabel: 'Lost',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="vcard-o" color={color} size={24} />
          
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Found"
        component={FoundDetails}
        options={{
          tabBarLabel: 'Lost',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="vcard" color={color} size={24} />
          
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({ color }) => (
          <FontAwesome name="user" color={color} size={24} />
          ),
        }}
      /> 
      </Tab.Navigator>
    )
  }
  
  export default TabScreen