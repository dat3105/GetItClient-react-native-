import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons'
import * as theme from '../constants/theme'

const CartCard = (props) => {

    function thousands_separators(num)
    {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    }
    
    return (
        <View style={styles.container}>
            
            <Image source={require('../image/avatarlaptop.png')} style={styles.image}/>
         
            <View style={styles.description}>
                <Text style={styles.title}>{props.product.name}</Text>
                <Text>{props.product.brand}</Text>
                    <Text style={styles.price}>{thousands_separators(props.product.price)}đ</Text>
                    <View style={styles.changeNumber}>
                        
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=>props.addValue(props.product)}>
                            <Icon name="add-outline" color='#ffffff'  size={20}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{marginHorizontal:18}}>
                            {props.product.amount}
                        </Text>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=>props.minusValue(props.product)}>
                        <Icon name="remove-outline" color='#ffffff'  size={20}/>
                        </TouchableOpacity>
                        </View>
                    </View>
            </View>
            <View>
                <TouchableOpacity onPress={()=>props.removeValue(props.product)}>
                <Icon name="close-circle-outline" color="red" size={40}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
       flexDirection:'row',
       backgroundColor: theme.colors.white,
        justifyContent:'space-between',
        padding: 8,
        borderRadius:10,
        marginBottom: 10
    },
    image: {
        width:120,
        height: 120
    },
    button: {
        backgroundColor: theme.colors.blue,
        width: 20, 
        height:20,
        alignItems:'center',
        justifyContent:'center'
    },
    changeNumber: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop: 6
    },
    description: {
        flexDirection:'column',
        justifyContent:'space-evenly'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    price: {
        color:'red',
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default CartCard
