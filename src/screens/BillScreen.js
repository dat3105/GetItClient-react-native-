import React from 'react'
import { View, Text, SafeAreaView, ImageBackground ,StyleSheet, ScrollView,Dimensions } from 'react-native'
import BillCard from '../component/BillCard'

 
const {width,height} = Dimensions.get('window')
const BillScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
           <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground}>
               <ScrollView>
                   <BillCard/>
                   <BillCard/>
                   <BillCard/>
               </ScrollView>
           </ImageBackground>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container: {
        flex:1
    },
    imageBackground: {
        flex:1,
        width: width,
        padding: 16
    },
})

export default BillScreen
