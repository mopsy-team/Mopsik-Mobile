/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

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
import MapView from 'react-native-maps';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import MapMopsStack from './src/components/MapMopsStack';
import FavouritesStack from './src/components/FavouritesStack';
import Header from './src/components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import MopDetails from './src/components/MopDetailsView';

import { SideMenu, List, ListItem } from 'react-native-elements'
import { DrawerItems, SafeAreaView } from 'react-navigation';

import styles from './src/config/styles'

MOPS = require('./src/config/mops');
var _ = require('lodash');


class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
      source={require('./src/images/parking.png')}
      style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
    title: 'Home'
  };


  constructor () {
    super()
    this.state = {
      toggled: false
    }

  }

  toggleSideMenu () {
    this.setState({
      toggled: !this.state.toggled
    })
  }

  uploadFavourites = async (favourites) => {
    try{
      await AsyncStorage.setItem('favouriteMOPs',
      JSON.stringify(favourites));
    }
    catch(e){
      console.log('caught error', e);
    }
  }

  downloadFavourites = () => {
    AsyncStorage.getItem('favouriteMOPs').then((response) => {
        favourites = JSON.parse(response);
        MOPS.favouriteMOPs = favourites;
        var favourites_mapped = [];
        favourites.map((fav, i) => {
           favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
         });
        MOPS.favouriteMOPsmapped = favourites_mapped;
    }).done();
  }

  componentDidMount() {
    if(MOPS.favouriteMOPs.length === 0){
      this.downloadFavourites();
    }
  }

  render() {

    //debug
    //this.uploadFavourites([1,2]);
    //debug


    MOPS.refresh();


    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Home'/>
        <View style={styles.container}>
          <Text>HOME</Text>
        </View>
      </View>
    );
  }
}



export default App = DrawerNavigator({
  Home: { screen: HomeScreen },
  MapMopsStack: { screen: MapMopsStack,
    navigationOptions: {
        drawerLabel: 'Mapa',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('./src/images/parking.png')}
            style={[styles.icon, {width: 15, height: 15}]}
          />
        ),
    } },
  FavouritesStack: { screen: FavouritesStack,
    navigationOptions: {
        drawerLabel: 'Ulubione MOPy',
        drawerIcon: ({ tintColor }) => (
          <Image
            source={require('./src/images/parking.png')}
            style={[styles.icon, {width: 15, height: 15}]}
          />
        ),
    } },
}
);
