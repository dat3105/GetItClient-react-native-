import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const CardMessage = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../image/tran.jpg')}/>
            <View>
                <Text style={{fontWeight:'bold',fontSize: 18}}>Trần Đỗ Minh Ân</Text>
                <Text style={{color:'gray'}}>Xin chào</Text>
            </View>
            <View>
                <Text>13:37 03-03-2020</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        marginVertical: 12,
        justifyContent:'space-evenly',
        borderWidth: 1,
        borderRadius: 10,
        padding: 18

    },
    image: {
        width: 40,
        height: 40,
        borderRadius:20
    }
})
export default CardMessage
