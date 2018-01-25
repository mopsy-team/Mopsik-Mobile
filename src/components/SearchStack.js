
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
import SearchView from 'mopsik_mobile/src/components/SearchView';


MOPS = require('mopsik_mobile/src/config/mops');
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
