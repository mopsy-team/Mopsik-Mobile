
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout,
  Button,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import MopDetailsView from './MopDetailsView';
import FavouriteMopsView from './FavouriteMopsView';
import { List, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import MapMopsView from './MapMopsView';
import { NavigationActions } from 'react-navigation'


MOPS = require('../config/mops');
var _ = require('lodash');



export default MapMopsStack = StackNavigator({
MapMops: { screen: MapMopsView,
  navigationOptions: ({ navigation }) => ({
      title: 'Mapa',
  })
},
MopDetails: { screen: MopDetailsView,
  navigationOptions: ({ navigation }) => ({
      title: 'Szczegoly',
  }) },
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});
