/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { SideMenu, List, ListItem } from 'react-native-elements'
import { Header } from 'react-native-elements'

MOPS = require('../config/mops');

export default class MyHeader extends Component {
  render() {
    return (
      <Header
  leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.navigate('DrawerToggle') }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'refresh', color: '#fff', onPress: () => MOPS.refresh() }}
/>
    );
  }
}
