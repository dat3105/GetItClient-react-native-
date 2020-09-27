import React,{useState,useEffect} from 'react'
import { View, Text, SafeAreaView, ImageBackground ,StyleSheet, ScrollView,Dimensions } from 'react-native'
import BillCard from '../component/BillCard'
import database from '@react-native-firebase/database'
import  AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'

const {width,height} = Dimensions.get('window')
const BillScreen = ({navigation}) => {
    const [listBill,setListBill] = useState([])

    useEffect(()=>{
        getData().then((data) => {
            let array=[]
            database().ref('/bill').orderByChild('idUser').equalTo(data.id).once("value",value=>{
                value.forEach(item=>{
                    let data ={key:'',date:'',price:'',status:'',id:''}
                    data.key = item.key
                    data.date = item.child('date').toJSON()
                    data.id = item.child('idBill').toJSON()
                    data.status = item.child('status').toJSON() === 'đang chờ'?'Đang chờ xác nhận': "Đã xác nhận"
                    data.price = item.child('sumPrice').toJSON()
                    array.push(data)
                  
                   
                  
                })
                
                setListBill(array)
            })
        })
        
    },[])

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('UserId');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };

     

    return (
        <SafeAreaView style={styles.container}>
           <ImageBackground source={require('../image/splashscreen.png')} style={styles.imageBackground}>
               <ScrollView >
               
                       {
                         listBill.map((item)=>(
                             <TouchableOpacity onPress={()=>navigation.navigate("BillDetailScreen",{name:"Chi tiết hoá đơn",idBill:item.id})}>
                            <BillCard item={item} />
                            </TouchableOpacity>
                         ))
                       }

                   
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
