import React, {Component} from 'react';
import {
  View,
  Image
} from 'react-native';

import ReactNativeMaps_MapView from 'react-native-maps';
import {Text, Icon, Badge} from 'react-native-elements'

import Header from 'mopsik_mobile/src/components/tools/Header';
import styles from 'mopsik_mobile/src/config/styles'

MOPS = require('mopsik_mobile/src/config/mops');
FACILITIES = require('mopsik_mobile/src/config/facilities');
THEMES = require('mopsik_mobile/src/config/themes');
let _ = require('lodash');

export default class MapView extends Component {

  /* when creating component */
  constructor(props) {
    super(props);
    this.state = {
      region: MOPS.savedLocation,
      error: null,
      followPosition: true
    };
    MOPS.refresh();
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
  }

  componentDidMount() {
    //MOPS.refresh();
    /* location change listener */
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        /* new region object */
        r = {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        };
        /* update region at most every 2 seconds */
        /* updating state rerenders view with new location */
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

  /* returns only mops that are on the visible part of the map */
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

  /* dragging a map disables followingPosition */
  onRegionChange(region) {
    this.setState({region: region, followPosition: false});
  }

  /* callouts when pressed on marker */
  getCallout = (marker, main_vehicle) => {
    return (
      <ReactNativeMaps_MapView.Callout onPress={() => {
      this.props.navigation.navigate('MopDetails', {mop: marker})
    }}>
      <View
        style={{
          backgroundColor: THEMES.basic.White,
          height: 150,
          width: 150,
          flex: 1
        }}
      >
        <Text h4 numberOfLines={2}>{marker.title}</Text>
        <Text numberOfLines={1}>Kierunek: {marker.direction}</Text>
        {FACILITIES.getFacilitiesIconsShort(marker.facilities_short)}
        <Text></Text>
        <Text></Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text>Zapełnienie:  </Text>
          <Badge
            value={marker.usage[main_vehicle] + '%'}
            textStyle={{ color: marker.color[main_vehicle].text }}
            containerStyle={{ backgroundColor: marker.color[main_vehicle].background}}
          />
        </View>
      </View>
    </ReactNativeMaps_MapView.Callout>
  )
  }

  reload = () => {
    this.setState({reload: true});
  }

  render() {
    let {main_vehicle} = SETTINGS.settings;
    let mops = this.selectMops();

    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Mapa' reload={this.reload}/>
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
          color={THEMES.basic.LightColor}
          size={30}
        />
        </View>
        <View style={styles.container_map}>
          <ReactNativeMaps_MapView
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChange={this.onRegionChange.bind(this)}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={styles.map}
          >
            {mops.map((marker, i) => (
              <ReactNativeMaps_MapView.Marker
                coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
                key={i}>
                <Image
                  source={SETTINGS.constants.parking_icon_small}
                  style={{width: 25, height: 25}}
                  tintColor={marker.color[main_vehicle].background}
                />
                {this.getCallout(marker, main_vehicle)}
              </ReactNativeMaps_MapView.Marker>
            ))}
          </ReactNativeMaps_MapView>
          <Text>Latitude: {this.state.region.latitude}</Text>
          <Text>Longitude: {this.state.region.longitude}</Text>
        </View>
      </View>
    );
  }
}