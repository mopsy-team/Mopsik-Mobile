
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';

MOPS = require('../config/mops');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class MopDetailsView extends Component {
static navigationOptions = ({ navigation }) => {
  return{
    title: 'Details',
  }
};


  render() {
    console.log(this);
    let mop = {}
    //let { mop } = this

    return (

      <View style={styles.container}>
      <Header navigation={this.props.navigation} />

      <Text>Detale mopa: {mop.title} </Text>
      <Text>Opis: {mop.description} </Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
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
  map: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: width,
    height:height
},
});
