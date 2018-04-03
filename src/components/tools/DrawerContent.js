import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';

import {DrawerItems} from 'react-navigation';

export default DrawerContent = (props) => {
  items_set = [];
  items_tab = [];
  for (let item of props.items) {
    if (item.key === 'Settings') {
      items_set.push(item);
    }
    else {
      items_tab.push(item);
    }
  }
  settings = {
    ...props,
    items: items_set
  };
  tabs = {
    ...props,
    items: items_tab
  };
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View>
          <View
            style={{
              backgroundColor: THEMES.basic.White,
              height: 130,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={SETTINGS.constants.logo} style={{
              flex: 1,
              width: 250,
              resizeMode: 'contain'
            }}/>
            <Text></Text>
          </View>
          <DrawerItems {...tabs} />
        </View>
        <View>
          <View
            style={{
              backgroundColor: THEMES.basic.LightGrey,
            }}
          >
            <DrawerItems {...settings} />
          </View>
          <Text></Text>
          <View
            style={{
              backgroundColor: THEMES.basic.LightColor,
              height: 45,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{color: THEMES.basic.textLight, fontSize: 15}}>
              Mopsy Team 2018
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
