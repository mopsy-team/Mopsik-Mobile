
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout,
  AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import styles from '../config/styles'
import { Button, ButtonGroup, Icon, CheckBox } from 'react-native-elements'

MOPS = require('../config/mops');
FUNCTIONS = require('../config/functions');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8




export default class SettingsView extends Component {

  constructor () {
    super()
    this.state = {
      selectedIndex: MOPS.settings.main_vehicle_id,
      car_checked: false,
      truck_checked: false,
      bus_checked: false
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex: selectedIndex})
    MOPS.settings.main_vehicle = this.buttons[selectedIndex].text_id;
    MOPS.settings.main_vehicle_id = selectedIndex;
    AsyncStorage.setItem('settings', JSON.stringify(MOPS.settings));
  }

  get_button = (icon_name, text, text_id) => {
    return (<View><Icon name={icon_name} color={((MOPS.settings.main_vehicle_id !== -1) && (text_id === MOPS.settings.main_vehicle)) ? '#8aa8e3' : 'grey'}/><Text>{text}</Text></View>)
  }

  car = () => this.get_button('directions-car', 'Samochód', 'car')
  truck = () => this.get_button('local-shipping', 'Ciężarówka', 'truck')
  bus = () => this.get_button('directions-bus', 'Autobus', 'bus')

  buttons = [
    { element: this.car, text_id: 'car' },
    { element: this.truck, text_id: 'truck' },
    { element: this.bus, text_id: 'bus'  }
  ];

  get_ok_button = () => {
    let dis = (this.state.selectedIndex === -1);
    return (<Button
      onPress={() => {this.props.navigation.state.params.first = false; this.props.navigation.navigate('Home')}}
      title="OK"
      disabled = {dis}
    />);
  }

  render() {
    let {params} = this.props.navigation.state;
    console.log('pars',  params);
    let first = (params) ? params.first : false;
    let header =  (first)
    ? (<Header navigation={this.props.navigation} firstSettings/>)
    : (<Header navigation={this.props.navigation} title='Ustawienia' />);
    let ok = (first) ? this.get_ok_button() : undefined;

  const { selectedIndex } = this.state

    return (

      <View style={styles.main}>
      {header}
      <View>
      <Text>Wybierz Twój główny typ pojazdu</Text>
      <Text>{this.first}</Text>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={this.buttons}
        containerStyle={{height: 70}}
        />
      <Text>Wybierz typy pojazdów, dla których chcesz wyświetlać dane</Text>
      <CheckBox
        title='Samochód'
        checked={this.state.car_checked}
        onPress={() => {this.setState({car_checked: true}); MOPS.settings.car_selected = true;}}
        checkedColor='red'
      />
      <CheckBox
        title='Ciężarówka'
        checked={this.state.truck_checked}
      />
      <CheckBox
        title='Autobus'
        checked={this.state.bus_checked}
      />
      </View>
      {ok}
      </View>
    );
  }
}
