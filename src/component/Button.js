import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import * as theme from '../constants/theme'

const Button = (props) => {
    const { color = '',title = '', style = {}, textStyle = {}, onPress, isLoading } = props

    const loader = () =>{
        return(
            <ActivityIndicator  color={theme.colors.blue} size="large" />
        )
    }

    const button = () =>{
        return(
            <TouchableOpacity 
            onPress={onPress}
            style={[styles.button,{backgroundColor:color}]} >
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
           {isLoading? loader(): button()}
           
          
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
       
      
    },
    button:{
        height:45,
        
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 10
    },
    text:{
        color: theme.colors.white,
        fontSize: theme.sizes.h2
    }
})

export default Button
