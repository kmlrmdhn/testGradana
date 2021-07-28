import React, {useEffect, useState, useMemo} from 'react';
import {
  View,
  Text,
  Modal,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Geolocation from '@react-native-community/geolocation';

import {ModalPicker} from './src/ModalPicker';

export default function ({navigation}) {
  const [data, setData] = useState(null);
  const [allData, setAllData] = React.useState([]);
  const [data_drop, setData_drop] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [chooseDataProvince, setChooseDataProvince] =
    useState('Select Province');
  const [chooseDataRegencies, setChooseDataRegencies] =
    useState('Select Regencies');
  const [chooseDataDistricts, setChooseDataDistricts] =
    useState('Select districts');
  const [chooseDataVillages, setChooseDataVillages] =
    useState('Select villages');
  const [choosePostalCode, setChoosePostalCode] = useState('Village Id');
  const [chooseIdData, setChooseDataId] = useState(null);
  const [target, setTarget] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  // Test Number One
  const getApi = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users/2');
      const json = await response.json();

      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const APIdata = {
    name: 'kamal',
    job: 'petani',
  };
  const getPostApi = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(APIdata),
      });
    } catch (error) {
      console.error(error);
    } finally {
      Alert.alert('berhasil');
      setLoading(false)
    }
  };

  // Test Number Two
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
  };

  const findCoordinates = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        setLocation(location);
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const changeModalVisibile = bool => {
    setModalVisible(bool);
  };

  const getApi_drop = async () => {
    try {
      const response = await fetch(
        'http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json',
      );
      const json = await response.json();
      setData_drop(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getApi_drop_2 = async () => {
    console.log(target);
    try {
      const response = await fetch(
        'http://www.emsifa.com/api-wilayah-indonesia/api/' +
          target +
          '/' +
          chooseIdData +
          '.json',
      );
      const json = await response.json();
      setData_drop(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setData_choose = (option, key) => {
    switch (target) {
      case 'provinces':
        setChooseDataProvince(option);
        setTarget('regencies');
        setAllData({
          ...allData,
          Province: option,
        });

        break;

      case 'regencies':
        setChooseDataRegencies(option);
        setTarget('districts');
        setAllData({
          ...allData,
          Regencies: option,
        });
        break;

      case 'districts':
        setChooseDataDistricts(option);
        setTarget('villages');
        setAllData({
          ...allData,
          Districts: option,
        });
        break;

      case 'villages':
        setChooseDataVillages(option);
        setChoosePostalCode(key);
        setAllData({
          ...allData,
          Villages: option,
        });
        break;

      default:
        Alert.alert('not found');
    }
  };

  const setDataId_choose = key => {
    setChooseDataId(key);
  };

  useEffect(() => {
    getApi();
  }, [target]);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <View style={{padding: 10}}>
          <Text>Respone API GET: {data?.first_name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text>Respone API POST: </Text>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                width: 100,
                height: 20,
                padding:10,
                alignItems: 'center',
              }}
              onPress={getPostApi}>
              <Text style={{color: '#fff'}}>BUTTON SEND</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 10,
              backgroundColor: 'blue',
              alignItems: 'center',
            }}
            onPress={openCamera}>
            <Text style={{color: '#fff'}}>OPEN CAMERA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              marginTop: 10,
              backgroundColor: 'blue',
              alignItems: 'center',
            }}
            onPress={findCoordinates}>
            <Text style={{color: '#fff'}}>GET LOCATION</Text>
          </TouchableOpacity>
          <Text style={{color: '#000'}}>location: {location}</Text>
          <View>
            {/* PROVINSI */}
            <TouchableOpacity
              onPress={() => {
                setTarget('provinces');
                changeModalVisibile(true);
                getApi_drop();
              }}
              style={{
                padding: 10,
                borderWidth: 1,
                marginVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text>{chooseDataProvince}</Text>
            </TouchableOpacity>
            {/* REGENCIES */}
            <TouchableOpacity
              onPress={() => {
                //setTarget('regencies');
                //getTarget();
                console.log(target);
                changeModalVisibile(true);
                getApi_drop_2();
              }}
              style={{
                padding: 10,
                borderWidth: 1,
                marginVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text>{chooseDataRegencies}</Text>
            </TouchableOpacity>
            {/* DISTRICTS */}
            <TouchableOpacity
              onPress={() => {
                setTarget('districts');
                changeModalVisibile(true);
                getApi_drop_2();
              }}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 5,
                alignItems: 'center',
              }}>
              <Text>{chooseDataDistricts}</Text>
            </TouchableOpacity>
            {/* Villages */}
            <TouchableOpacity
              onPress={() => {
                setTarget('villages');
                changeModalVisibile(true);
                getApi_drop_2();
              }}
              style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginVertical: 5,
                alignItems: 'center',
              }}>
              <Text>{chooseDataVillages}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={{
                padding: 10,
                borderWidth: 1,
                marginVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text>{choosePostalCode}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Province: ' +
                    allData.Province +
                    '\n' +
                    'Regencie: ' +
                    allData.Regencies +
                    '\n' +
                    'District: ' +
                    allData.Districts +
                    '\n' +
                    'Villages: ' +
                    allData.Villages,
                ),
                  console.log(allData);
              }}
              style={{
                padding: 10,
                borderWidth: 1,
                backgroundColor: 'yellow',
                marginVertical: 5,
                borderRadius: 10,
                alignItems: 'center',
              }}>
              <Text>submit</Text>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              onRequestClose={() => {
                changeModalVisibile(false);
              }}>
              <ModalPicker
                changeModalVisibilty={changeModalVisibile}
                data={data_drop}
                setIdData={setDataId_choose}
                setData={setData_choose}
                target={target}
              />
            </Modal>
            <View></View>
          </View>
        </View>
      )}
    </View>
  );
}
