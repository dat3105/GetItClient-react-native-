import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')

const CarouselItem = ({item}) => {
    return (
        <View style={styles.cardView}>
            <Image style={styles.image} source={item.img} />
        </View>
    )

}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
       
        
        margin: 10,
        borderRadius: 15,
        
        
    },
    image: {
        width: width - 52,
        height: height / 3,
        borderRadius: 10,
        resizeMode: 'contain'
    },
})

export default CarouselItem
