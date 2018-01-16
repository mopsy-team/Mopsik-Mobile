
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
import SearchView from './SearchView';
import { List, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation'


MOPS = require('../config/mops');
var _ = require('lodash');



export default SearchStack = StackNavigator({
Search: { screen: SearchView },
MopDetails: { screen: MopDetailsView },
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});
