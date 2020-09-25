import React,{useState,useEffect} from 'react'
import { Alert,KeyboardAvoidingView,View, Text, SafeAreaView,TouchableOpacity ,StyleSheet, Image, ImageBackground,StatusBar, Dimensions } from 'react-native'
import { Input, Button } from '../component'
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import Utility from '../utils/Utility'
import * as theme from '../constants/theme'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-community/async-storage'; 

const {width} = Dimensions.get('window')
const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('UserId', jsonValue)

        } catch (e) {
            console.log(e)
        }
    }

    const validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email)
        isValidEmail ? setEmailError('') : setEmailError("Email không đúng định dạng")
        return isValidEmail
    }

    const validatePasswordField = () => {
        const isValidField = Utility.isValidField(password)
        isValidField ? setPasswordError('') : setPasswordError("Password không được để trống")
        return isValidField
    }

    
    const performAuth = () =>{
        const isValidEmail = validateEmailAddress()
        const isValidPassword = validatePasswordField()

        if(isValidEmail && isValidPassword){
            setEmailError('')
            setPasswordError('')
            registration(email,password)
        }

       
    }
 

    const registration = (email, password) => {
      
        try{
            setIsLoading(true)
            auth().signInWithEmailAndPassword(email, password)
            .then(user =>{ 
                
                let data = { id: '' }
                data.id = user.user.uid
                console.log(user)
                storeData(data)
                
                setIsLoading(false)
                navigation.reset({
                    index: 0,
                    routes:[{name: 'Home'}]
                })
            })
        }
        catch(error){
            setIsLoading(false)
            Alert.alert(error.message)
           
        }
    }

    return (
       
        <View style={styles.container}>
        <SafeAreaView >
            <StatusBar barStyle="light-content" backgroundColor="#2F84FF" />
            
            <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground}>
            <View style={styles.header} >
                <Image source={require('../image/icon.png')} style={styles.image} />
                <Text style={styles.title}>GET IT</Text>
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Đăng nhập</Text>
                <KeyboardAvoidingView behavior={'padding'}   style={styles.input}>
                <EmailInput
                   
                    term={email}
                    error={emailError}
                    placeHolder={'Email '}
                    onTermChange={newEmail => { setEmail(newEmail) }}
                    onValidateEmailAddress={validateEmailAddress}
                />
                 <PasswordInput
                   
                   term={password}
                   error={passwordError}
                   placeHolder={'Password '}
                   onTermChange={newPass => { setPassword(newPass) }}
                   onValidateEmailAddress={validatePasswordField}
               />
                </KeyboardAvoidingView>
                
                <Button title={'ĐĂNG NHẬP'} color={theme.colors.blue} style={{marginTop:40}} onPress={performAuth} isLoading={isLoading}/>
                <View style={styles.footer}>
                 <Text style={styles.description}>Chưa có tài khoản ? - </Text>
                 <TouchableOpacity onPress={()=>navigation.navigate('RegisterScreen')}><Text style={styles.title}>Đăng kí tại đây</Text></TouchableOpacity>
                </View>
                
            </View>
            </ImageBackground>
           
        </SafeAreaView>
        </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image: {
        width: 200,
        height: 200,     
        resizeMode: 'cover' 
    },
    title: {
        color: theme.colors.blue,
        fontSize: theme.sizes.h2,
        marginBottom: 12
    },
    header: {
        flex:0.45,
        alignItems:'center'
    },
    body: {
        flex: 0.7,
        
    },
   
    imageBackground: {
        width: width,
        padding: theme.sizes.padding,
        flex:1,
        resizeMode: 'cover',
    },
    footer: {
        flexDirection: 'row',
        justifyContent:'center',
        marginTop:20
    },
    description: {
        fontSize: theme.sizes.h2
    }, 
    input: {
        marginBottom: 20
    }
    
})

export default LoginScreen
