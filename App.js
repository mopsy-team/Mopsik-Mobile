/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import { DrawerNavigator } from 'react-navigation';
import MapMops from './src/components/MapMops';

import { SideMenu, List, ListItem } from 'react-native-elements'


class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./src/images/parking.png')}
        style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
  };



  constructor () {
  super()
  let markers = [
    {
      latlng: {longitude: 21, latitude: 52.22825},
      title: 'MOP',
      descripton: 'Przykladowy mop'
    },
  ]
  this.state = {
    toggled: false,
    markers: markers
  }
  }

  toggleSideMenu () {
  this.setState({
    toggled: !this.state.toggled
  })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate('DrawerToggle', {markers: this.state.markers})}
          title="Menu"
        />
      </View>
    );
  }
}




export default App = DrawerNavigator({
  Home: { screen: HomeScreen },
  MapMops: { screen: MapMops },
});

// export  class App extends Component {
//
//
// render() {
//   return (
// <Nav/>
// )
// }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    //justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});
