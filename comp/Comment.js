import { StyleSheet, Text, View ,TouchableOpacity, RefreshControl} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Comment = ({navigation,route}) => {

    const [listcmt, setlistcmt] = useState([]);
    const [isLoading, setisLoading] = useState(true)
    const [id_posst, setid_posst] = useState(route.params.id);
    const [comment, setcomment] = useState("");
    const [obju, setobju] = useState({})

    const [reloading, setreloading] = useState(false)

    const reloadData = React.useCallback(() => {
        // xử lý công việc load lại dữ liệu đổ vào danh sách
        setreloading(true); // set trạng thái bắt đầu reload
        getDataComment();
        // mô phỏng đợi reload, nếu là reload từ server thật thì không cần viết lệnh dưới
        setTimeout(() => {
            setreloading(false); // sau 2s thì đổi trạng thái không rload nữa
        }, 2000);


    });


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('Login')
            if (value !== null) {
                setobju(JSON.parse(value));


            }
        } catch (e) {
        }
    }

    var dataCmt = {
        username: obju?.firstname+" "+obju?.lastname,
        comment: comment,
        id_post: id_posst
    }

    const AddCmt = () => {
        var url_addcmt = "http://192.168.1.15:80/tb_comment";
        fetch(url_addcmt, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataCmt)
        })
            .then((response) => {
                console.log(response.status);
                // nếu log là 201 thì là tạo thành công
                if (response.status == 201)
                    alert("Thêm mới thành công");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getDataComment = async () => {
       
        var url_cmt = 'http://192.168.1.15:80/tb_comment?id_post=' + id_posst;
        try {
            const response = await fetch(url_cmt); //lấy dữ liệu về 
            const jsonSP = await response.json(); // chuyển dũ liêu thành đt json
            console.log(jsonSP);
            setlistcmt(jsonSP);

        } catch (error) {
            console.error(error);
        } finally {
            setisLoading(false);
        }
    }

  
    const renderCmt = ({ item }) => {

        return (

            <View style={styles.item}>
                <Text style={{
                    fontWeight: '500', color: '#1877f2', fontSize: 15, marginBottom: 5,
                }}>{item.username}</Text>
                <Text style={{fontStyle:'italic'}}>{item.comment}</Text>
            </View>
        )
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            getDataComment();
            // getDataComment(); 
        });
        return unsubscribe;
    }, [navigation.navigation]);
    
    getData();

  return (
    <View style={{flex:1}}>
            <View style={{
                height:60,
                 backgroundColor:'white',
                  elevation:10,
                  alignItems:"center",
                   justifyContent:'space-between',
                    paddingTop:10, 
                    paddingLeft:10,
                    flexDirection:'row'
                    }}>
            <TouchableOpacity onPress={()=> navigation.goBack()} >
                  <Ionicons name="arrow-back-outline" size={24} color="black" style={{}} />
            </TouchableOpacity>
            <Text style={{justifyContent:'center', marginRight:'40%',fontWeight:'bold', fontSize:17}}>Comment</Text>
            </View>

            
           <FlatList
              data={listcmt}
              keyExtractor={item => item.id}
              refreshControl={
                  <RefreshControl refreshing={reloading} onRefresh={reloadData} />
              }
              renderItem={renderCmt}
           >
          </FlatList>

                <View style={{
                     flexDirection: 'row', 
                     alignItems: 'center', 
                     justifyContent: 'space-between',
                      bottom:0, position:"absolute" ,
                      width:'100%',
                      height:60,
                      backgroundColor:'white', elevation:10
                      }}>
                    <TextInput placeholder='Viết Bình Luận....' style={{
                        width: '70%', margin: 10,
                    }} multiline={true} onChangeText={(text)=>{setcomment(text)}}></TextInput>
                    <TouchableOpacity onPress={AddCmt}>
                        <Text style={{ margin: 10, fontWeight:'bold' }}>Gửi</Text>
                    </TouchableOpacity>
                </View>
         
       
    </View>
  )
}

export default Comment

const styles = StyleSheet.create({
    bottom:{
        bottom:0,
        position:'absolute',
        justifyContent:'space-between',
        alignContent:"space-between",
    },
    item:{
        marginTop:5,
        marginLeft:5,
        marginBottom:5,
        borderBottomWidth:1,
        borderColor:'white',
        backgroundColor:'white',
        elevation:10,
        borderRadius:10,
        padding:10
    }

})