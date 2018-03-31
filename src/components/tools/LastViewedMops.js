import React, {Component} from 'react'
import {
  View,
  Image,
  AsyncStorage
} from 'react-native';

import {List, Button, Text, Header} from 'react-native-elements'

import SubHeader from 'mopsik_mobile/src/components/tools/SubHeader';
import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';

let _ = require('lodash');

export default class LastViewedMops extends Component {

    getLast = () => {
      last = [];
      MOPS.lastViewedMops.map((l, i) => {
         last.push(_.find(MOPS.mops, { id: l }));
       });
      return last;
    }

    constructor(){
      super();
      this.state = {
        reload: false
      }
    }

    clearLastViewedMops = async () => {
      MOPS.lastViewedMops = [];
      AsyncStorage.setItem('lastViewedMops', JSON.stringify([])).then(() => {
        this.setState({reload: !this.state.reload});
      }).done();
    }

    render() {
        let top = (
              <SubHeader text={'Ostatnio wyświetlane MOP-y'} rightComponent={{
                icon: 'clear',
                color: 'white',
                onPress: this.clearLastViewedMops,
                underlayColor: THEMES.basic.LightColor
              }} />
            );

        if(MOPS.lastViewedMops.length === 0){
          return (
            <View>
            {top}
            <Text style={{fontSize: 18, textAlign: 'center'}}>Brak danych</Text>
            </View>
          )
        }

        return (
          <View>
          {top}
          <List containerStyle={{marginBottom: 15}}>
            {this.getLast().map((l, i) => (
              <MopListItem mop={l} key={i} navigation={this.props.navigation}/>
            ))}
          </List>
          </View>
        )
    }
}
