
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import styles from '../config/styles'
import { Button } from 'react-native-elements'

MOPS = require('../config/mops');
FUNCTIONS = require('../config/functions');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class SettingsView extends Component {


  render() {
    return (

      <View style={styles.main}>
      <Header navigation={this.props.navigation} title='Wyszukaj'/>

      <Text>*** </Text>
      <Text>Wyszukaj</Text>

      </View>
    );
  }
}
