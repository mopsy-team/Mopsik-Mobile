import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  TouchableOpacity,
  Image
} from 'react-native';

import {Button, Text} from 'react-native-elements'

import SplashView from 'mopsik_mobile/src/components/views/SplashView';
import Header from 'mopsik_mobile/src/components/tools/Header';
import styles from 'mopsik_mobile/src/config/styles'

MOPS = require('mopsik_mobile/src/config/mops');
SETTINGS = require('mopsik_mobile/src/config/settings');

let _ = require('lodash');

export default class HomeView extends Component {

  getContents = () => {
    return (
      <View>
        <Header navigation={this.props.navigation} title='Home' reload={this.reload}/>
        <View style={{
          alignItems: 'center',
        }}>
        <Text></Text>
        <Text h1>TODO</Text>
        <Button
          onPress={() => AsyncStorage.clear()}
          title="Reset AsyncStorage - DEBUG ONLY"
        />
        <Text></Text>
        <Text>Logo wygenerowane przy pomocy Logo Maker</Text>
        </View>
      </View>
    )
  }

  generateContents = () => {
    this.setState({contents: this.getContents()})
  }

  getSplashScreen = () => {
    return (<SplashView />)
  }

  constructor() {
    super();
    this.state = {
      toggled: false,
      contents: this.getSplashScreen()
    }

  }

  toggleSideMenu() {
    this.setState({
      toggled: !this.state.toggled
    })
  }


  componentWillMount() {
    AsyncStorage.getItem('settings').then((response) => {
      if (response) { // settings are already saved in AsyncStorage
        SETTINGS.settings = JSON.parse(response);
      }
      else { // no setting saved, opening app configuration
        this.props.navigation.navigate('Settings', {first: true});
      }
    }).done();
    if (MOPS.mops.length === 0) { // first opening app, downloading mop data
      this.setState({contents: this.getSplashScreen()})
      MOPS.downloadMops(() => {this.generateContents()});
    }
    else { // only refresh
      this.generateContents();
      MOPS.refresh();
    }

  }

  reload = () => {
    this.setState({reload: true});
  }

  render() {

    const {navigate} = this.props.navigation;

    return (
      <View style={styles.main}>
        {this.state.contents}
      </View>
    );
  }
}
