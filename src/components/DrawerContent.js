import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';

export default DrawerContent = (props) => {
  items_set = [];
  items_tab = [];
  for (let item of props.items){
    if (item.key === 'Settings') {
      items_set.push(item);
    }
    else {
      items_tab.push(item);
    }
  }
  settings = {
    ...props,
    items: items_set
  }
  tabs = {
    ...props,
    items: items_tab
  }
  return (
  <View  style={{flex: 1}}>
    <View
      style={{
        backgroundColor: 'white',
        height: 130,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={require('../images/logo_clear_all.png')} style={{flex: 1,
    width: 250,
    resizeMode: 'contain' }}/>
      <Text></Text>
    </View>
    <DrawerItems {...tabs} />
    <View
      style={{
        backgroundColor: '#DAE0E9',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 48,
      }}
    >
    <DrawerItems {...settings} />
  </View>
  <Text></Text>
    <View
      style={{
        backgroundColor: '#8aa8e3',
        height: 45,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 7
      }}
    >
    <Text style={{ color: 'white', fontSize: 15 }}>
      Mopsy Team® 2018
    </Text>
  </View>
  </View>
);}
