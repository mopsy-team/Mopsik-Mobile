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
  Button,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import MapMopsView from './src/components/MapMops';
import Header from './src/components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import MopDetailsView from './src/components/MopDetailsView';

import { SideMenu, List, ListItem } from 'react-native-elements'
import { DrawerItems, SafeAreaView } from 'react-navigation';


class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./src/images/parking.png')}
        style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
    header: ({ state, setParams, navigate }) => ({
      left: (<Button
          title={'Menu'}
          onPress={() => navigate('DrawerToggle')}
        />)
    }),
  };



  constructor () {
  super()
  this.state = {
    toggled: false
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
        <Header navigation={this.props.navigation} />
        <Text>HOME</Text>
      </View>
    );
  }
}


export const Drawer = DrawerNavigator({
  Home: { screen: HomeScreen },
  MapMops: { screen: MapMopsView },
});


export default App = StackNavigator({
  Home: { screen: HomeScreen },
  Drawer: { screen: Drawer },
  MapMops: { screen: MapMopsView },
  MopDetails: { screen: MopDetailsView }
});


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
