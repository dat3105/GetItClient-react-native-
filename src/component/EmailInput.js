import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import * as theme from '../constants/theme'

const EmailInput = ({ term, placeHolder, onTermChange, onValidateEmailAddress, error }) => {
    return (
        <View>
            <Text style={styles.ErrorText}> {error}</Text>
            <View style={styles.TextFieldView}>
                <TextInput
                    autoCorrect={false}
                    style={styles.TextField}
                    placeholder={placeHolder}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidateEmailAddress}

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
      
    },
    TextField: {
        fontSize: 18,
        padding: 12
    },
    ErrorText: {
        fontSize: 12,
        color: 'red',
        
        
    }
})
export default EmailInput
