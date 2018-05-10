import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';

let _ = require('lodash');

export default class SplashScreen extends Component {

  render() {

    return (
      <View style={{
        flex: 1, flexDirection: 'column', justifyContent: 'space-around',
        alignItems: 'center', backgroundColor: THEMES.basic.White
      }}>
        <Image source={SETTINGS.constants.logo}/>
        <Text style={{fontSize: 25}}>
          Mopsy Team 2018
        </Text>
      </View>
    );
  }
}
