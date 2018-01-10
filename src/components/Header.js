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
  openMenu = () => this.props.navigation.navigate('DrawerToggle');
  goBack = () => this.props.navigation.goBack();

  leftButton = () => {
    if (this.props.stack){
      return { icon: 'chevron-left', color: '#fff', onPress: this.goBack };
    }
    else{
      return { icon: 'menu', color: '#fff', onPress: this.openMenu };
    }
  }

  render() {
    console.log('header', this.props);
    return (
      <Header
        leftComponent={this.leftButton()}
        centerComponent={{ text: this.props.title, style: { color: '#fff' } }}
        rightComponent={{ icon: 'refresh', color: '#fff', onPress: () => MOPS.refresh() }}
      />
    );
  }
}
