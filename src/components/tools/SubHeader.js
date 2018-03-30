import React, {Component} from 'react'
import {
  View,
} from 'react-native';

import {List, Button, Text, Header} from 'react-native-elements'

import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';

let _ = require('lodash');

export default class SubHeader extends Component {

    render() {
        return (
          <Header
            centerComponent={{text: this.props.text, style: {color: 'white', fontSize: 16}}}
            rightComponent={{
              icon: 'clear',
              color: 'white',
              onPress: this.props.onPress,
              underlayColor: THEMES.basic.LightColor
            }}
            outerContainerStyles={{backgroundColor: THEMES.basic.LightColor, height: 45}} />
        )
    }
}
