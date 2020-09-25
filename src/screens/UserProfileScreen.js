import React,{useState,useEffect} from 'react'
import { Image,View, Text, SafeAreaView, ImageBackground, Dimensions, StyleSheet } from 'react-native'
import UserCard from '../component/UserCard'
import Icon from 'react-native-vector-icons/Ionicons'
import * as theme from '../constants/theme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-community/async-storage'

const {width,height} = Dimensions.get('window')
const UserProfileScreen = ({navigation}) => {

    const [user,setUser] = useState({id:'',name:'',phone:'',email:'',img:''})

  
    useEffect(() => {
    getData().then(data=>{
       
        let user ={id:'',name:'',phone:'',email:'',img:''}
        database().ref("/users/" + data.id).on('value', value => {

            user.id = value.child("userid").toJSON()
            user.name= value.child("username").toJSON()
            user.email = value.child("email").toJSON()
            user.phone = value.child("phone").toJSON()
            user.img = value.child("avatar").toJSON()
         
            setUser(user)
        })
    })
    }, [])

    const signOut = async()=>{
        try{
            await auth().signOut()
            storeData('')
        }catch(e){
            console.log(e)
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('UserId')
            console.log(jsonValue)
            return jsonValue != null ? JSON.parse(jsonValue) : null;

        } catch (e) {
            // error reading value
        }
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            
          await AsyncStorage.setItem('UserId', jsonValue)
          
        } catch (e) {
          console.log(e)
        }
      }
 
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../image/banneraccount.png')} style={styles.image}>
            <View style={styles.userContainer}>
            <Image source={{uri:user.img}} style={styles.userImage}/>
            <View style={styles.userContant}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.phone}>{user.phone}</Text>
            </View>
        </View>
        </ImageBackground>

        <View style={styles.body}>

        <TouchableOpacity onPress={()=>navigation.navigate("EditProfileScreen",{name:"Sửa thông tin tài khoản"})}>
        <View style={styles.card}>
            <Icon name="person-circle-outline" size={30} color={theme.colors.blue}/>
            <Text style={{marginLeft: 16}}>THAY ĐỔI THÔNG TIN</Text>
        </View>
        </TouchableOpacity>

        <View style={styles.card}>
            <Icon name="megaphone-outline" size={30} color={theme.colors.blue}/>
            <Text style={{marginLeft: 16}}>THÔNG BÁO</Text>
        </View> 

        <TouchableOpacity onPress={()=>signOut()}>
        <View style={styles.card}>
            
            <Icon name="exit-outline" size={30} color={theme.colors.blue}/>
            <Text style={{marginLeft: 16}}>ĐĂNG XUẤT</Text>
            
        </View>
        </TouchableOpacity>
        </View>
        
           
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        
    },
    image: {
        flex:0.2,
        width: width
    },
    userContainer:{
        flexDirection:'row',
        padding: 24,
    },
    userContant: {
        marginLeft: 40,
        justifyContent: 'space-evenly'
    },
    userImage: {
        width:75,
        height: 75,
        borderRadius: 37.5
    },
    name: {
        fontWeight:'bold',
        fontSize: 20
    },
    email: {
        fontSize: 16,
        paddingVertical:4
    },
    phone: {
        fontSize: 16,
        paddingVertical:4
    },
    card:{
        flexDirection:'row',
        padding:8,
        
        borderRadius: 10,
        alignItems:'center',
        borderWidth: 0.4,
        borderRadius: 10,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.1 },
        shadowOpacity: 2,
        shadowRadius: 2,
        elevation: 2.5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    body:{
        flex: 0.3,
        padding: 16,
        justifyContent:'space-between'
    }
})

export default UserProfileScreen
