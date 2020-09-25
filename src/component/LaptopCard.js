import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import * as theme from '../constants/theme'

const LaptopCard = ({img,name,ratting,brand,price}) => {
    var myloop =[]
    for(let i=0; i< ratting;i++){
        myloop.push(
            <Image source={require('../image/iconstar.png')} style={{width: 10,height:10,marginHorizontal:4}} 
                key={i.toString()}
            />
        )
    }
    return (
        <View style={styles.container}>
            <Image source={{uri:img}} style={styles.img} />
           
            <Text style={styles.name}>{name}</Text>
            <View style={styles.rating}>
                {myloop}
            </View>
            <Text style={styles.brand}>{brand}</Text>
            <Text style={styles.price}>{price} đ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:16,
        backgroundColor: theme.colors.white,
        margin: 8,
        width: 175,
        borderRadius:10,
        marginTop: 16,
        alignItems:'center'
    },
    img: {
       width: 120,
       height: 120,
       alignSelf: 'center',
       resizeMode: 'contain'
    },
    rating: {
        flexDirection:'row',
        marginVertical: 4
    },
    name:{
        fontWeight:'bold',
        fontSize: 16
    },
    price: {
        marginTop: 4,
        color:'red'
    }
})

export default LaptopCard
