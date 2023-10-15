import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import List from './List';
import Post from './Post';
import Account from './Account';


const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ...styles.shadow
        }}
        onPress={onPress} >
        <View
            style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: '#e32f45'
            }} >
            {children}
        </View>
    </TouchableOpacity>
)

const Tabs = (props) => {


    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "white",
                    borderRadius: 18,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={List}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image
                                source={require('../assets/images/home.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, }}>Home</Text>
                        </View>
                    )
                }}
            />

            <Tab.Screen name="Post" component={Post}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={require('../assets/images/post.png')}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: "white"
                            }}
                        />
                    ),
                    tabBarButton: (props) => (<CustomTabBarButton {...props} />)
                }} />


            {/* <Tab.Screen name="Notify" component={Notify}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image
                                source={require('../assets/images/notify.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, }}>Notify</Text>
                        </View>
                    )
                }} /> */}
            <Tab.Screen name="Account" component={Account}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                            <Image
                                source={require('../assets/images/account.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: focused ? '#e32f45' : '#748c94'
                                }}
                            />
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12, }}>Account</Text>
                        </View>
                    )
                }} />
        </Tab.Navigator>
    );
}

export default Tabs

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "pink",
        textShadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
})