import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as theme from '../constants/theme';
import Carousel from '../component/Carousel';
import BrandCard from '../component/BrandCard';
import LaptopCard from '../component/LaptopCard';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
const {width} = Dimensions.get('window');

const data = [
  {
    id: 1,
    img: require('../image/laptopacer_slider.jpg'),
  },
  {
    id: 2,
    img: require('../image/laptopasus_slider.jpg'),
  },
  {
    id: 3,
    img: require('../image/laptopdell_slider.jpg'),
  },
  {
    id: 4,
    img: require('../image/laptophp_slider.jpg'),
  },
  {
    id: 5,
    img: require('../image/laptopmacbook_slider.jpg'),
  },
];


const HomeScreen = ({navigation}) => {
  const [listBrand, setListBrand] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    getData().then((data) => {
      let username;
      database()
        .ref('/users/' + data.id)
        .once('value', (data) => {
          username = data.child('username').toJSON();
          setName(username);
        });
    });

    getBrand();
  }, []);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserId');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getBrand = async () => {
    let arrayData = [];

    await database()
      .ref('/brandLap')
      .once('value', (querySnapShot) => {
        querySnapShot.forEach((item) => {
           
                let data = {id: '', title: '', img: ''};
                data.id = item.child('id').toJSON();
                data.img = item.child('img').toJSON();
                data.title = `Laptop ${item.child('title').toJSON()}`;
                if(data.id!=null && data.title !=null && data.img !=null){
                    arrayData.push(data);
                }
               
            
         
        });
      
        setListBrand(arrayData);
        
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2F84FF" />
      <ImageBackground
        style={styles.imageBackground}
        source={require('../image/menuscreen.png')}>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Xin chào {name}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('CartScreen',{name:"Giỏ hàng"})}>
            <Icon name="cart-outline" size={30} color={'white'} />
            </TouchableOpacity>
          </View>

          <Carousel data={data} />
          <View style={styles.viewBrand}>
            {listBrand.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate('ListLaptop', {
                    name: item.name,
                    cart: true,
                    item: item.id,
                    nameBrand: item.title
                  })
                }>
                <BrandCard name={item.title} img={item.img} />
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
    padding: theme.sizes.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.sizes.h2,
    color: theme.colors.white,
  },
  containtBrand: {
    marginTop: 16,
    flex: 0.85,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: theme.colors.white,
    padding: 8,
    borderRadius: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  titleCard: {
    color: theme.colors.blue,
    fontSize: 12,
  },
  link: {
    color: theme.colors.white,
  },
  viewBrand: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default HomeScreen;
