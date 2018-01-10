
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import styles from '../config/styles'

MOPS = require('../config/mops');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class MopDetailsView extends Component {
  render() {
    let {mop} = this.props.navigation.state.params
    //let { mop } = this

    return (

      <View style={styles.main}>
      <Header navigation={this.props.navigation} title={mop.title} stack/>

      <Text>Detale mopa: {mop.title} </Text>
      <Text>Opis: {mop.description} </Text>
      </View>
    );
  }
}
