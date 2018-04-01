import React, {Component} from 'react'
import {
  View,
  Image,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

import {List, Button, Text, Card, Badge, Icon} from 'react-native-elements'

import UsageCircle from 'mopsik_mobile/src/components/tools/UsageCircle';
import SubHeader from 'mopsik_mobile/src/components/tools/SubHeader';
import MopListItem from 'mopsik_mobile/src/components/tools/MopListItem';

let _ = require('lodash');

export default class NearestMops extends Component {
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
          key={i}
          titleStyle={{fontSize: 20}}
          titleNumberOfLines={1}>
          <View style={{
            alignItems: 'center',
          }}>
          <View>
          <Text style={{marginBottom: 10, fontSize: 18}}>
            <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Kierunek: </Text>
            {mop.direction}
          </Text>
          <Text style={{marginBottom: 10, fontSize: 18}}>
            <Text style={{marginTop: 5, marginBottom: 5, fontWeight: 'bold'}}>Droga: </Text>
            {mop.road_number}
          </Text>
          </View>
          <Badge containerStyle={{backgroundColor: THEMES.basic.LightColor}}>
            <Text style={{color: 'black', fontSize: 18}}>{distance} km</Text>
          </Badge>
          <Button
            icon={
              <Icon
                name='info-outline'
                size={15}
                color='white'
              />
            }
            backgroundColor={THEMES.basic.DarkColor}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='Szczegóły'
            onPress={() => {
              this.props.navigation.navigate('MopDetails', {mop: mop})
            }} />
            <UsageCircle mop={mop} vehicle={SETTINGS.settings.main_vehicle}/>
            {FACILITIES.getFacilitiesIconsShort(mop.facilities_short)}
            </View>
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
