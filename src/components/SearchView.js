import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';

import Header from 'mopsik_mobile/src/components/Header';
import styles from 'mopsik_mobile/src/config/styles';

MOPS = require('mopsik_mobile/src/config/mops');
FUNCTIONS = require('mopsik_mobile/src/config/functions');
let _ = require('lodash');

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
