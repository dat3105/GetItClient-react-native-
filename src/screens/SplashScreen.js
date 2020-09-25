import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ImageBackground, Dimensions, Text, StatusBar, SafeAreaView } from 'react-native'
import * as theme from '../constants/theme'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        const time = setTimeout(function () {
            auth().onAuthStateChanged((user) => {
                if (user != null) {
                    let data = { id: '' }
                    data.id = user.uid
                    storeData(data)

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }]
                    })
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LoginScreen' }]
                    })
                }
            })
        }, 3000)


        return () => {
            clearTimeout(time)
          }

    }, [])

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('UserId', jsonValue)

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground} >
                <StatusBar barStyle="light-content" backgroundColor="#2F84FF" />
                <View style={styles.containt}>
                    <Image style={styles.logo} source={require('../image/icon.png')} />
                    <Text style={styles.title}>GET IT</Text>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        width: width,
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: theme.sizes.h1,
        color: theme.colors.blue
    },
    container: {
        flex: 1,
    },
    containt: {
        flex: 0.6,
        alignItems: 'center',
    }
})

export default SplashScreen
