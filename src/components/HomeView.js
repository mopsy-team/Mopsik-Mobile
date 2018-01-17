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
import { DrawerNavigator, StackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { List, ListItem, Icon } from 'react-native-elements'

import Header from '../components/Header';

import styles from '../config/styles'


export default class HomeView extends Component {

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

  uploadFavourites = async (favourites) => {
    try{
      await AsyncStorage.setItem('favouriteMOPs',
      JSON.stringify(favourites));
    }
    catch(e){
      console.log('caught error', e);
    }
  }

  downloadFavourites = () => {
    AsyncStorage.getItem('favouriteMOPs').then((response) => {
        if(response){
          favourites = JSON.parse(response);
        }
        else{
          favourites = [];
        }
        MOPS.favouriteMOPs = favourites;
        var favourites_mapped = [];
        favourites.map((fav, i) => {
           favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
         });
        MOPS.favouriteMOPsmapped = favourites_mapped;
    }).done();
  }

  componentDidMount() {
    AsyncStorage.getItem('settings').then((response) => {
        if(response){
          settings = JSON.parse(response);
          MOPS.settings = settings;
        }
        else{
          this.props.navigation.navigate('Settings', {first: true});
        }
    }).done();

    if(MOPS.favouriteMOPs.length === 0){
      this.downloadFavourites();
    }
  }

  render() {


    MOPS.refresh();


    const { navigate } = this.props.navigation;
    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Home'/>
        <View style={styles.container}>
          <Text>HOME</Text>
          <Button
        onPress={() => AsyncStorage.clear()}
        title="Reset AsyncStorage - DEBUG"
      />
        </View>
      </View>
    );
  }
}
