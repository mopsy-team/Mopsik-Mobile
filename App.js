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
import MapMopsView from './src/components/MapMops';
import FavouriteMopsView from './src/components/FavouriteMops';
import Header from './src/components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import MopDetailsView from './src/components/MopDetailsView';

import { SideMenu, List, ListItem } from 'react-native-elements'
import { DrawerItems, SafeAreaView } from 'react-navigation';

import styles from './src/config/styles'

MOPS = require('./src/config/mops');


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


  render() {

    //debug
    this.uploadFavourites([1,2]);
    //debug



    
    MOPS.refresh();


    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
      <Header navigation={this.props.navigation} />
      <View style={styles.container}>
        <Text>HOME</Text>
      </View>
      </View>
    );
  }
}


export default App = DrawerNavigator({
  Home: { screen: HomeScreen },
  MapMops: { screen: MapMopsView },
  Favourite: { screen: FavouriteMopsView }
}
);

// export default App = StackNavigator({
//   App: {
//     screen: Drawer,
//     navigationOptions: {
//       title: 'My Chats',
//     },
//   },
//   MapMops: { screen: MapMopsView },
//   Favourite: { screen: FavouriteMopsView },
//   MopDetails: { screen: MopDetailsView },
// }, {
//   initialRouteName: 'App',
//   headerMode: 'screen',
//   title: 'Main'
// });
