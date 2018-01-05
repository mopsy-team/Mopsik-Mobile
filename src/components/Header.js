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


export default class Header extends Component {
  render() {
    return (
        <View style={styles.header}>
        <Icon.Button
          name='md-menu'
          size={26}
          color="#4F8EF7"
          backgroundColor="#FFF"
          onPress={() => this.props.navigation.navigate('DrawerToggle')}
        />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    // position absolutely in the top left corner
    ...StyleSheet.absoluteFillObject,
    top: 0,
    left: 5,
  },

});
