import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const UserCard = (props) => {
    return (
        <View style={styles.container}>
            <Image source={{uri:props.user.img}} style={styles.image}/>
            <View style={styles.contant}>
    <Text style={styles.name}>{props.user.name}</Text>
    <Text style={styles.email}>{props.user.email}</Text>
    <Text style={styles.phone}>{props.user.phone}</Text>
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
        width:75,
        height: 75,
        borderRadius: 37.5
    },
    contant: {
        marginLeft: 40,
        justifyContent: 'space-evenly'
    },
    name: {
        fontWeight:'bold',
        fontSize: 20
    },
    email: {
        fontSize: 16,
        paddingVertical:4
    },
    phone: {
        fontSize: 16,
        paddingVertical:4
    }
})

export default UserCard
