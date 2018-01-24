
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
import MopDetailsView from './MopDetailsView';
import { Button } from 'react-native-elements'
import styles from '../config/styles'

MOPS = require('../config/mops');
THEMES = require('../config/themes');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class MapMopsView extends Component {

  constructor(props) {
    super(props);
    let r = {
      latitude: 52.226,
      longitude: 21,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    this.state = {
      region: r,
      savedLocation: r,
      error: null,
      followPosition: true
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
          savedLocation: {
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
    MOPS.refresh();
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        r = {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        };
        console.log('follow', this.state.followPosition);
        if(this.state.followPosition){
          this.setState({
            region: r
          });
        }
        this.setState({
          savedLocation: r
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  selectMops = () => {
    mops = [];
    MOPS.mops.map((mop, i) => {
      if(mop.coords.latitude > (this.state.region.latitude - this.state.region.latitudeDelta)
        && mop.coords.latitude < (this.state.region.latitude + this.state.region.latitudeDelta)
        && mop.coords.longitude > (this.state.region.longitude - this.state.region.longitudeDelta)
        && mop.coords.longitude < (this.state.region.longitude + this.state.region.longitudeDelta)
      ){
        mops.push(mop);
      }

    });
    return mops;
  }

  onRegionChange(region) {
    this.setState({region: region, followPosition: false});
  }


  render() {
    let {main_vehicle} = MOPS.settings;
    let mops = this.selectMops();

    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Mapa'/>
        <View style={styles.container_map}>
          <MapView
          initialRegion={this.state.region}
          region={this.state.region}
          onRegionChange={this.onRegionChange.bind(this)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={styles.map}
          >
            {mops.map((marker, i) => (
              <MapView.Marker
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              key={i}>
              <Image
              source={require('../images/parking_clear.png')}
              style={{width: 25, height: 25}}
              tintColor={marker.color[main_vehicle].background}
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
                    <Text>Usage: {marker.usage[main_vehicle]}%</Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            ))}
          </MapView>
          <Text>Latitude: {this.state.region.latitude}</Text>
          <Text>Longitude: {this.state.region.longitude}</Text>
          <Button
            onPress={() => {
              if(!this.state.followPosition){
                console.log('follow');
                this.setState({
                  followPosition: true,
                  region: this.state.savedLocation
                })
              }
              else{
                console.log('unfollow');
                this.setState({
                  followPosition: false
                })
              }

            ;}}
            //large
            icon={{name: 'my-location', color: (this.state.followPosition) ? THEMES.basic.backgroundWhite : THEMES.basic.backgroundDarkGrey}}
            backgroundColor={(this.state.followPosition) ? THEMES.basic.backgroundLightColor : THEMES.basic.backgroundLightGrey}
            color={(this.state.followPosition) ? THEMES.basic.backgroundWhite : THEMES.basic.backgroundDarkGrey}
          />
        </View>
      </View>
    );
  }
}
