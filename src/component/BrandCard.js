import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import * as theme from '../constants/theme'

const BrandCard = ({name,img}) => {
    return (
        <View style={styles.container}>
            <Image source={{uri: img}} style={styles.image}/>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        width:110,
        height: 100,
        borderRadius: 10,
        justifyContent:'center',
        alignItems: 'center',
        marginHorizontal:8,
        marginBottom: 18
    },
    image: {
        width: 40,
        height: 40
    },
    text: {
        fontSize: 12,
        marginTop: 8
    }
})

export default BrandCard
