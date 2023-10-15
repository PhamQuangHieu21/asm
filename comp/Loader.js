import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'

const Loader = ({visible = false }) => {
  return visible && 
  <View style={[styles.container,{height:"100%", width:"100%"}]}>
    <View style={styles.loader}>
    <ActivityIndicator size={'large'} color= "blue" />
    <Text style={{margin:10,padding:10,fontSize:18,}}>Loading</Text>
    </View>
  </View>
}

export default Loader

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        zIndex:10,
        backgroundColor:"rgba(0,0,0,0.5)",
        justifyContent:"center",
    },
    loader:{
        height:70,
        width:170,
        backgroundColor:"pink",
        marginHorizontal:50,
        borderRadius:5,
        flexDirection:"row",
        alignSelf:"center",
        paddingHorizontal:20,
    },
})