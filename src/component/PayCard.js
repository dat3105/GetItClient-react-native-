import React from 'react'
import { View, Text, StyleSheet,Image } from 'react-native'

const PayCard = (props) => {
    function thousands_separators(num) {
        var num_parts = num.toString().split('.');
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return num_parts.join('.');
      }

    return (
        <View style={styles.container}>
        <Image source={{uri:props.product.img}} style={styles.image}/>
        <View style={styles.contant}>
    <Text style={styles.name}>{props.product.name}</Text>
    <Text style={styles.brand}>{props.product.brand}</Text>
    <Text style={styles.price}>{thousands_separators(props.product.price)}đ</Text>
    <Text>Số lượng: {props.product.amount}</Text>
        </View>
      
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row',
        padding: 24,
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
    image: {
        width:100,
        height: 100,
        
    },
    contant: {
        marginLeft: 40,
        justifyContent: 'space-evenly'
    },
    name: {
        fontWeight:'bold',
        fontSize: 20
    },
    brand: {
        fontSize: 16,
        paddingVertical:4
    },
    price: {
        fontSize: 16,
        paddingVertical:4,
        color: 'red',
    }
})

export default PayCard
