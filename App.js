import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './comp/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import List from './comp/List';
import Post from './comp/Post';
import Comment from './comp/Comment';
import Account from './comp/Account';
import Tabs from './comp/Tabs';
import Register from './comp/Register';
import UpdatePost from './comp/UpdatePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import Follower from './comp/Follower';

const StackDemo = createNativeStackNavigator();
export default function App() {

  return (
    <NavigationContainer screenOptions={{headerShown: false}}>

      <StackDemo.Navigator initialRouteName='Login' screenOptions={{headerShown:false}} >
        <StackDemo.Screen name='Login' component={Login} />
        <StackDemo.Screen name='List' component={List} options={{title:'News'}} />
        <StackDemo.Screen name="Comment" component={Comment} />
        <StackDemo.Screen name='Post' component={Post} options={{title:'Post'}} />
        <StackDemo.Screen name='Account' component={Account} options={{title:'Account'}} />
        <StackDemo.Screen name='Register' component={Register} />
        <StackDemo.Screen name='Tabs' component={Tabs} />
        <StackDemo.Screen name='UpdatePost' component={UpdatePost} />
        <StackDemo.Screen name='Follower' component={Follower} screenOptions={{headerShown: true}}/>
      </StackDemo.Navigator>
    </NavigationContainer>
  );
}

