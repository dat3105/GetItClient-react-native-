import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from 'react-native';
import CartCard from '../component/CartCard';
import Button from '../component/Button';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import * as theme from '../constants/theme';

const {width, height} = Dimensions.get('window');
const CardScreen = ({navigation}) => {
  const [listItem, setListItem] = useState([]);
    const [idUser, setIdUser] = useState('')

  useEffect(() => {
    let arrayItem = [];
    getData().then((value) => {
        setIdUser(value.id)
      database()
        .ref('/cart/' + value.id)
        .child('listOrder')
        .once('value', (data) => {
          data.forEach((onceItem) => {
            let item = {
              key: '',
              id: '',
              brand: '',
              img: '',
              name: '',
              price: '',
              amount: 1,
            };
            item.key = onceItem.key;
            item.id = onceItem.child('id').toJSON();
            item.brand = onceItem.child('brand').toJSON();
            item.img = onceItem.child('img').toJSON();
            item.name = onceItem.child('name').toJSON();
            item.price = onceItem.child('price').toJSON();

            arrayItem.push(item);
          });
          setListItem(arrayItem);
        });
    });
  }, []);

  function thousands_separators(num) {
    var num_parts = num.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return num_parts.join('.');
  }

  const getMoney = () => {
    let money = 0;
    listItem.map((item) => {
      money = money + item.price * item.amount;
  
    });

    return money;
  };

  function addAmount(value) {
    
    
    let array = [...listItem];
    const itemIdx = listItem.findIndex(item => item.id===value.id)
  
    if(itemIdx !== -1) {
        array.splice(itemIdx, 1, {...value, amount: value.amount + 1})
        setListItem(array)
    }
  }

  function minusAmount(value){
       
      if(value.amount>1){
        let array = [...listItem];
        const itemIdx = listItem.findIndex(item => item.id===value.id)
      
        if(itemIdx !== -1) {

            array.splice(itemIdx, 1, {...value, amount: value.amount -1 })
            setListItem(array)
        }
      }
  }

  function remoteValue(value){
    console.log(idUser)
    let array = [...listItem];
    const itemIdx = listItem.findIndex(item => item.id===value.id)
  
    if(itemIdx !== -1) {
        database().ref('/cart/'+idUser).child('listOrder').child(value.key).remove()
        array.splice(itemIdx, 1)
        setListItem(array)
    }
  }



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
      <ImageBackground
        source={require('../image/menuscreen.png')}
        style={styles.imageBackground}>
        <ScrollView>
          <Text style={styles.title}>DANH SÁCH SẢN PHẨM</Text>
          <View>
            {
              
              listItem.map((item) => (
                <View>
                  <CartCard
                    product={item}
                    addValue={addAmount}
                    minusValue={minusAmount}
                    removeValue={remoteValue}
                  />
                </View>
              ))
            }
          </View>

          <View style={styles.footer}>
            <Text style={styles.titlePrice}>Tổng tiền: </Text>
            <Text style={styles.price}>
              
              {thousands_separators(getMoney())}đ
            </Text>
          </View>

          <Button title="Thanh toán" color={theme.colors.blue} onPress={()=>navigation.navigate('ConfirmbillScreen',{name:'Thanh toán',listProduct:listItem})} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: width,
    padding: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  price: {},
  footer: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    marginVertical: 18,
  },
  titlePrice: {
    fontSize: 16,
    alignSelf: 'center',
  },
  price: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default CardScreen;
