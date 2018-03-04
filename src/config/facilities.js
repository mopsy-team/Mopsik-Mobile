import React, {Component} from 'react';
import {View} from 'react-native';

import {Avatar} from 'react-native-elements'


export const facilities = {
  car_wash: {
    icon: 'local-car-wash',
    name: 'Myjnia samochodowa'
  },
  dangerous_cargo_places: {
    icon: 'warning',
    name: 'Myjnia'
  },
  garage: {
    icon: 'build',
    name: 'Warsztat'
  },
  lighting: {
    icon: 'lightbulb-outline',
    name: 'Oświetlenie'
  },
  monitoring: {
    icon: 'videocam',
    name: 'Monitoring'
  },
  petrol_station: {
    icon: 'local-gas-station',
    name: 'Stacja benzynowa'
  },
  restaurant: {
    icon: 'restaurant',
    name: 'Gastronomia'
  },
  security: {
    icon: 'security',
    name: 'Ochrona'
  },
  sleeping_places: {
    icon: 'hotel',
    name: 'Miejsca noclegowe'
  },
  toilets: {
    icon: 'wc',
    name: 'Toalety'
  }
};

export const facilities_codes = [
  'car_wash',
  'dangerous_cargo_places',
  'garage',
  'lighting',
  'monitoring',
  'petrol_station',
  'restaurant',
  'security',
  'sleeping_places',
  'toilets'
];

export const facilities_codes_short = [
  'petrol_station',
  'restaurant',
  'sleeping_places',
  'toilets'
];

let getFacilityIcon = (code, i) => {
  let fac = facilities[code];
  return (
  <Avatar
    onPress={() => {}}
    icon={{name: fac.icon, color: THEMES.basic.backgroundWhite}}
    raised
    overlayContainerStyle={{backgroundColor: THEMES.basic.backgroundDarkColor}}
    width={35}
    height={35}
    rounded
    key={i}
  />
  )
}

export const getFacilitiesIcons = (codes) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>
    {codes.map((code, i) => (
      getFacilityIcon(code, i)
    ))}
    </View>
  )
}
