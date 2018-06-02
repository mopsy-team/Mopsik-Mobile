import React, {Component} from 'react';
import {AsyncStorage, Dimensions, ScrollView, View, ActivityIndicator} from 'react-native';

import {Button, Icon, Text, Badge} from 'react-native-elements';

import Header from 'mopsik_mobile/src/components/tools/Header';
import UsageTable from 'mopsik_mobile/src/components/tools/UsageTable';
import styles from 'mopsik_mobile/src/config/styles';
import {calculateDistance} from 'mopsik_mobile/src/config/findNearestMop'

let _ = require('lodash');

export default class MopDetailsView extends Component {
  constructor(props) {
    super(props);
    let {mop} = this.props.navigation.state.params;
    this.addToLastViewedMops(mop.id);
    this.state = {
      button: this.generateButton(this.isInFavourites(mop.id)),
      mop: mop,
      width: Dimensions.get('window').width,
      distance: undefined
    };
  }

  loadNewDistance = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        r = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        MOPS.savedLocation = {
          ...MOPS.savedLocation,
          ...r
        };
        dist = calculateDistance(r.latitude, r.longitude, this.state.mop);
        this.setState({distance: dist});
      },
      (error) => {
      }
    );
  };

  componentDidMount() {
    this.loadNewDistance();
  }

  /* checks if mop is in favourites */
  isInFavourites = (id) => {
    return MOPS.favouriteMOPs.find((el) => {
      return el === id
    }) !== undefined;
  };

  /* depending of boolean parameter inFavs, function returns buttons
    'Add to favourites' or 'Delete from favourites' */
  generateButton = (inFavs) => {
    if (inFavs) {
      return <Button
        title='Usuń z ulubionych'
        onPress={() => {
          FAVOURITES.deleteFavourite(this.state.mop.id);
          inFavs = this.isInFavourites(this.state.mop.id);
          this.setState({button: this.generateButton(inFavs)});
        }}
        icon={<Icon
          name='favorite'
          size={20}
          color={THEMES.basic.LightPink}
        />}
        titleStyle={{
          color: THEMES.basic.LightPink
        }}
        buttonStyle={{
          backgroundColor: THEMES.basic.Red,
          margin: 10
        }}
      />
    }
    else {
      return <Button
        title='Dodaj do ulubionych'
        onPress={() => this.addToFavourites(this.state.mop.id)}
        icon={<Icon
          name='favorite-border'
          size={20}
          color={THEMES.basic.Red}
        />}
        titleStyle={{
          color: THEMES.basic.Red
        }}
        buttonStyle={{
          backgroundColor: THEMES.basic.LightPink,
          margin: 10
        }}
      />
    }
  };

  /* adds this mop to list of last viewed and trims it to the length of 3 */
  addToLastViewedMops = async (mop) => {
    if (!MOPS.lastViewedMops.includes(mop)) {
      MOPS.lastViewedMops.unshift(mop);
      MOPS.lastViewedMops = MOPS.lastViewedMops.slice(0, 3);
      await AsyncStorage.setItem('mopsik_lastViewedMops', JSON.stringify(MOPS.lastViewedMops))
    }
  };

  addToFavourites = (id) => {
    AsyncStorage.getItem('mopsik_favouriteMOPs').then((response) => {
      let favourites = [];
      if (response) {
        favourites = JSON.parse(response);
      }
      if (!favourites.includes(id)){
        favourites.push(id);
        let favourites_mapped = [];
        favourites.map((fav, i) => {
          favourites_mapped.push(_.find(MOPS.mops, {id: fav}));
        });
        MOPS.favouriteMOPs = favourites;
        MOPS.favouriteMOPsMapped = favourites_mapped;
        AsyncStorage.setItem('mopsik_favouriteMOPs', JSON.stringify(favourites));
      }
      let inFavs = this.isInFavourites(this.state.mop.id);
      this.setState({button: this.generateButton(inFavs)});
    }).done();
  };


  reload = () => {
    this.loadNewDistance();
    this.setState({reload: true});
  };

  changeWidth = () => {
    this.setState({width: Dimensions.get('window').width})
  };

  getShowOnMapButton = () => {
    return (
      <Button
        title='Pokaż na mapie'
        onPress={() => this.props.navigation.navigate('MapMops', {focused: this.state.mop})}
        icon={<Icon
          name='map'
          size={20}
          color={THEMES.basic.White}
        />}
        titleStyle={{
          color: THEMES.basic.White
        }}
        buttonStyle={{
          backgroundColor: THEMES.basic.DarkColor,
          margin: 10
        }}
      />
    )
  };

  render() {
    let {mop} = this.state;
    let {settings} = SETTINGS;
    let {main_vehicle} = settings;
    let distanceBadge =
      (this.state.distance) ?
        (<Badge containerStyle={{backgroundColor: THEMES.basic.LightColor}}>
          <Text style={{color: 'black', fontSize: 18}}>{this.state.distance} km</Text>
        </Badge>)
      :
        (<ActivityIndicator animating={true} style={{alignItems: 'center'}} size="small"/>);
    let showOnMap = (this.props.navigation.state.params.showOnMap) ? this.getShowOnMapButton() : undefined;
    return (
      <View style={styles.mainWhite} onLayout={this.changeWidth}>
        <Header navigation={this.props.navigation} title={this.state.mop.title.replace(/  +/g, ' ')} stack
                reload={this.reload}/>
        <ScrollView>
          <View style={{margin: 10}}>
            <Text h3 style={{textAlign: 'center'}}>{mop.title}</Text>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{margin: 10, width: (this.state.width - 160)}}>
                <Text h4>Kierunek: {mop.direction}</Text>
                <Text style={{marginTop: 5, marginBottom: 5}}>
                  <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Droga: </Text>
                  {mop.road_number}
                </Text>
                <Text style={{marginTop: 5, marginBottom: 5}}>
                  <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Operator: </Text>
                  {mop.operator.name}
                </Text>
                <Text style={{marginTop: 5, marginBottom: 5}}>
                  <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Kontakt: </Text>
                  {mop.operator.email}
                </Text>
                <Text style={{marginTop: 5, marginBottom: 5}}>
                  <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Pikietaż: </Text>
                  {mop.chainage}
                </Text>
                <Text style={{marginTop: 5, marginBottom: 5}}>
                  <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Miejscowość: </Text>
                  {mop.town}
                </Text>
                <View style={{marginTop: 5, marginBottom: 5, flex: 1, flexDirection: 'row'}}>
                  <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Odległość:  </Text>
                  {distanceBadge}
                </View>
                <Text></Text>
                <Text></Text>
                {this.state.button}
                {showOnMap}
              </View>
              <View style={{flex: 1, justifyContent: 'center', flexDirection: 'column'}}>
                <View style={{width: 120}}>
                  {FACILITIES.getFacilitiesIconsLong(mop.facilities)}
                </View>
              </View>
            </View>
            <Text></Text>
            <Text h4 style={{textAlign: 'center'}}>Zajętość miejsc parkingowych</Text>
            <Text></Text>
            <UsageTable mop={mop}/>
          </View>
          <Text></Text>
        </ScrollView>
      </View>
    );
  }
}
