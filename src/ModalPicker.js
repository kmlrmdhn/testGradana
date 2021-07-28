import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export function ModalPicker({changeModalVisibilty, data, setData, setIdData, target}) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const onPressItem = (option, key)=> {
      
    changeModalVisibilty(false);
  
    setData(option, key);
    setIdData(key)
  };
  const option = data?.map((item, index) => {
    return (
      <View style={{flex: 1}}>
        {data == null ? (
          <Text style={{color: 'red', alignSelf: 'center'}}>Loading...</Text>
        ) : (
          <TouchableOpacity
            style={{borderBottomWidth: 1, padding: 10}}
            key={index}
            onPress={() => onPressItem(item.name, target == 'villages' ? item.district_id : item.id, )}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  });

  return (
    <TouchableOpacity
      onPress={() => changeModalVisibilty(false)}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          borderWidth: 1,
          backgroundColor: '#fff',
          borderRadius: 10,
          width: windowWidth - 20,
          height: windowHeight / 1.5,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}
