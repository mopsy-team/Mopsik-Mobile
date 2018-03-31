import React, {Component} from 'react'
import {
  View,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import {List, Button, Text, Card} from 'react-native-elements'

import SubHeader from 'mopsik_mobile/src/components/tools/SubHeader';
import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';

let _ = require('lodash');

export default class LastViewedMops extends Component {
    constructor(props){
      super();
      this.state = {
        nearestMops: props.nearestMops
      }
    }

    componentWillReceiveProps(newProps) {
      this.setState({
        nearestMops: newProps.nearestMops
      })
    }

    getCard = (mop, distance, i) =>{
      return (
        <Card
          title={mop.title}
          key={i}>
          <Text style={{marginBottom: 10}}>
            Kierunek: {mop.direction}
          </Text>
          <Text style={{marginBottom: 10}}>
            {distance} km
          </Text>
          <Button
            icon={{name: 'info-outline'}}
            backgroundColor={THEMES.basic.DarkColor}
            fontFamily='Lato'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Szczegóły'
            onPress={() => {
              this.props.navigation.navigate('MopDetails', {mop: mop})
            }} />
        </Card>
      )
    }

    render() {
        let top = (
              <SubHeader text={'Najbliższe MOPy'} rightComponent={false}/>
            );
        if(!this.state.nearestMops){
          return (
            <View>
            {top}
            <ActivityIndicator
               animating={true}
               style={{
                  alignItems: 'center',
                }}
               size="large"
            />
            </View>
          )
        }

        let {nearestMops} = this.state;
        console.log(this.state.nearestMop)

        return (
          <View>
          {top}
          {nearestMops.map((n, i) => (
            this.getCard(n.nearest, n.distance, i)
          ))}
          </View>
        )
    }
}
