import React, {Component} from 'react';
import {FlatList, ScrollView, View} from 'react-native';

import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';
import Header from 'mopsik_mobile/src/components/tools/Header';

import {Avatar, Divider, SearchBar} from 'react-native-elements'

MOPS = require('mopsik_mobile/src/config/mops');
let _ = require('lodash');


export default class SearchView extends Component {
  constructor() {
    super();
    this.state = {
      searchPhrase: "",
      found: MOPS.mops,
      found_filtered: MOPS.mops,
      reload: false,
      page: 1,
      facilities: this.getInitialChecks()
    }
  }

  getInitialChecks = () => {
    let facs = {};
    FACILITIES.filterFacilitiesCodes.map((f, i) => {
      facs[f] = false;
    });
    return facs;
  };

  findMops = (txt, param) => {
    return MOPS.mops.filter((mop) => {
      return mop[param].toLowerCase().match(txt)
    })
  };

  matchFacilities = (mop, facs) => {
    for (f in facs) {
      if (facs[f] && !mop.facilities_dict[f]) {
        return false;
      }
    }
    return true;
  };

  filterMops = (mops, facs) => {
    return mops.filter((mop) => {
      return this.matchFacilities(mop, facs)
    })
  };

  changeSearchPhrase = (t) => {
    this.setState({searchPhrase: t});
    let txt = (t && t !== "") ? t.toLowerCase() : "";
    let found_name = this.findMops(txt, 'title');
    let found_road = this.findMops(txt, 'road_number');
    let found_town = this.findMops(txt, 'town');
    let found_direction = this.findMops(txt, 'direction');
    let found = _.union(found_direction, found_name, found_road, found_town);
    let found_filtered = this.filterMops(found, this.state.facilities);

    this.setState({
      found_filtered: found_filtered,
      found: found,
      page: 1
    });
  };

  reload = () => {
    this.setState({reload: true});
  };

  checkFacility = (fac) => {
    let f = this.state.facilities;
    f[fac] = !f[fac];
    let found_filtered = this.filterMops(this.state.found, f);
    this.setState({
      found_filtered: found_filtered,
      page: 1,
      facilities: f
    });
  };


  render() {
    let facs = FACILITIES.facilities;
    let fac_codes = FACILITIES.filterFacilitiesCodes;
    return (
      <View>
        <Header navigation={this.props.navigation} title='Wyszukaj MOPa' reload={this.reload}/>
        <SearchBar
          round
          lightTheme
          onChangeText={this.changeSearchPhrase}
          onClearText={this.changeSearchPhrase}
          inputStyle={{color: THEMES.basic.DarkGrey}}
          icon={{type: 'material', name: 'search'}}
          placeholder='Wyszukaj...'
          clearIcon={{color: THEMES.basic.DarkGrey, name: 'close'}}
        />
        <ScrollView>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            backgroundColor: THEMES.basic.White
          }}>
            {fac_codes.map((f, i) => {
              return (
                <Avatar
                  onPress={() => this.checkFacility(f)}
                  icon={{name: facs[f].icon, color: THEMES.basic.White}}
                  raised
                  overlayContainerStyle={{backgroundColor: this.state.facilities[f] ? THEMES.basic.DarkColor : THEMES.basic.LightGrey}}
                  width={50}
                  height={50}
                  rounded={THEMES.roundedIcons}
                  key={i}
                  containerStyle={{margin: 3}}
                />
              )
            })}
          </View>
          <Divider style={{backgroundColor: THEMES.basic.DarkGrey, height: 0.8}}/>
          <View>
            <FlatList
              data={this.state.found_filtered}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => (<MopListItem mop={item} key={index} navigation={this.props.navigation}/>)}
              style={{backgroundColor: THEMES.basic.White}}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
