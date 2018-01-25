
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
import { List, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation'

import Header from 'mopsik_mobile/src/components/Header';
import MopDetailsView from 'mopsik_mobile/src/components/MopDetailsView';
import FavouriteMopsView from 'mopsik_mobile/src/components/FavouriteMopsView';
import MapMopsView from 'mopsik_mobile/src/components/MapMopsView';


MOPS = require('mopsik_mobile/src/config/mops');
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
