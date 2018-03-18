import React, {Component} from 'react';
import {
  Image,
  View,
  Text
} from 'react-native';

import Header from 'mopsik_mobile/src/components/tools/Header';
import styles from 'mopsik_mobile/src/config/styles'

MOPS = require('mopsik_mobile/src/config/mops');
SETTINGS = require('mopsik_mobile/src/config/settings');

let _ = require('lodash');

export default class SplashView extends Component {

  render() {

    return (
      <View style={{
        flex: 1, flexDirection: 'column', justifyContent: 'space-around',
        alignItems: 'center', backgroundColor: THEMES.basic.white
      }}>
        <Image source={require('mopsik_mobile/src/images/logo_clear_all.png')}/>
        <Text style={{fontSize: 25}}>
          Mopsy Team 2018
        </Text>
      </View>
    );
  }
}