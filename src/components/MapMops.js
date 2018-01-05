
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout, Button
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import MopDetailsView from './MopDetailsView';

MOPS = require('../config/mops');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class MapMopsView extends Component {
static navigationOptions = {
    drawerLabel: 'Mapa',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../images/parking.png')}
        style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
    title: 'Map',
    // header: ({ state, setParams, navigate }) => ({
    //   left: <Button
    //       title={'Menu'}
    //       onPress={() => navigate('DrawerToggle')}
    //     />
    // }),
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
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
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
    }

    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
    }

  render() {

    return (

      <View style={styles.container}>
      <Header navigation={this.props.navigation} />
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
        source={require('../images/parking.png')}
        style={{width: 15, height: 15}}
        />
        <MapView.Callout onPress={() => {console.log('press'); this.props.navigation.navigate('Home')}}>
        <View
                      style={{
                        backgroundColor: 'white',
                        height: 100,
                        width: 100,
                      }}
                    >
                      <Text>{marker.title}</Text>
                        <Text>{marker.description}</Text>
                    </View>
</MapView.Callout>
      </MapView.Marker>
    ))}
   </MapView>
   <Text>Latitude: {this.state.latitude}</Text>
   <Text>Longitude: {this.state.longitude}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: width,
    height:height
},
});
