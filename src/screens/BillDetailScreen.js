import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import PayCard from '../component/PayCard'
import Button from '../component/Button'
import * as theme from '../constants/theme'

const BillDetailScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                <View style={styles.header}>
                    <Text style={{fontWeight:'bold'}}>MÃ HOÁ ĐƠN: </Text>
                    <Text> DvdfvdfbddfbHFGBFL</Text>
                </View>
                <PayCard />
                <PayCard />
                <View style={styles.userComponent}>
                    <Text style={styles.headTitle}>Thông tin khách hàng</Text>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>Họ và tên: </Text>
                        <Text>Đinh Công Hiến</Text>
                    </View>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>Email: </Text>
                        <Text>a@gmail.com</Text>
                    </View>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>SĐT:  </Text>
                        <Text>123456789 </Text>
                    </View>
                </View>
                <View style={styles.userComponent}>
                    <Text style={styles.headTitle}>Trạng thái thanh toán và thời gian đặt hàng</Text>
                    <View style={styles.userContaint}>

                        <Text style={styles.title}>Thời gian đặt hàng: </Text>
                        <Text>03/06/2020 09:30</Text>
                    </View>
                    <View style={styles.userContaint}>
                        <Text style={styles.title}>Trạng thái:  </Text>
                        <Text>Đang chờ xác nhận </Text>
                    </View>

                </View>

                <View style={styles.payContainer}>
                    <Text style={styles.headTitle}>Tổng thanh toán:</Text>
                    <Text style={{fontWeight:'bold'}}>7.300.000 đ</Text>
                </View>

                <View style={styles.button}>
                    <Button title="Xác Nhận" style={styles.confirmButton} color={{backgroundColor:
                        "#01A65C", paddingHorizontal: 35}}/>
                    <Button title="Huỷ Đơn Hàng" color={{backgroundColor:'red',paddingHorizontal: 12}} style={styles.cancelButton}/>
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
    
})

export default BillDetailScreen
