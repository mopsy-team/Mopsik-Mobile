import React, {Component} from 'react';
import {Platform, Dimensions, Image, View} from 'react-native';

import ReactNativeMaps_MapView from 'react-native-maps';
import {Badge, Icon, Text} from 'react-native-elements'

import Header from 'mopsik_mobile/src/components/tools/Header';
import styles from 'mopsik_mobile/src/config/styles'

export default class MapView extends Component {

  /* when creating component */
  constructor(props) {
    super(props);
    let focused = (this.props.navigation.state.params) ? this.props.navigation.state.params.focused : undefined;
    this.state = {
      region: (focused) ? {...MOPS.savedLocation, ...focused.coords} : MOPS.savedLocation,
      error: null,
      followPosition: (!focused),
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      initialized: false,
      focused: focused
    };
    MOPS.refresh();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        r = {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        if (this.state.followPosition) {
          this.state = {
            ...this.state,
            region: r,
            error: null,
          };
        }
        MOPS.savedLocation = r;
      },
      (error) => this.state = {...this.state, error: error.message},
    );
  }

  componentDidMount() {
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
      },
      (error) => this.setState({error: error.message}),
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  /* returns only mops that are on the visible part of the map */
  selectMops = () => {
    let mops = [];
    MOPS.mops.map((mop, i) => {
      if (Math.abs(mop.coords.latitude - this.state.region.latitude) < this.state.region.latitudeDelta
        && Math.abs(mop.coords.longitude - this.state.region.longitude) < this.state.region.longitudeDelta) {
        mops.push(mop);
      }

    });
    return mops;
  };

  /* dragging a map disables followingPosition */
  onRegionChange(region) {
    this.setState({region: region, followPosition: false, initialized: false});
  }

  /* callouts when pressed on marker */
  getCallout = (marker, main_vehicle) => {
    return (
      <ReactNativeMaps_MapView.Callout
        onPress={() => {
          this.props.navigation.navigate('MopDetails', {mop: marker, showOnMap: false})
        }}
        style={{ height: 150, width: 150,  flex: 1, justifyContent: 'space-around' }}
      >
          <Text numberOfLines={2} style={{fontSize: 20, fontWeight: 'bold'}}>{marker.title}</Text>
          <Text numberOfLines={1}>Kierunek: {marker.direction}</Text>
          <View style={{height: 35}}>
            {FACILITIES.getFacilitiesIconsShort(marker.facilities_short)}
          </View>
          <View style={{height: 28}}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{height: 28, flex: 1, justifyContent: 'center'}}>
                <Text>Zapełnienie: </Text>
              </View>
              <Badge
                value={marker.usage[main_vehicle] + '%'}
                textStyle={{color: marker.color[main_vehicle].text}}
                containerStyle={{backgroundColor: marker.color[main_vehicle].background, height: 28}}
              />
            </View>
          </View>
      </ReactNativeMaps_MapView.Callout>
    )
  };

  reload = () => {
    this.setState({reload: true, initialized: false});
  };

  changeMeasures = () => {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    })
  };

  onMapReady = () => {
    // opens chosen callout if map is in 'focused' mode
    if (this.state.focused && this.marker && this.marker.showCallout) {
      setTimeout(() => this.marker.showCallout(), 0);
    }
    this.setState({initialized: true});
  };

  /* sets variable marker to reference ref;
    used in focused mode - while creating markers,
    this function is called when on one the map is supposed to focuse on */

  setMarkerRef = (ref) => {
    this.marker = ref
  };

  /* called on every 'not focused' marker */
  empty = () => {};

  render() {
    let {main_vehicle} = SETTINGS.settings;
    let mops = this.selectMops();


    return (
      <View style={styles.main} onLayout={this.changeMeasures}>
        <Header
          navigation={this.props.navigation}
          title={(this.state.focused) ? ('Pokaż na mapie: ' + this.state.focused.title) : 'Mapa'}
          reload={this.reload}
          stack={this.state.focused}
        />
        <View style={{zIndex: 10}}>
          <Icon
            onPress={() => {
              if (!this.state.followPosition) {
                this.setState({
                  followPosition: true,
                  region: {
                    ...this.state.region,
                    longitude: MOPS.savedLocation.longitude,
                    latitude: MOPS.savedLocation.latitude
                  }
                })
              }
              else {
                this.setState({
                  followPosition: false
                })
              }
            }}
            name='my-location'
            raised
            reverse={this.state.followPosition}
            color={THEMES.basic.LightColor}
            size={30}
          />
        </View>
        <View style={{
          flex: 1,
          backgroundColor: '#f5fcff',
          position: 'absolute',
          top: Platform.select({
            ios: 70,
            android: 45,
          }),
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <ReactNativeMaps_MapView
            region={this.state.region}
            onRegionChangeComplete={this.onRegionChange.bind(this)}
            showsUserLocation={true}
            showsMyLocationButton={false}
            onMapReady={this.onMapReady}
            moveOnMarkerPress={false}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              flex: 1,
              width: this.state.width,
              height: this.state.height - Platform.select({
                ios: 90,
                android: 70,
              })
            }}
          >
            {mops.map((marker, i) => (
              <ReactNativeMaps_MapView.Marker
                coordinate={marker.coords}
                title={marker.title}
                description={marker.direction}
                tracksViewChanges={!this.state.initialized}
                ref={(this.state.focused && marker.id === this.state.focused.id) ? this.setMarkerRef : this.empty}
                key={i}>
                <Image
                  source={SETTINGS.constants.parking_icon_small}
                  style={{width: 25, height: 25, tintColor: marker.color[main_vehicle].background}}
                />
                {this.getCallout(marker, main_vehicle)}
              </ReactNativeMaps_MapView.Marker>
            ))}
          </ReactNativeMaps_MapView>
        </View>
      </View>
    );
  }
}
