import React,{useState,useEffect} from 'react'
import { View, Text, SafeAreaView, StyleSheet, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PayCard from '../component/PayCard'
import Button from '../component/Button'
import * as theme from '../constants/theme'
import database from '@react-native-firebase/database'
import AsyncStorage from '@react-native-community/async-storage'

const BillDetailScreen = ({navigation,route}) => {
    const [bill,setBill]= useState({idBill:'',date:'',address:'',status:'',sumPrice:'',listLaptop:[]})
    const [user,setUser] = useState('')

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('UserId')
            console.log(jsonValue)
            return jsonValue != null ? JSON.parse(jsonValue) : null;

        } catch (e) {
            // error reading value
        }
    }

    useEffect(()=>{
        getData().then(data=>{
            let user ={id:'',name:'',phone:'',email:'',img:''}
        database().ref("/users/" + data.id).on('value', value => {

            user.id = value.child("userid").toJSON()
            user.name= value.child("username").toJSON()
            user.email = value.child("email").toJSON()
            user.phone = value.child("phone").toJSON()
            user.img = value.child("avatar").toJSON()
            console.log(user)
            setUser(user)
        })
        })
        database().ref("/bill").orderByChild('idBill').equalTo(route.params.idBill).once('value',value=>{
            value.forEach(item=>{
                let bill={idBill:'',date:'',address:'',status:'',sumPrice:'',listLaptop:[]}
                bill.idBill =item.child('idBill').toJSON()
                bill.status = item.child('status').toJSON() === "đang chờ"? "Đang chờ xác nhận": "Đã xác nhận"
                bill.date = item.child('date').toJSON()
                bill.sumPrice = item.child('sumPrice').toJSON()
                bill.listLaptop = item.child('listLapOrder').toJSON()
                console.log(bill.listLaptop)
                setBill(bill)
            })
        })

        
    },[])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={{fontWeight:'bold'}}>MÃ HOÁ ĐƠN: </Text>
    <Text> {bill.idBill}</Text>
                </View>
                {bill.listLaptop.map(item=>(
                    <PayCard product={item}/>
                ))}
                <View style={styles.userComponent}>
                    <Text style={styles.headTitle}>Thông tin khách hàng</Text>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>Họ và tên: </Text>
                        <Text>{user.name}</Text>
                    </View>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>Email: </Text>
                        <Text>{user.email}</Text>
                    </View>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>SĐT:  </Text>
                        <Text>{user.phone} </Text>
                    </View>
                </View>
                <View style={styles.userComponent}>
                    <Text style={styles.headTitle}>Trạng thái thanh toán và thời gian đặt hàng</Text>
                    
                    <View style={styles.userContaint}>

                        <Text style={styles.title}>Thời gian đặt hàng: </Text>
                        <Text>{bill.date}</Text>
                    </View>

                    <View style={styles.userContaint}>
                        <Text style={styles.title}>Trạng thái:  </Text>
                        <Text>{bill.status} </Text>
                    </View>

                </View>

                <View style={styles.payContainer}>
                    <Text style={styles.headTitle}>Tổng thanh toán:</Text>
            <Text style={{fontWeight:'bold'}}>{bill.sumPrice}đ</Text>
                </View>

                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    header: {
       
        borderBottomWidth: 1,
        flexDirection:'row',
        alignSelf: 'center',
        paddingBottom: 12
    },
    userContaint: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4
    },
    userComponent: {
        borderBottomWidth: 1,
        paddingVertical: 8
    },
    title: {
        fontWeight: 'bold'
    },
    headTitle: {
        color: 'red',
        fontWeight: 'bold',
        marginVertical: 4
    },
    payContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical: 8
    },
    button: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    confirmButton: {
        height:75
    }
    
})

export default BillDetailScreen
