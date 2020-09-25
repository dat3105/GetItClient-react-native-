import React,{useState,useEffect} from 'react'
import { Dimensions,View, Text, SafeAreaView, StyleSheet, ImageBackground, Alert  } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import PayCard from '../component/PayCard'
import UserCard from '../component/UserCard'
import Button from '../component/Button'
import AsyncStorage from '@react-native-community/async-storage'
import database from '@react-native-firebase/database'
import * as theme from '../constants/theme'
import moment from 'moment'

const {width,height}=Dimensions.get('window')
const ConfirmbillScreen = ({navigation,route}) => {
    const [user,setUser] = useState('')
    const [listProduct,setListProduct] = useState([])
    const [address,setAddress] = useState('')

    useEffect(()=>{
        setListProduct(route.params.listProduct)
        getData().then(item=>{
            database().ref('/users/'+item.id).once('value',value=>{
                let user ={id:'',name:'',phone:'',email:'',img:''}
                user.id = value.child("userid").toJSON()
                user.name= value.child("username").toJSON()
                user.email = value.child("email").toJSON()
                user.phone = value.child("phone").toJSON()
                user.img = value.child("avatar").toJSON()
                setUser(user)
            })
           
        })

       
    },[])

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserId');
    
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };

      const getMoney = () => {
        let money = 0;
        listProduct.map((item) => {
          money = money + item.price * item.amount;
      
        });
    
        return money;
      };

      function thousands_separators(num) {
        var num_parts = num.toString().split('.');
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return num_parts.join('.');
      }

      const changeAddress =(text)=>{
          setAddress(text)
      }

      const payValue =()=>{
          if(address!==''){
            let bill ={}
            bill.idUser=user.id
            bill.listLapOrder = listProduct
            bill.date =moment()
            .format(' DD/MM/YYYY hh:mm ');
            bill.status = 'đang chờ'
            bill.sumPrice = getMoney()
            bill.address = address
            bill.idBill =''
            
           const key = database().ref('/bill/').push().key
           bill.idBill =key
              database().ref('/bill').child(key).set(bill)
  
              database().ref('/cart').child(user.id).remove()
            
              navigation.navigate('Home')
              Alert.alert('Thành công')
          }else{
              Alert.alert("bạn chưa nhập địa chỉ giao hàng")
          }
          
      }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.title}>THÔNG TIN KHÁCH HÀNG</Text>
                    <View>
                        <UserCard user={user}/>
                    </View>

                    <Text style={styles.title}>THÔNG TIN SẢN PHẨM</Text>
                    <View>
                        {
                            listProduct.map(item=>(
                                <PayCard product={item}/>
                            ))
                        }
                    </View>
                   
                    <View style={styles.containerPayment}>
                        <Text style={styles.titlePayment}>Tổng thanh toán:</Text>
                        <Text style={styles.textPayment}>{thousands_separators(getMoney())} đ</Text>
                    </View>
                   
                    
                    <Text style={styles.title}>NHẬP ĐỊA CHỈ GIAO HÀNG</Text>
                    <View style={styles.containerInput}>
                        <TextInput style={styles.textInput} placeholder={"Nhập địa chỉ"} onChangeText={(text)=>changeAddress(text)}/>
                    </View>

                    <Button title="THANH TOÁN" style={styles.button} color={theme.colors.blue} onPress={payValue}/>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    imageBackground: {
        flex:1,
        width: width,
        padding: 16
    },
    textInput: {
        backgroundColor:'white',
        height:100,
        borderRadius: 10
    },
    containerInput: {
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
        marginVertical: 18
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingVertical: 12
    },
    containerPayment: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginVertical:8
    },
    titlePayment: {
        fontSize: 18
    },
    textPayment:{
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
       
    }
})

export default ConfirmbillScreen
