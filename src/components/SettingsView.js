
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
import { Button, ButtonGroup } from 'react-native-elements'

MOPS = require('../config/mops');
FUNCTIONS = require('../config/functions');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8




export default class SettingsView extends Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }

  car = () => <Text>Samochod</Text>
  truck = () => <Text>Ciezarowka</Text>
  bus = () => <Text>Autobus</Text>

  render() {
    const buttons = [{ element: this.car }, { element: this.truck }, { element: this.bus }]
  const { selectedIndex } = this.state

    return (

      <View style={styles.main}>
      <Header navigation={this.props.navigation} title='Ustawienia' />

      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 50}} />

      </View>
    );
  }
}
