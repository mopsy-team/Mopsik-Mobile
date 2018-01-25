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

import LinkInBrowserView from 'mopsik_mobile/src/components/LinkInBrowserView'

import Header from '../components/Header';

import styles from '../config/styles'

var _ = require('lodash');

export default class HomeView extends Component {

  constructor () {
    super()
    this.state = {
      toggled: false,
      link: false
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


  componentWillMount() {
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
      FUNCTIONS.downloadFavourites();
    }

    if(MOPS.mops.length === 0){
      MOPS.downloadMops();
    }
    else{
      MOPS.refresh();
    }
  }

  render() {

    hyperlink = (this.state.link) ? <LinkInBrowserView src='https://logomakr.com/018RtM#'/> : <Text></Text>;

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
      <TouchableOpacity onPress={() => this.setState({link: true})}>
        <Text>Logo wygenerowane przy pomocy Logo Maker</Text>
      </TouchableOpacity>
      {hyperlink}
        </View>
      </View>
    );
  }
}
