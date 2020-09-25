import React from 'react'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MessageScreen from '../screens/MessageScreen';
import BillScreen from '../screens/BillScreen';
import UserProfileScreen from '../screens/UserProfileScreen'
import Icon from 'react-native-vector-icons/Ionicons'
import * as theme from '../constants/theme'
import ProductsScreen from '../screens/ProductsScreen'
import { Button, TouchableOpacity } from 'react-native'
import CardScreen from '../screens/CardScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import { NavigationContainer } from '@react-navigation/native';
import EditProfileScreen from '../screens/EditProfileScreen';
import ConfirmbillScreen from '../screens/ConfirmbillScreen'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

export const MainStackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen}
                    options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={MyTabs} />
                <Stack.Screen name="ListLaptop" component={ProductsScreen}
                    options={headerStyle}
                />
                <Stack.Screen name="CartScreen" component={CardScreen}
                    options={headerStyle} />
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}
                    options={headerStyle} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />

                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}
                options={headerStyle}/>
                <Stack.Screen name="ConfirmbillScreen" component={ConfirmbillScreen}
                options={headerStyle}/>
            </Stack.Navigator>
        </NavigationContainer>
    )



}

const StackMessage = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="StackMessage" component={MessageScreen} options={
                {
                    headerShown: true,
                    headerTintColor: theme.colors.blue,
                    title: 'TIN NHẮN',
                    headerTitleAlign: 'center',
                    headerLeft: null
                }
            } />
        </Stack.Navigator>
    )
}

const StackBill = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="StackBill" component={BillScreen} options={
                {
                    headerShown: true,
                    headerTintColor: theme.colors.blue,
                    title: 'DANH SÁCH ĐƠN HÀNG',
                    headerTitleAlign: 'center',
                    headerLeft: null
                }
            } />
        </Stack.Navigator>
    )
}

const MyTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            tabBarOptions={{
                activeTintColor: theme.colors.blue,
            }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    tabBarLabel: 'Trang chủ',

                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home-outline" color={color} size={25} />
                    )
                }} />
            <Tab.Screen name="Message" component={StackMessage}
                options={{
                    tabBarLabel: 'Tin nhắn',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="mail-outline" color={color} size={25} activeTintColor={theme.colors.blue} />
                    ),

                }} />
            <Tab.Screen name="Bill" component={StackBill}
                options={{
                    tabBarLabel: 'Hoá đơn',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="reader-outline" color={color} size={25} />
                    )
                }} />
            <Tab.Screen name="User" component={UserProfileScreen}
                options={{
                    tabBarLabel: 'Cá nhân   ',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="person-circle-outline" color={color} size={25} />
                    )
                }} />
        </Tab.Navigator>
    );
}

export const headerStyle = ({ navigation, route }) => (
    {
        headerShown: true,
        headerTintColor: theme.colors.blue,
        headerTitle: route.params.name,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            textTransform: 'uppercase',
            fontWeight: '600'
        },
        headerRight: () => (
            route.params.cart ?

                <TouchableOpacity style={{ paddingRight: 20 }} onPress={() => navigation.navigate('CartScreen', { name: 'Giỏ hàng' })} >
                    <Icon name='cart-outline' size={30} color={theme.colors.blue} />
                </TouchableOpacity>

                :
                null


        )
    }

)
