import React, {Component} from 'react';
import {
  View,
  Image
} from 'react-native';

import MapView from 'react-native-maps';
import {Text, Icon} from 'react-native-elements'
import Orientation from 'react-native-orientation'

import Header from 'mopsik_mobile/src/components/Header';
import styles, {m} from 'mopsik_mobile/src/config/styles'

MOPS = require('mopsik_mobile/src/config/mops');
FACILITIES = require('mopsik_mobile/src/config/facilities');
THEMES = require('mopsik_mobile/src/config/themes');
let _ = require('lodash');

export default class MapMopsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: MOPS.savedLocation,
      error: null,
      followPosition: true,
      orientation: Orientation.getInitialOrientation()
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        r = {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.state = {
          ...this.state,
          region: r,
          error: null,
        };
        MOPS.savedLocation = r;
      },
      (error) => this.state = {...this.state, error: error.message},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    Orientation.addOrientationListener(this._updateOrientation.bind(this));
  }

  _updateOrientation(orientation){
    this.setState({ orientation })
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
        var t = new Date().getTime();
        if((t - MOPS.lastLocationUpdate) >= 2000){
          if(this.state.followPosition){
            this.setState({
              region: r
            });
          }
          MOPS.savedLocation = r;
          MOPS.lastLocationUpdate = t;
      }
      },
      (error) => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 20000, distanceFilter: 10},
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  selectMops = () => {
    let mops = [];
    MOPS.mops.map((mop, i) => {
      if (mop.coords.latitude > (this.state.region.latitude - this.state.region.latitudeDelta)
        && mop.coords.latitude < (this.state.region.latitude + this.state.region.latitudeDelta)
        && mop.coords.longitude > (this.state.region.longitude - this.state.region.longitudeDelta)
        && mop.coords.longitude < (this.state.region.longitude + this.state.region.longitudeDelta)
      ) {
        mops.push(mop);
      }

    });
    return mops;
  };

  onRegionChange(region) {
    this.setState({region: region, followPosition: false});
  }

  getCallout = (marker, main_vehicle) => {
    return (
      <MapView.Callout onPress={() => {
      this.props.navigation.navigate('MopDetails', {mop: marker})
    }}>
      <View
        style={{
          backgroundColor: THEMES.basic.backgroundWhite,
          height: 150,
          width: 150,
          flex: 1
        }}
      >
        <Text h4>{marker.title}</Text>
        <Text>{marker.description}</Text>
        {FACILITIES.getFacilitiesIcons(marker.facilities_short)}
        <Text>Zapełnienie MOPa: <Text style={{
          backgroundColor: marker.color[main_vehicle].background,
          color: marker.color[main_vehicle].text
        }}>{marker.usage[main_vehicle]}%</Text></Text>
      </View>
    </MapView.Callout>
  )
  }


  render() {
    let {main_vehicle} = MOPS.settings;
    let mops = this.selectMops();

    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Mapa'/>
        <View style={{zIndex: 10}}>
        <Icon
          onPress={() => {
            if(!this.state.followPosition){
              console.log('follow');
              this.setState({
                followPosition: true,
                region: {
                  ...this.state.region,
                  longitude: MOPS.savedLocation.longitude,
                  latitude: MOPS.savedLocation.latitude
                }
              })
            }
            else{
              console.log('unfollow');
              this.setState({
                followPosition: false
              })
            }
          ;}}
          name='my-location'
          raised
          reverse={this.state.followPosition}
          color={THEMES.basic.backgroundLightColor}
          size={30}
        />
        </View>
        <View style={styles.container_map}>
          <MapView
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={m()}
          >
            {mops.map((marker, i) => (
              <MapView.Marker
                coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
                key={i}>
                <Image
                  source={require('mopsik_mobile/src/images/parking_clear.png')}
                  style={{width: 25, height: 25}}
                  tintColor={marker.color[main_vehicle].background}
                />
                {this.getCallout(marker, main_vehicle)}
              </MapView.Marker>
            ))}
          </MapView>
          <Text>Latitude: {this.state.region.latitude}</Text>
          <Text>Longitude: {this.state.region.longitude}</Text>
        </View>
      </View>
    );
  }
}
