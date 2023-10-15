import {
  Alert,
  Button, Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Post = (props) => {

  //check admin
  const [checked, setChecked] = useState([]);

  const getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('Login')
      if (value != null) {
        setChecked(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  }
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getLoginInfo();
    });
    return unsubscribe;

  }, [props.navigation]);

  const [img_source, setimg_source] = useState(null);

  const [isContent, setisContent] = useState('');
  const [isImage, setisImage] = useState(
    'data:image/jpeg;base64,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'
  );
  //dropdown tam trang
  const [open, setOpen] = useState(false);//lưu trạng thái dropdown xổ hoặc không xổ
  const [value, setValue] = useState(null);//lưu giá trị người dùng chọn phần tử nào
  const [items, setItems] = useState([]);

  const getDropDown = async () => {
    let from_api = 'http:/192.168.1.15:80/Categories';
    // dùng vòng lặp để chuyển đổi
    fetch(from_api)
      .then((res) => {
        return res.json();
      })
      .then(async (res_json) => {
        let arr_for_dropdown = res_json.map((item, index, arr) => {
          return { label: item.mood, value: item.id, }
        });
        setItems(arr_for_dropdown);
      })
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getDropDown();
    });
    return unsubscribe;

  }, [props.navigation]);

  const AddPost = () => {
    //valid
    if (isContent.length == 0) {
      Alert.alert('Bạn chưa nhập nội dung bài viết !');
      return;
    }
    let objPost = {
      // làm đúng trình tự như ở trên s
      CategorieId: value,
      content: isContent,
      image: isImage,


    };
    let url_api = 'http://192.168.1.15:80/Posts?_expand=Categorie';
    fetch(url_api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

      },
      body: JSON.stringify(objPost)

    })
      .then((res => {
        if (res.status == 201)
          alert("post thành công");
        // console.log(objPost);
        //

      })
      )
      .catch((ex) => {
        console.log(ex);
      })
  }

  //thêm ảnh
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setimg_source(result.assets[0].uri);
      let _uri = result.assets[0].uri;
      let file_ext = _uri.substring(_uri.lastIndexOf('.') + 1);
      FileSystem.readAsStringAsync(_uri, { encoding: "base64" })
        .then((res) => {
          setisImage("data:image/" + file_ext + ";base64," + res);

        });
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.newPost}>Post Hear</Text>
      <TextInput style={styles.Textinput} placeholder="write here............."
        onChangeText={(txt) => { setisContent(txt) }}
      />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={pickImage} >
          <Image style={{ width: 100, height: 100 }}
            source={{ uri: isImage }} />
        </TouchableOpacity>
        <Text style={{ marginTop: 32, marginLeft: 12, fontSize: 18, marginRight: 4 }}>Trạng Thái</Text>
        <View style={styles.containerDropdown}>
          <DropDownPicker onPress={getDropDown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>
      {checked.check == 1 ?
        <Pressable style={styles.button}>
          <Text style={styles.loginText} onPress={AddPost}>Post</Text>
        </Pressable> : <Text style={{ textAlign: 'center', fontSize: 22, color: "red" }}>Bạn không thể post bài</Text>
      }
    </View>
  )
}

export default Post

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  newPost: {
    fontWeight: 'bold',
    fontSize: 30,
    color: "#AA5656",
    textAlign: 'center'

  },
  Textinput: {
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "blue",
    marginTop: 20,
  },
  button: {
    borderRadius: 14,
    margin: 23,
    backgroundColor: "#85CDFD",
    width: 122,
    height: 44,
    alignSelf: 'center',
  },
  loginText: {
    textAlign: "center",
    margin: 6,
    fontSize: 16,

  }, containerDropdown: {
    alignSelf: 'center',
    width: 200,
    backgroundColor: "pink",
    zIndex: 100,// thứ tự xếp chồng view
  },

})