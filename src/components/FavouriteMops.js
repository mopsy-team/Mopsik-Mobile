
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
import { List, ListItem } from 'react-native-elements'

MOPS = require('../config/mops');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8


export default class FavouriteMopsView extends Component {
static navigationOptions = {
    drawerLabel: 'Ulubione MOPy',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('../images/parking.png')}
        style={[styles.icon, {width: 15, height: 15}]}
      />
    ),
    title: 'Ulubione MOPy',
};


constructor() {
    super();
    this.state = {
      favouriteMOPsmapped: [],
      favouriteMOPs: [],
    };
  }


componentDidMount = () => {
       AsyncStorage.getItem('favouriteMOPs').then((response) => {
         favourites = JSON.parse(response);
           this.setState({favouriteMOPs: favourites});
           var favourites_mapped = [];
           favourites.map((fav, i) => {
              favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
          });
          this.setState({favouriteMOPsmapped: favourites_mapped});
       }).done();

   }

  render() {


    return (

      <View>
      <Header navigation={this.props.navigation} />
   <Text>Ulubione</Text>
   <List containerStyle={{marginBottom: 20}}>
   {this.state.favouriteMOPsmapped.map((fav, i) => (
     <ListItem
        roundAvatar
        avatar={
          <Image
            source={require('../images/parking_clear.png')}
            style={{width: 35, height: 35}}
            tintColor={fav.color}
          />
      }
        key={i}
        title={fav.title}
        subtitle={fav.id}
        badge={{
          value: fav.usage + "%",
          textStyle: { color: 'white' },
          containerStyle: { marginTop: 10, backgroundColor: fav.color } 
        }}
      />
   ))}
   </List>
      </View>
    );
  }
}
