import React,{useState  } from 'react'
import { StatusBar,View, TouchableOpacity,Text, SafeAreaView, StyleSheet, ImageBackground,Image , Dimensions, KeyboardAvoidingView, Alert } from 'react-native'
import {  Button } from '../component'
import Input from '../component/Input'
import * as theme from '../constants/theme'
const {width} = Dimensions.get('window')
import EmailInput from '../component/EmailInput'
import PasswordInput from '../component/PasswordInput'
import Utility from '../utils/Utility'
import AsyncStorage from '@react-native-community/async-storage'; 
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

const RegisterScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] =useState('')
    const [nameError, setNameError] = useState('')
    const [isLoading, setIsLoading] = useState('')

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

    const validatePhoneField = () => {
        const isValidPhone = Utility.isPhoneValid(phone)
        isValidPhone ?  setPhoneError('') : setPhoneError("Số điện thoại không đúng")
        return isValidPhone
    }

    const validateNameField = () => {
        const isValidName = Utility.isValidField(name)
        isValidName ? setNameError('') : setNameError("Tên không được để trống")
        return isValidName
    }

    const performAuth = () =>{
        const isValidEmail = validateEmailAddress()
        const isValidPassword = validatePasswordField()
        const isValidPhone = validatePhoneField()
        const isValidName = validateNameField()

        if(isValidEmail && isValidPassword && isValidPhone && isValidName){
            setEmailError('')
            setPasswordError('')
            setPhoneError('')
            setNameError('')

            registerUser(email,password,name,phone)
        }
    }

      const   registerUser = (email,password,name,phone)=>{
            try{
                setIsLoading(true)
                 auth().createUserWithEmailAndPassword(email,password)
                 .then(user =>{ 
                    console.log(user)
                   database().ref('/users/'+user.user.uid).set({
                    
                      userid:user.user.uid,
                      username: name,
                      email:email,
                      password: password,
                      phone: phone,
                      avatar: 'https://firebasestorage.googleapis.com/v0/b/getitapp-8112c.appspot.com/o/users%2Fuser_icon.png?alt=media&token=83795c18-fd4b-43c4-97b6-0854fdf1f5a6'
                  })
                  let data = { id: '' }
                  data.id = user.user.uid
                  storeData(data)
                  setIsLoading(false)
                 })
                

            }catch(error){
                setIsLoading(false)
                Alert.alert(error.message)
            }
        }

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
            <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground}>
                <StatusBar barStyle="light-content" backgroundColor="#2F84FF" />
                <View style={styles.header} >
                    <Image source={require('../image/icon.png')} style={styles.image} />
                    <Text style={styles.text}>GET IT</Text>
                </View>

            <View style={styles.body}>
                <Text style={styles.title}>Đăng kí</Text>
                <KeyboardAvoidingView  behavior='padding'>
                
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
                  onValidatePasswordField={validatePasswordField}
              />
                
                
                <Input 
                    term={name}
                    error={nameError}
                    onTermChange={newName => {setName(newName)}}
                    onValidateValueField={validateNameField}
                    placeholder={'Tên của bạn '} 
                    style={{marginTop:20}}/>

                <Input 
                term={phone}
                error={phoneError}
                onTermChange={newPhone => {setPhone(newPhone)}}
                keyboardType={'number-pad'}
                placeholder={'Số điện thoại '} 
                style={{marginTop: 10,marginBottom: -60}}
                onValidateValueField = {validatePhoneField}/>
                
                
               

               
                </KeyboardAvoidingView>
                <Button title={'ĐĂNG KÍ'} color={theme.colors.blue} onPress={performAuth} isLoading={isLoading}/>
                <View style={styles.footer}>
                 <Text style={styles.description}>Đã có tài khoản ? - </Text>
                 <TouchableOpacity onPress={()=>navigation.navigate('LoginScreen')}>
                 <Text style={styles.title}>Quay lại đăng nhập</Text>
                 </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageBackground: {
        width: width,
        padding: theme.sizes.padding,
        flex:1,
        resizeMode: 'cover',
    },
    header: {
        flex:0.15,
        alignItems:'center'
    },
    image: {
        width: 75,
        height: 75,     
        resizeMode: 'cover' 
    },
    text:{
        color: theme.colors.blue
    },
    title: {
        color: theme.colors.blue,
        fontSize: theme.sizes.h2
    },
    footer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent:'center'
    },
    description: {
        fontSize: theme.sizes.h2
    },
    body: {
        flex: 0.8,
       
    }
})

export default RegisterScreen
