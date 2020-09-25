import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Input from '../component/Input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../component/Button';
import * as theme from '../constants/theme';
import Utility from '../utils/Utility';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import ImagePicker from 'react-native-image-picker';

const {width, height} = Dimensions.get('window');
const EditProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({
    id: '',
    img: '',
    name: '',
    phone: '',
    email: '',
  });
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [nameError, setNameError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [image, setImage] = useState();
  const [isLoading,SetIsLoading] = useState(false);

  useEffect(() => {
    getData().then((value) => {
      let user = {id: '', name: '', phone: '', email: '', img: ''};
      database()
        .ref('/users/' + value.id)
        .on('value', (value) => {
          user.img = value.child('avatar').toJSON();
          user.id = value.child('userid').toJSON();
          user.name = value.child('username').toJSON();
          user.email = value.child('email').toJSON();
          user.phone = value.child('phone').toJSON();

          setUser(user);
          setName(user.name);
          setPhone(user.phone);
          setImage(user.img);
        });
    });
  }, []);

  const chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
          SetIsLoading(true)
        storage()
          .ref('/users/' + user.id)
          .putFile(response.path)
          .then((response) => {
            if (response.state === 'success') {
              storage()
                .ref('/users/' + user.id)
                .getDownloadURL()
                .then((value) => {
                  setImage(value);
                  database()
                    .ref('/users/' + user.id)
                    .update({avatar: value})
                       SetIsLoading(false)
                        navigation.navigate("Home")
                });
            }
          });
      }
    });
  };

  const validatePhoneField = () => {
    const isValidPhone = Utility.isPhoneValid(phone);
    isValidPhone
      ? setPhoneError('')
      : setPhoneError('Số điện thoại không đúng');
    return isValidPhone;
  };

  const validateNameField = () => {
    const isValidName = Utility.isValidField(name);
    isValidName ? setNameError('') : setNameError('Tên không được để trống');
    return isValidName;
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('UserId');

      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const updateUser = () => {
    const isValidPhone = validatePhoneField();
    const isValidName = validateNameField();

    if (isValidPhone && isValidName) {
      setNameError('');
      setPhoneError('');
      console.log('Thanh cong');
      pushData(name, phone);
    }
  };

  const pushData = (name, phone) => {
    let updates = {};
    updates['/username'] = name;
    updates['/phone'] = phone;
    database()
      .ref('/users/' + user.id)
      .update(updates)
      .then((item) => {
          Alert.alert("Thành công")
          navigation.navigate("Home")
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.headerImage}
          source={require('../image/banneraccount.png')}>
         {
             isLoading ? <ActivityIndicator color={theme.colors.blue} size="large"/> :  <Image source={{uri: image}} style={styles.imgAvatar} />
         }
          <TouchableOpacity style={styles.updateAvatar} onPress={chooseFile}>
            <Text style={{fontWeight: 'bold'}}>Cập nhật ảnh đại diện</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.body}>
        <KeyboardAvoidingView style={styles.viewInput}>
          <Input
            term={name}
            error={nameError}
            onTermChange={(newName) => {
              setName(newName);
            }}
            onValidateValueField={validateNameField}
            style={{marginTop: 20}}
          />

          <Input
            term={phone}
            error={phoneError}
            onTermChange={(newPhone) => {
              setPhone(newPhone);
            }}
            keyboardType={'number-pad'}
            style={{marginTop: 10, marginBottom: -60}}
            onValidateValueField={validatePhoneField}
          />
        </KeyboardAvoidingView>
        <Button
          title={'Cập nhật thông tin'}
          color={theme.colors.blue}
          onPress={updateUser}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
  },
  imgAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  updateAvatar: {
    backgroundColor: 'white',
    marginTop: 15,
    padding: 6,
    borderRadius: 5,
  },
  body: {
    padding: 16,
  },
  viewInput: {
    marginTop: 100,
    marginBottom: 20,
  },
});
export default EditProfileScreen;
