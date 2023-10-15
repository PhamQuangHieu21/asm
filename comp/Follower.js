import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'

const Follower = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isReloading, setIsReloading] = useState(true);

  const getListAdmin = async () => {
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

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getListAdmin();
    });
    return unsubscribe;

  }, [props.navigation]);

  const reloadData = useCallback(
    () => {
      //hiển trị trạng thái reloading
      setIsReloading(true);
      //load lại list
      getListAdmin();

      setTimeout(() => {
        setIsReloading(false);
      }, 2222)
    }
  )

  const renderPostAdmin = ({ item, index, }) => {
    // const deleteSP = () => {
    //   // link xóa
    //   let url_api_del = 'http://192.168.22.31:3000/Posts/' + item.id;

    //   fetch(url_api_del, {
    //     method: 'DELETE',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     }
    //   })
    //     .then((res) => {
    //       if (res.status == 200) {
    //         alert("Đã xóa");
    //         getListPost();
    //       }

    //     })
    //     .catch((ex) => {
    //       console.log(ex);
    //     });

    // }


    return (
      <View style={styles.box}>
        <View style={{ flexDirection: 'row', margin: 4, }}>
          <Image source={require('../Image/User.png')} style={{
            width: 44,
            height: 44,
            borderRadius: 32,
          }} />
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
        </View>
        {/* { checked.check == 1 ? (
                <View style={styles.button}>
               <Pressable style={styles.button_image}>
              <Text style={styles.textbutton_image} onPress={deleteSP}>Xóa</Text>
            </Pressable>
            <Pressable style={styles.button_image} >
              <Text style={styles.textbutton_image} 
              onPress = {() => props.navigation.navigate('UpdatePost',{item_post:item}) } 
              >Sửa</Text>
            </Pressable>
             </View> 
             ) : ""
              }  */}
      </View>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView
        nestedScrollEnable={true}
        style={{ width: "100%", height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={isReloading} onRefresh={reloadData} />
        }>
        <View style={styles.container}>
          <View style={styles.view} />
          <Image source={require('../Image/User.png')} style={styles.image} />
          <Pressable style={[styles.button_theodoi, { marginLeft: 12, top: -10 }]}>
            <Text style={styles.text_button}>Theo Dõi</Text>
          </Pressable>
          <Text style={styles.text}>Admin</Text>
          <Pressable style={[styles.button_theodoi, { marginLeft: 280, top: -80 }]}>
            <Text style={styles.text_button}>Nhắn Tin</Text>
          </Pressable>
          <View style={styles.boxAdmin}>
            <Text style={styles.text2}>5 người theo dõi</Text>
            <Text style={styles.text2}>15 Bài Viết</Text>
            <Text style={styles.text2}>Sống tại Hà Nội</Text>
            <Text style={styles.text2}>888 bạn bè chung</Text>
          </View>
          <Text style={styles.text_post}>Bài Viết</Text>
        </View>


        <ScrollView style={{ width: "100%", height: "100%" }}>
          {
            isLoading ? <ActivityIndicator /> : (
              <FlatList style={styles.list}
                data={data}
                renderItem={renderPostAdmin}
                keyExtractor={item => { return item.id }}
              />
            )
          }
        </ScrollView>
      </ScrollView>

    </SafeAreaView>
  )
}

export default Follower

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  view: {
    width: 400,
    height: 200,
    backgroundColor: "#7B8FA1",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 56,
    top: -40,
    alignSelf: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    top: -60,
  },
  text2: {
    fontSize: 16,
    margin: 4,
    marginLeft: 5,
  },
  boxAdmin: {
    width: 400,
    height: 140,
    borderWidth: 1,
    top: -50
  },
  button_theodoi: {
    width: 100,
    height: 44,
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: "#39B5E0",
    justifyContent: "center",
  },
  text_button: {
    textAlign: "center",
    fontSize: 18,
  },
  text_post: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",

  },
  box: {
    flex: 1,
    borderWidth: 1,
    marginTop: 8,
    width: 400,
    height: 360,
    backgroundColor: '#282A3A'
  },
  box2: {
    width: 300,
    height: 266,
  },
  text_image: {
    marginLeft: 8,
    fontSize: 16,
    marginBottom: 8,
    color: 'white'
  }, img: {
    width: 400,
    height: 200,
  },
})