import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Carousel from '../component/Carousel';
import Button from '../component/Button';
import LaptopCard from '../component/LaptopCard';
import * as theme from '../constants/theme';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

const {width, height} = Dimensions.get('window');

function thousands_separators(num) {
  var num_parts = num.toString().split('.');
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return num_parts.join('.');
}

const ProductDetailScreen = ({navigation, route}) => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    img: '',
    cpu: '',
    brand: '',
    price: '',
    screen: '',
    ram: '',
    vga: '',
  });
  const [idBrand,setIdBrand] = useState('')
 
  const [listCart, setListCart] = useState([]);
  const [idUser, setIdUser] = useState();
  const [listProduct,setListProduct] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    let Id=''
    const brand = route.params.brand;
   
   const idBrand =route.params.idBrand;
   setIdBrand(idBrand)
    let listArray = [];
    getData().then((value) => {
      database()
        .ref('/cart/' + value.id)
        .child('listOrder')
        .once('value', (value) => {
          value.forEach((item) => {
            listArray.push(item.child('id').toJSON());
            setListCart(listArray);
          });
        });
      setIdUser(value.id);
    });

    database().ref('/laptop').child(id).once('value', (value) => {
        let data = {
          id: '',
          name: '',
          img: '',
          cpu: '',
          brand: brand,
          price: '',
          screen: '',
          ram: '',
          vga: '',
        };

        data.id = value.child('idLap').toJSON();
        data.cpu = value.child('cpu').toJSON();
        data.name = value.child('nameLap').toJSON();
        data.img = value.child('avaLap').toJSON();
        data.price = value.child('price').toJSON();
        data.screen = value.child('screen').toJSON();
        data.ram = value.child('ram').toJSON();
        data.vga = value.child('vga').toJSON();
        Id= data.id
        setProduct(data);
      });

      let array=[]
      database().ref('/laptop').orderByChild('idBrandLap')
      .equalTo(idBrand)
      .once("value",value=>
      {
        
        value.forEach(item=>{
          
       
          let childProduct = {
            id: '',
            name: '',
            brand: brand,
            ratting: 5,
            img: '',
            price: '',
            
          };
          childProduct.id = item.child('idLap').toJSON();
          childProduct.name = item.child('nameLap').toJSON();
          childProduct.img = item.child('avaLap').toJSON();
          childProduct.price = item.child('price').toJSON();
          if(childProduct.id !== Id){
            array.push(childProduct)
            console.log(Id)
          }
         
          setListProduct(array)
       
      }
     
      )
      
    })
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserId');

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const pushToCart = () => {
    let listData = listCart;
    if (!listData.includes(product.id)) {
      database()
        .ref('/cart/' + idUser)
        .child('listOrder')
        .push(product);
      listData.push(product.id);
      setListCart(listData);
      Alert.alert('Thêm thành công');
    } else {
      Alert.alert('Giỏ hàng của bạn đã có sản phẩm này rồi');
    }
  };

  var myloop = [];
  for (let i = 0; i < 5; i++) {
    myloop.push(
      <Image
        source={require('../image/iconstar.png')}
        style={{width: 30, height: 30, marginHorizontal: 4}}
        key={i.toString()}
      />,
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F84FF" />
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <Image source={{uri: product.img}} style={styles.lapImage} />
        <View style={styles.header}>
          <Text style={styles.headTitle}>{product.name}</Text>

          <Text style={styles.price}>{thousands_separators(product.price)}đ</Text>
        </View>
        <View style={styles.containtRating}>
          <Text>Rating</Text>
          <View style={styles.containerRating}>{myloop}</View>
        </View>
        <View style={styles.body}>
          <Text style={styles.headTitle}>Cấu hình chi tiết:</Text>
          <View style={styles.content}>
            <Text style={styles.title}>CPU:</Text>
            <Text style={styles.description}>{product.cpu}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Ram:</Text>
            <Text style={styles.description}>{product.ram}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Screen:</Text>
            <Text style={styles.description}>{product.screen}</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Card đồ hoạ:</Text>
            <Text style={styles.description}>{product.vga}</Text>
          </View>
        </View>

        <View style={styles.button}>
          <Button
            title={'Thêm vô giỏ hàng'}
            color={'#2F84FF'}
            onPress={pushToCart}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.headTitle}>Sản phẩm cùng loại</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('ListLaptop',{name:product.brand,cart:true,item: idBrand,})}>
          <Text>Xem thêm</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {
          
          listProduct.map((item) => (
            <TouchableOpacity key={item.id} onPress={()=>navigation.push('ProductDetailScreen', {
              name: 'Chi tiết sản phẩm',
              cart: true,
              id: item.id,
              brand: item.brand,
              idBrand: idBrand
            })}>
              <LaptopCard
                name={item.name}
                img={item.img}
                ratting={item.ratting}
                price={item.price}
                brand={item.brand}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  containerRating: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#B7B7B7',
    borderBottomWidth: 0.5,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  price: {
    color: '#B50302',
    fontWeight: 'bold',
    fontSize: 20,
  },
  containtRating: {
    marginVertical: 16,
  },
  body: {
    marginTop: 8,
  },
  button: {
    marginVertical: 16,
  },
  lapImage: {
    width: width,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
export default ProductDetailScreen;
