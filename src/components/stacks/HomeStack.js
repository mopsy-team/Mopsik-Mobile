import React from 'react';
import {StackNavigator} from 'react-navigation';

import MopDetailsView from 'mopsik_mobile/src/components/views/MopDetailsView';
import HomeView from 'mopsik_mobile/src/components/views/HomeView';
import MapView from 'mopsik_mobile/src/components/views/MapView';


export default HomeStack = StackNavigator({
  Home: {screen: HomeView},
  MopDetails: {screen: MopDetailsView},
  MapMops: {screen: MapView},
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});
