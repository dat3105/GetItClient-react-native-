import React from 'react'
import { Dimensions,View, Text, SafeAreaView, StyleSheet, ImageBackground } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CardMessage from '../component/CardMessage'

const {width,height} = Dimensions.get('window')
const MessageScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground}>
            <ScrollView >
               <CardMessage />
               <CardMessage/>
               <CardMessage/>
               <CardMessage/>
               <CardMessage/>
               </ScrollView>
            </ImageBackground>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    imageBackground: {
        flex:1,
        width: width,
        padding: 16
    },
    messContainer:{
        
        
    }
})
export default MessageScreen
