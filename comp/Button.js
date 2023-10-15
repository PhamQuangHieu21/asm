import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const Button = ({title, onPress = () => {} }) => {
  return (
  <TouchableOpacity
  activeOpacity={0.7}
  style={{
    height:55,
    width:"100%",
    backgroundColor:"blue",
    justifyContent: "center",
    alignItems: "center",
}}
  onPress = {onPress} >
    <Text style={{color:"white",fontWeight:'bold', fontSize:18, }}>
        {title}
         </Text>
  </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({})