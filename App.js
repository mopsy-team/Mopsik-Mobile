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
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { List, ListItem, Icon } from 'react-native-elements'

import MapMopsStack from './src/components/MapMopsStack';
import FavouritesStack from './src/components/FavouritesStack';
import SearchStack from './src/components/SearchStack';
import Header from './src/components/Header';
import MopDetailsView from './src/components/MopDetailsView';
import SettingsView from './src/components/SettingsView';

import styles from './src/config/styles'

MOPS = require('./src/config/mops');
var _ = require('lodash');


class HomeScreen extends Component {

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
        if(response){
          favourites = JSON.parse(response);
        }
        else{
          favourites = [];
        }
        MOPS.favouriteMOPs = favourites;
        var favourites_mapped = [];
        favourites.map((fav, i) => {
           favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
         });
        MOPS.favouriteMOPsmapped = favourites_mapped;
    }).done();
  }

  componentDidMount() {
    AsyncStorage.getItem('settings').then((response) => {
        if(response){
          settings = JSON.parse(response);
          MOPS.settings = settings;
        }
        else{
          this.props.navigation.navigate('Settings', {first: true});
        }
    }).done();

    if(MOPS.favouriteMOPs.length === 0){
      this.downloadFavourites();
    }
  }

  render() {


    MOPS.refresh();


    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Home'/>
        <View style={styles.container}>
          <Text>HOME</Text>
          <Button
        onPress={() => AsyncStorage.clear()}
        title="Remove settings - DEBUG"
      />
        </View>
      </View>
    );
  }
}


const DrawerContent = (props) => {
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
      <Image source={require('./src/images/logo_clear_all.png')} style={{flex: 1,
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


export default App = DrawerNavigator({
  Home: { screen: HomeScreen,
    navigationOptions : {
      drawerLabel: 'Home',
      drawerIcon: <Icon name='home' />,
      title: 'Home'
    }
   },
  MapMopsStack: { screen: MapMopsStack,
    navigationOptions: {
        drawerLabel: 'Mapa',
        drawerIcon: <Icon name='map' />,
    } },
  FavouritesStack: { screen: FavouritesStack,
    navigationOptions: {
        drawerLabel: 'Ulubione MOPy',
        drawerIcon: <Icon name='favorite' />,
    } },
  SearchStack: { screen: SearchStack,
    navigationOptions: {
        drawerLabel: 'Wyszukaj MOPa',
        drawerIcon: <Icon name='search' />,
    } },
  Settings: { screen: SettingsView,
    navigationOptions: {
        drawerLabel: 'Ustawienia',
        drawerIcon: <Icon name='build' />,
    } },
},{
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: DrawerContent
}
);
