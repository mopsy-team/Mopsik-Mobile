import React, {Component} from 'react'
import {Text, View} from 'react-native';

import {ListItem} from 'react-native-elements'

export default class MopListItem extends Component {

  render() {
    let {main_vehicle} = SETTINGS.settings;
    let {mop} = this.props;

    return (
      <ListItem
        avatar={
          <View style={{width: 40, alignItems: 'center'}}>
            <Text
              style={{marginTop: 9, fontSize: 17, color: THEMES.basic.DarkGrey, textAlign: 'center'}}>
              {mop.road_number}
            </Text>
          </View>
        }
        title={mop.title}
        subtitle={'Kierunek: ' + mop.direction}
        badge={{
          value: mop.usage[main_vehicle] + "%",
          textStyle: {color: mop.color[main_vehicle].text, fontSize: 15},
          containerStyle: {marginTop: 10, backgroundColor: mop.color[main_vehicle].background, width: 65}
        }}
        onPress={() => {
          this.props.navigation.navigate('MopDetails', {mop: mop})
        }}
      />
    )
  }
}
