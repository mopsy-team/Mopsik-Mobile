import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { List } from 'react-native-elements'

import MopDetailsView from 'mopsik_mobile/src/components/MopDetailsView';
import FavouriteMopsView from 'mopsik_mobile/src/components/FavouriteMopsView';


MOPS = require('mopsik_mobile/src/config/mops');
var _ = require('lodash');



export default FavouritesStack = StackNavigator({
Favourite: { screen: FavouriteMopsView },
MopDetails: { screen: MopDetailsView },
},{
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
});
