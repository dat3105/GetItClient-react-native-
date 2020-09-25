import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import * as theme from '../constants/theme'

const Input = ({ keyboardType,term, placeholder, onTermChange, onValidateValueField, error }) => {   
    return (
        <View>
        <Text style={styles.ErrorText}>{error}</Text>
        <View style={styles.TextFieldView}>
            <TextInput
                autoCorrect={false}
                style={styles.TextField}
                placeholder={placeholder}
                value={term}
                keyboardType={keyboardType}
                onChangeText={onTermChange}
                onEndEditing={onValidateValueField}
            />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    TextFieldView: {
        borderColor: theme.colors.blue,
        borderWidth: 0.8,
        borderRadius: 10,
        backgroundColor:'white',
        marginBottom:10
    },
    TextField: {
        fontSize: 18,
        padding: 12
    },
    ErrorText: {
        fontSize: 12,
        color: 'red',
        
        marginHorizontal: 20,
    
    }
})

export default Input
