import {
  AsyncStorage
} from 'react-native';
var _ = require('lodash');

let markers = [
  {
    coords: {longitude: 21, latitude: 52.22825},
    title: 'MOP',
    description: 'Przykladowy mop',
    id:1,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    taken_car: 15,
    available_car: 100,
    taken_truck: 50,
    available_truck: 100,
    taken_bus: 1,
    available_bus: 10,
  },
  {
    coords: {longitude: 21, latitude: 52.22},
    title: 'MOP2',
    description: 'Przykladowy mop2',
    id:2,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    taken_car: 50,
    available_car: 100,
    taken_truck: 80,
    available_truck: 100,
    taken_bus: 5,
    available_bus: 10,
  },
  {
    coords: {longitude: 21, latitude: 52.214},
    title: 'MOP3',
    description: 'Przykladowy mop3',
    id:3,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    taken_car: 90,
    available_car: 100,
    taken_truck: 20,
    available_truck: 100,
    taken_bus: 8,
    available_bus: 10,
  },
]

let simple_legend = {
  35: {
    background:'green',
    text:'white'
  },
  65: {
    background:'orange',
    text:'black'
  },
  100: {
    background:'red',
    text:'white'
  }
}

let get_color = (value, legend) => {
  for (let key in legend) {
    if (value < key)
      return legend[key];
  }
  return {
    background:'black',
    text:'white'
  };
}

let mops = [];
let favouriteMOPs = [];
let favouriteMOPsmapped = [];

let downloadMops = () => {
  markers.map((marker) => {
    usage_car = marker.taken_car * 100 / marker.available_car;
    usage_truck = marker.taken_truck * 100 / marker.available_truck;
    usage_bus = marker.taken_bus * 100 / marker.available_bus;
    mops.push({
      ...marker,
      usage_car: usage_car,
      usage_truck: usage_truck,
      usage_bus: usage_bus,
      color_car: get_color(usage_car, simple_legend),
      color_truck: get_color(usage_truck, simple_legend),
      color_bus: get_color(usage_bus, simple_legend),
    })
  });
}

let refresh = () => {
  console.log('refresh');
  downloadMops();
}


module.exports = {
  mops: mops,
  downloadMops: downloadMops,
  refresh: refresh,
  favouriteMOPs: favouriteMOPs,
  favouriteMOPsmapped: favouriteMOPsmapped
};
