import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';

import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';
import Header from 'mopsik_mobile/src/components/tools/Header';
import styles from 'mopsik_mobile/src/config/styles';

import {SearchBar} from 'react-native-elements'
//import {List} from 'react-native-elements'

MOPS = require('mopsik_mobile/src/config/mops');
let _ = require('lodash');

const ITEMS_PER_PAGE = 10;

export default class SearchView extends Component {
  constructor() {
    super();
    this.state = {
      searchPhrase: "",
      found: MOPS.mops,
      reload: false,
      found_trimmed: MOPS.mops.slice(0,ITEMS_PER_PAGE),
      page: 1,
    }
  }

  findMops = (txt, param) => {
    return MOPS.mops.filter((mop) => {return mop[param].toLowerCase().match(txt)})
  }

  changeSearchPhrase = (t) => {
    var found = [];
    this.setState({searchPhrase: t});
    var txt = (t && t !== "") ? t.toLowerCase() : "";
    var found_name = this.findMops(txt, 'title');
    var found_road = this.findMops(txt, 'road_number');
    var found_town = this.findMops(txt, 'town');
    var found_direction = this.findMops(txt, 'direction');
    found = _.union(found_direction, found_name, found_road, found_town);

    this.setState({
      found: found,
      found_trimmed: found.slice(0, ITEMS_PER_PAGE),
      page: 1
    });
  }

  reload = () => {
    this.setState({reload: true});
  }

  loadMore = () => {
    const { page, found_trimmed } = this.state;
    const start = page * ITEMS_PER_PAGE;
    const end = (page + 1) * ITEMS_PER_PAGE - 1;

    const newData = this.state.found.slice(start, end);
    this.setState({
      found_trimmed: [...found_trimmed, ...newData],
      page: page + 1
    });
}


  render() {
    return (
      <View style={styles.main}>
        <Header navigation={this.props.navigation} title='Wyszukaj' reload={this.reload}/>
        <SearchBar
          round
          lightTheme
          onChangeText={this.changeSearchPhrase}
          onClearText={this.changeSearchPhrase}
          inputStyle={{color: THEMES.basic.DarkGrey}}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Wyszukaj...'
          clearIcon={{ color: THEMES.basic.DarkGrey, name: 'close' }}
        />
        <ScrollView>
        <View>
        <FlatList
          data={this.state.found_trimmed}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (<MopListItem mop={item} key={index} navigation={this.props.navigation}/>)}
          onEndReached={this.loadMore}
        />
      </View>
        </ScrollView>
      </View>
    );
  }
}
