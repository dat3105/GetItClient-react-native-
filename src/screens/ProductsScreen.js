import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  FlatList,
  View,
  Dimensions,
  SafeAreaView,
  TextInput,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import LaptopCard from '../component/LaptopCard';
import * as theme from '../constants/theme';
import database from '@react-native-firebase/database';



const {width, height} = Dimensions.get('window');
const ProductsScreen = ({navigation, route}) => {
  const [listproduct, setListProduct] = useState([]);
  const [idBrand,setIdBrand] = useState()
  const [search,setSearch] = useState()

  useEffect(() => {
    const item = route.params.item;
    const nameBrand = route.params.nameBrand;
    setIdBrand(item)

    let array = [];
    database()
      .ref('/laptop')
      .orderByChild('idBrandLap')
      .equalTo(item)
      .once('value', (value) => {
        value.forEach((item) => {
          let product = {
            id: '',
            name: '',
            brand: nameBrand,
            ratting: 5,
            img: '',
            price: '',
            
          };
          product.id = item.child('idLap').toJSON();
          product.name = item.child('nameLap').toJSON();
          product.img = item.child('avaLap').toJSON();
          product.price = item.child('price').toJSON();
          array.push(product);
        });

        setListProduct(array);
        console.log(listproduct);
      });
  }, []);

  function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  const searchItem =(text)=>{
    console.log(text)
    const newData = listproduct.filter(item =>{
      const itemData = item.name ? item.name.toUpperCase() :''.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1;
    })

    setListProduct(newData)
    console.log(newData)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../image/menuscreen.png')}
        style={styles.imageBackground}>
        <StatusBar barStyle="light-content" backgroundColor="#2F84FF" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.searchField}>
            <TextInput
              placeholder={'Nhập tên sản phẩm'}
              onChangeText={(text)=>searchItem(text)}
              style={styles.textInput}
            />
            <Icon size={24} name="search-outline" style={styles.icon} />
          </View>
          <View style={styles.productContainer}>
            {listproduct.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('ProductDetailScreen', {
                    name: 'Chi tiết sản phẩm',
                    cart: true,
                    id: item.id,
                    brand: item.brand,
                    idBrand: idBrand
                  })
                }>
                <LaptopCard
                  name={item.name}
                  img={item.img}
                  ratting={item.ratting}
                  price={thousands_separators(item.price)}
                  brand={item.brand}
                />
              </TouchableOpacity>
            ))}
          </View>
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
    padding: 12,
  },
  searchField: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
  },
  textInput: {
    width: 300,
  },
  icon: {
    marginRight: 10,
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default ProductsScreen;
