
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
import MopDetailsView from './MopDetailsView';
import styles from '../config/styles'

MOPS = require('../config/mops');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class MapMopsView extends Component {
  static navigationOptions = {
    drawerLabel: 'Mapa',
    drawerIcon: () => (
      <Image
      source={require('../images/parking.png')}
      style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
    title: 'Map',
  };

  constructor(props) {
    super(props);
    this.state = {
      region:{
        latitude: 52.226,
        longitude: 21,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      error: null,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.state = {
          ...this.state,
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null,
        };
      },
      (error) => this.state = { ...this.state, error: error.message },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }



  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
    );
    if(MOPS.favouriteMOPs.length === 0){
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {


    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Mapa'/>
        <View style={styles.container_map}>
          <MapView
          initialRegion={this.state.region}
          region={this.state.region}
          //onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={styles.map}
          >
            {MOPS.mops.map((marker, i) => (
              <MapView.Marker
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              key={i}>
              <Image
              source={require('../images/parking_clear.png')}
              style={{width: 15, height: 15}}
              tintColor={marker.color_car.background}
              />
                <MapView.Callout onPress={() => {this.props.navigation.navigate('MopDetails', {mop:marker})}}>
                  <View
                  style={{
                    backgroundColor: 'white',
                    height: 100,
                    width: 100,
                  }}
                  >
                    <Text>{marker.title}</Text>
                    <Text>{marker.description}</Text>
                    <Text>Usage: {marker.usage_car}%</Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>
          <Text>Latitude: {this.state.latitude}</Text>
          <Text>Longitude: {this.state.longitude}</Text>
        </View>
      </View>
    );
  }
}
