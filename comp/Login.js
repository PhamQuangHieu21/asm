import {
    StyleSheet,
    Text, View,
    TextInput,
    Pressable,
    SafeAreaView,
    ScrollView,
    Alert,
    Keyboard
} from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Loader from './Loader';
import Input from './Input';
import Tabs from './Tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = (props) => {
    //inputs
    const [inputs, setInputs] = useState({
        email: '',
        // fullname:'',
        password: '',
        check: 0,
    });
    //error message
    const [errors, setErrors] = useState({});
    //check loading
    const [loading, setLoading] = useState(false);

    //validate inputs
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError('Vui lòng nhập email', 'email');
            valid = false;
            return;
        }
        // else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
        //     handleError('email sai ký tự', 'email');
        //     return;
        // }
        // if(!inputs.fullname){
        //     handleError('Please input fullname','fullname');
        //     return;
        // }
        if (!inputs.password) {
            handleError('Vui lòng nhập pasword', 'password');
            return;
        }
        else if (inputs.password.length < 5) {
            handleError('password phải lớn hơn 5 ký tự', 'password');
            return;
        }

        if (valid) {
            login();
        }
    };
    //register
    const login = () => {
        setLoading(true);
        setTimeout(async () => {
            setLoading(false);

            {let userData = await AsyncStorage.getItem('user')
            if(userData){
                userData = JSON.parse(userData);
                if(
                    inputs.email == userData.email &&
                    inputs.password == userData.password
                ){
                    AsyncStorage.setItem('user',JSON.stringify({...userData, loggedIn: true}),
                    );
                    props.navigation.navigate("Tabs");
                }
                else {
                    Alert.alert('error', "Invalid details")
                }
            }
        //     else{
        //         Alert.alert('error', "User does not exist");
        //  }
        }

            // lấy dữ liệu trên mock api về
            try {
                let url_api_Login = 'http://192.168.1.15:80/Users?email=' + inputs.email;

                fetch(url_api_Login)
                    .then((res) => {
                        return res.json();
                    })
                    .then(async (arr_email) => {
                        if (arr_email.length != 1) {
                            Alert.alert("không tồn tại email hoặc password");
                            return;
                        }
                        let objU = arr_email[0];
                        if (objU.password != inputs.password) {
                            Alert.alert("không tồn tại password");
                            return;
                        }
                        if (objU.check != inputs.check) {
                            Alert.alert("bạn đang đăng nhập bằng tài khoản admin")
                        }
                        // nếu đúng thông tin người dùng thì ghi vào storage
                        try {
                            await AsyncStorage.setItem("Login", JSON.stringify(objU));
                            console.log('ghi dữ liệu thành công');
                            props.navigation.navigate('Tabs')
                        }
                        catch (e) {
                            console.log(e.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err.message);
                        console.log('Loi dang nhap');
                    });
            } catch (error) { }

        }, 2222);
    };

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    }
    console.log(inputs);
    return (
        <SafeAreaView style={styles.container}>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20, }} >
                <View >
                    <Text style={styles.text}>Log In</Text>
                    <Text style={styles.welcom} >Chào mừng bạn đến với ứng dụng</Text>
                    {/* <Text style = {styles.userName}>UserName</Text> */}
                    <Input
                        //  style = {styles.textInput} 
                        label="Email"
                        iconName="email-outline"
                        placeholder="Nhập email"
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, "email");
                        }}
                        onChangeText={text => handleOnChange(text, 'email')} />
                    {/* <Text style = {styles.userName}>PassWord</Text> */}
                    <Input
                        // style = {styles.textInput} 
                        label="Password"
                        iconName="lock-outline"
                        placeholder="Nhập password"
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, "password");
                        }}
                        onChangeText={text => handleOnChange(text, "password")}
                        password
                    />
                    <View style={[styles.viewRemember, { justifyContent: 'space-between' }]}>
                        <View style={styles.viewRemember}>
                            <BouncyCheckbox fillColor='blue' style={{ marginTop: 22, }} />
                            <Text style={{ marginTop: 22, }}>Remember me</Text>
                        </View>
                        <Text style={{ marginTop: 22, marginEnd: 15 }}>Forgot the password ?</Text>
                    </View>
                    <Pressable style={styles.buttonLogin} onPress={validate}>
                        <Text style={styles.textButton}>Login</Text>
                    </Pressable>
                    <Text style={{ textAlign: 'center', marginTop: 40 }}>Don't have an Account ?</Text>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: "#D9ACF5", marginTop: 6 }}
                        onPress={() => props.navigation.navigate('Register')}>
                        REGISTER
                    </Text>
                    {/* <Text style={{
                    textAlign:'center',
                    fontSize:28,
                    margin:8,
                    color:'#EA8FEA'
                }}
               onPress = {() => props.navigation.navigate('Tabs')} >
                  Xem với tư cách khách</Text> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,//full màn hình
        backgroundColor: "#6096B4",
        // marginStart: 10,
        // marginEnd: 10,
        flexDirection: 'column',
    },
    text: {
        fontSize: 44,
        fontWeight: "bold",
        color: "#B5F1CC",
        margin: 50,
        textAlign: 'center',
    },
    welcom: {
        textAlign: 'center',
        fontSize: 22,
        marginTop: 8,
        color: "#EEE9DA",
        marginBottom: 20,

    },
    userName: {
        marginLeft: 20,
        fontSize: 18,
    },
    textInput: {
        width: 333,
        alignSelf: 'center',//căn giữa
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 8,
    },
    viewRemember: {
        flexDirection: 'row',
        marginLeft: 12,
    },
    buttonLogin: {
        borderRadius: 14,
        margin: 23,
        backgroundColor: "#2B3467",
        width: 322,
        height: 44,
        alignSelf: 'center',

    },
    textButton: {
        color: "#F1DBBF",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'center',
        margin: 2
    },
})