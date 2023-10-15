import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Share,
  color
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import UpdatePost from './UpdatePost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const List = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  //check admin
  const [checked, setChecked] = useState([])

  const [isReloading, setIsReloading] = useState(true);

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
  // useEffect(() => {
  //   getLoginInfo();
  // })

  const getListPost = async () => {
    const api_list = 'http://192.168.1.15:80/Posts?_expand=Categorie';
    fetch(api_list)
      .then((res) => res.json())
      .then((resJson) => {
        setIsReloading(false);
        setData(resJson)
      }).catch((error) => {
        console.log("Error: " + error);
      })
      .finally(() => setIsLoading(false));
  }

  const reloadData = useCallback(
    () => {
      //hiển trị trạng thái reloading
      setIsReloading(true);
      //load lại list
      getListPost();
      getLoginInfo();
      setTimeout(() => {
        setIsReloading(false);
      }, 2222)
    }
  )

  


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getListPost();
    });
    return unsubscribe;

  }, [props.navigation]);

  const renderPost = ({ item, index }) => {

    const chuyentrangUpadate = () => {
      props.navigation.navigate('Comment', { id: item.id, })
    }

    const deleteSP = () => {
      // link xóa
      let url_api_del = 'http://192.168.1.15:80/Posts/' + item.id;

      fetch(url_api_del, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Đã xóa");
            getListPost();
          }

        })
        .catch((ex) => {
          console.log(ex);
        });

    }

    const onShare = async () => {
      try {
        const result = await Share.share({
          title: item.title,
          message: item.content,
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        Alert.alert(error.message);
      }
    };

    return (
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', margin: 4, }}>
          <TouchableOpacity onPress={() => { props.navigation.navigate('Follower') }}>
            <Image source={require('../Image/User.png')} style={{
              width: 44,
              height: 44,
              borderRadius: 32,
            }} />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18, padding: 8 }}>Admin</Text>
          <Text style={{
            fontSize: 18,
            padding: 8, color: "white"
          }}> đang cảm thấy {item.Categorie.mood}</Text>
        </View>
        <View style={styles.box2}>
          <Text style={styles.text_image}>{item.content}</Text>
          <Image style={styles.img}
            source={{ uri: item.image }} />
          <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', width: Dimensions.get('window').width }}>
            <TouchableOpacity >
              <AntDesign name="like2" size={24} color="white" style={{ margin: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={chuyentrangUpadate}>
              <FontAwesome name="comments-o" size={24} color="white" style={{ margin: 15 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Feather name="send" size={24} color="white" style={{ margin: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
        {checked.check == 1 ? (
          <View style={styles.button}>
            <Pressable style={styles.button_image}>
              <Text style={styles.textbutton_image} onPress={deleteSP}>Xóa</Text>
            </Pressable>
            <Pressable style={styles.button_image} >
              <Text style={styles.textbutton_image}
                onPress={() => props.navigation.navigate('UpdatePost', { item_post: item })}
              >Sửa</Text>
            </Pressable>
          </View>
        ) : ""
        }
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView
          nestedScrollEnable={true}
          style={{ width: "100%", height: "100%" }}
          refreshControl={
            <RefreshControl refreshing={isReloading} onRefresh={reloadData} />
          }>
          <ScrollView style={{ width: "100%", height: "100%" }}>
            {
              isLoading ? <ActivityIndicator /> : (
                <FlatList style={styles.list}
                  data={data}
                  renderItem={renderPost}
                  keyExtractor={item => { return item.id }}
                />
              )
            }
          </ScrollView>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

export default List;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#393E46',
    marginBottom: 120,
    position: 'relative'
  },
  box: {
    flex: 1,
    borderWidth: 1,
    marginTop: 8,
    width: 400,
    height: 380,
    backgroundColor: '#282A3A'
  },
  img: {
    width: 400,
    height: 200,
  },
  text_image: {
    marginLeft: 8,
    fontSize: 16,
    marginBottom: 8,
    color: 'white'
  },
  button_image: {
    width: 200,
    height: 30,
    borderWidth: 1,
    backgroundColor: "#735F32",
    borderColor: '#2B3467'
  },
  textbutton_image: {
    textAlign: "center",
    fontSize: 16,
    margin: 4,
    color: 'white'
  },
  box2: {
    width: 300,
    height: 266,
  },
  button: {
    flexDirection: 'row',
    marginTop: 16
  },
})
