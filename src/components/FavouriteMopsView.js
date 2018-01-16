
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
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';
import MapView from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import MopDetailsView from './MopDetailsView';
import { List, ListItem } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation'


MOPS = require('../config/mops');
FUNCTIONS = require('../config/functions');
var _ = require('lodash');

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height * 0.8

export default class FavouriteMopsView extends Component {


constructor() {
    super();
    this.state = {
      favouriteMOPsmapped: [],
    };
    //this.props.navigation.setOnNavigatorEvent(this.onNavigatorEvent);
  }

componentDidMount = () => {
      this.setState({favouriteMOPsmapped: MOPS.favouriteMOPsmapped});
}

componentWillMount() {
    DeviceEventEmitter.addListener('refresh favourites', ()=>{
      if (this.refs.favs){
        this.setState({favouriteMOPsmapped: MOPS.favouriteMOPsmapped});
      }
    })
}

deleteFav = (id) => {
  FUNCTIONS.deleteFavourite(id);
  this.setState({favouriteMOPsmapped: MOPS.favouriteMOPsmapped});
}


swipeBtns = (id) => {
    return [{
     text: 'Delete',
     backgroundColor: 'red',
     underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
     onPress: () => { this.deleteFav(id) }
   }];
 }

 onNavigatorEvent = event => {
   console.log('event', event);
    switch (event.id) {
      case 'willAppear':
        this.setState({favouriteMOPsmapped: MOPS.favouriteMOPsmapped});
        break;
  };
}

  render() {


    return (

      <View ref='favs'>
      <Header navigation={this.props.navigation} title='Ulubione MOPy'/>
   <List containerStyle={{marginBottom: 20}}>
   {this.state.favouriteMOPsmapped.map((fav, i) => (
     <Swipeout right={this.swipeBtns(fav.id)}
        autoClose
        backgroundColor= 'transparent'
        key={i}>
     <ListItem
        roundAvatar
        avatar={
          <Image
            source={require('../images/parking_clear.png')}
            style={{width: 35, height: 35}}
            tintColor={fav.color.background}
          />
      }
        key={i}
        title={fav.title}
        subtitle={fav.id}
        badge={{
          value: fav.usage + "%",
          textStyle: { color: fav.color.text },
          containerStyle: { marginTop: 10, backgroundColor: fav.color.background }
        }}
        onPress={() => {this.props.navigation.navigate('MopDetails', {mop:fav})}}
      />
      </Swipeout>
   ))}
   </List>
      </View>
    );
  }
}
