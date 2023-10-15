import {
    StyleSheet,
    Text, View,
    SafeAreaView,
    ScrollView,
    TextInput,
    Keyboard,
    Alert
} from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from './Input';
import Button from './Button';
import Loader from './Loader';
import Login from './Login';

const Register = (props) => {
    //inputs
    const [inputs, setInputs] = useState({
        email: '',
        username: '',
        phone: '',
        password: '',
        check: 0,

    });
    // cho re_pass ra riêng
    const [ispass, setisPass] = useState({
        re_password: '',
    });
    //error message
    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const handleOnChange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };

    const handleOnChangePass = (text, input) => {
        setisPass(prevState => ({ ...prevState, [input]: text }));
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
    }

    //validate inputs
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError('Vui lòng nhập email', 'email');
            // valid = false;
            return;
        }
        else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('email không đúng định dạng', 'email');
            return;
        }
        if (!inputs.username) {
            handleError('vui lòng nhập tên', 'username');
            return;
        }
        if (!inputs.phone) {
            handleError('vui lòng nhập số điện thoại', 'phone');
            return;
        }
        if (!inputs.password) {
            handleError('Bạn chưa nhập password', 'password');
            return;
        }
        else if (inputs.password.length < 5) {
            handleError('password phải lớn hơn 5 ký tự', 'password');
            return;
        }
        else if (!ispass.re_password) {
            handleError('vui lòng nhập lại password', 're_password');
            return;
        }
        else if (ispass.re_password != inputs.password) {
            handleError('mật khẩu không trùng khớp, vui lòng nhập lại !', 're_password');
            return;
        }


        if (valid) {
            register();
        }
    };
    //register
    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try {
                // AsyncStorage.setItem('user',JSON.stringify(inputs))
                // props.navigation.navigate('Login');

                //đưa lên mockapi
                let api_url = 'http://192.168.1.15:80/Users';
                fetch(api_url, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(inputs),
                })
                    .then((res) => {
                        if (res.status == 201) {
                            Alert.alert("Đăng ký thành công", "Chuyển sang màn hình đăng nhập",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            props.navigation.navigate("Login");
                                        },
                                        style: "default",
                                    },
                                ]);
                            resetValue();
                        }
                    })
                    .catch((ex) => {
                        console.log(ex);
                    });
            } catch (error) {
                Alert.alert("error", "xảy ra sự cố")
            }
        }, 2222);

    }

    //restValues
    const resetValue = () => { }
    //log

    // console.log(inputs);
    return (
        <SafeAreaView>
            <Loader visible={loading} />
            <ScrollView contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20, }} >
                <Text style={styles.register}>Register</Text>
                <Text style={styles.text1}>Enter your detail to register</Text>
                <View style={{ marginVertical: 20, }}>
                    <Input label="Phone Number"
                        iconName="phone-outline"
                        placeholder="Nhập số điện thoại"
                        keyboardType="numeric"
                        error={errors.phone}
                        onFocus={() => {
                            handleError(null, "phone");
                        }}
                        onChangeText={text => handleOnChange(text, "phone")}
                    />
                    <Input label="Email"
                        iconName="email-outline"
                        placeholder="Nhập email"
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, "email");
                        }}
                        onChangeText={text => handleOnChange(text, 'email')}
                    />
                    <Input label="Full Name"
                        iconName="account-outline"
                        placeholder="Nhập tên"
                        error={errors.username}
                        onFocus={() => {
                            handleError(null, "username");
                        }}
                        onChangeText={text => handleOnChange(text, "username")}
                    />
                    <Input label="Password"
                        iconName="lock-outline"
                        placeholder="Nhập password"
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, "password");
                        }}
                        onChangeText={text => handleOnChange(text, "password")}
                        password
                    />
                    <Input label="Re-Password"
                        iconName="lock-outline"
                        placeholder="nhập lại password"
                        error={errors.re_password}
                        onFocus={() => {
                            handleError(null, "re_password");
                        }}
                        onChangeText={(text) => handleOnChangePass(text, "re_password")}
                        password
                    />
                    <Button title="Register" onPress={validate} />
                    <Text style={{ textAlign: 'center', margin: 8, }}>
                        Already have account ?
                    </Text>
                    <Text style={{ textAlign: 'center', margin: 8, fontSize: 20, fontWeight: 'bold' }}
                        onPress={() => props.navigation.navigate('Login')}>
                        LOGIN
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    register: {
        color: "black",
        fontSize: 40,
        fontWeight: "bold",
    },
    text1: {
        color: "blue",
        fontSize: 18,
        marginVertical: 10
    },
})