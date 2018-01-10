
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout,
  Button,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import styles from '../config/styles'

MOPS = require('../config/mops');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class MopDetailsView extends Component {

  isInFavourites = (id) => {
    console.log(MOPS.favouriteMOPs, MOPS.favouriteMOPs.find((el) => {return el === id}));
    return MOPS.favouriteMOPs.find((el) => {return el === id}) !== undefined;
  }

  constructor(props) {
    super(props);
    let {mop} = this.props.navigation.state.params;
    this.state = {
      disabled: this.isInFavourites(mop.id),
      mop: mop
    };
  }

  addToFavourites = (id) => {
    AsyncStorage.getItem('favouriteMOPs').then((response) => {
      favourites = JSON.parse(response);
      favourites.push(id)
      AsyncStorage.setItem('favouriteMOPs', JSON.stringify(favourites));
      var favourites_mapped = [];
      favourites.map((fav, i) => {
         favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
       });
      this.setState({favouriteMOPsmapped: favourites_mapped});
     MOPS.favouriteMOPs = favourites;
    MOPS.favouriteMOPsmapped = favourites_mapped;
    this.setState({disabled: this.isInFavourites(this.state.mop.id)});
    }).done();
  }


  render() {
    console.log(this.state);
    return (

      <View style={styles.main}>
      <Header navigation={this.props.navigation} title={this.state.mop.title} stack/>

      <Text>Detale mopa: {this.state.mop.title} </Text>
      <Text>Opis: {this.state.mop.description} </Text>
      <Button title='Dodaj to ulubionych' onPress={() => this.addToFavourites(this.state.mop.id)} disabled={this.state.disabled} />
      </View>
    );
  }
}
