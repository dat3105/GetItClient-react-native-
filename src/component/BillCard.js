import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import * as theme from '../constants/theme'

const BillCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="receipt-outline" size={20} color="#ffffff"/>
                <Text style={styles.title}>Mã hoá đơn: cwndjskcnSXmascadcsd</Text>
                
            </View>
            <View style={styles.body}>
                <View style={styles.bodyText}>
                    <Text>Thời gian đặt hàng:</Text>
                    <Text style={{paddingVertical:12}}>Tổng thanh toán:</Text>
                    <Text>Trạng thái:</Text>
                </View>
                <View style={styles.bodyText}>
                    <Text style={{fontWeight:'bold'}}>03/06/2020 09:30</Text>
                    <Text style={{paddingVertical:12,color:'red'}}>12.000.000 đ</Text>
                    <Text style={{color:'green'}}>Đang chờ xác nhận</Text>
                </View>

                <Image source={require('../image/icon.png')} style={styles.image}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: 10
    },
    header: {
        flexDirection:'row',
        padding: 12,
        backgroundColor: theme.colors.blue,
        borderRadius: 5
    },
    title:{
        color: theme.colors.white,
        marginLeft: 24
    },
    body:{
        
       flexDirection:'row',
       justifyContent:'space-evenly',
       padding: 12
        
    },
    image: {
        width:50,
        height: 50,
        alignSelf:'center'
    },
  
})

export default BillCard
