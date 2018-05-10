import React from 'react';
import {StackNavigator} from 'react-navigation';

import MopDetailsView from 'mopsik_mobile/src/components/views/MopDetailsView';
import MapView from 'mopsik_mobile/src/components/views/MapView';

export default MapStack = StackNavigator({
  MapMops: {screen: MapView},
  MopDetails: {screen: MopDetailsView},
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
});
