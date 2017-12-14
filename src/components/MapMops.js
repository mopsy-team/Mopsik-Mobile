
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  CustomCallout
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8



export default class MapMops extends Component {
  static navigationOptions = {
    drawerLabel: 'Mapa',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../images/parking.png')}
        style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
  };
  render() {

    console.log('navigation', this.props.navigation)
    const {params} = this.props.navigation.state;
    console.log('params', params)

    return (

      <View style={styles.container}>
        <MapView
     initialRegion={{
       latitude: 52.22825,
       longitude: 21,
       latitudeDelta: 0.0922,
       longitudeDelta: 0.0421,
     }}
     style={styles.map}
   >
   {this.state.markers.map((marker, i) => (
      <MapView.Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
        key={i}>
        <Image
        source={require('../images/parking.png')}
        style={{width: 15, height: 15}}
        />
        <MapView.Callout tooltip onPress={() => console.log("press")}>
        <View
                      style={{
                        backgroundColor: 'white',
                        height: 100,
                        width: 100,
                      }}
                    >
                      <Text>Callout here</Text>
                    </View>
</MapView.Callout>
      </MapView.Marker>
    ))}
   </MapView>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    width: width,
    height:height
},
});
