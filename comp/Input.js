import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
    label,
    iconName,
    error,
    password,
    onFocus = () => {},
    ...props
}) => {
    const [isFocus,setisFocus] = useState(false);
    const [hidePassWord,sethidePassWord] = useState(password);
  return (
    <View style={{marginBottom:20}}>
      <Text style={styles.label}>
        {label}
      </Text>
      <View style={[styles.inputContainer,
        {borderColor: error ? "red":isFocus ? "darkblue" : "light"}]}>
        <Icon name={iconName} 
        style={{fontSize:18, color:"blue",marginRight:10,marginTop:10,}}/>
        <TextInput 
        secureTextEntry={hidePassWord}
        autoCorrect={false}
        onFocus={()=>{
            onFocus();
            setisFocus(true);
        }}
        onBlur={()=>{
            setisFocus(false);
        }}
        style={{color:"darkblue", flex:1}}
        {...props} />
        {password && (<Icon name={hidePassWord ? 'eye-outline' : "eye-off-outline"} 
        style={{fontSize:22, color:"blue",marginTop:10}}
        onPress={() => sethidePassWord(!hidePassWord)}/>) }
        
      </View>
      {error && <Text style = {{color:"red", fontSize:12, marginTop:8,marginLeft:10}}>
        {error}
      </Text>}
      
    </View>
  )
};


export default Input

const styles = StyleSheet.create({
    label:{
        marginVertical:5,
        marginLeft:10,
        fontSize:16,
        color:"blue",
    },
    inputContainer:{
        width:333,
        height:44,
        backgroundColor:"#E5D1FA",
        borderWidth:0.5,
        borderRadius:12,
        paddingHorizontal:15,
        flexDirection: "row",
        alignSelf:"center",
    },
})