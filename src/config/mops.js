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
    taken: {
      car: 15,
      truck: 50,
      bus: 1
    },
    available: {
      car: 100,
      truck: 100,
      bus: 10
    }
  },
  {
    coords: {longitude: 21, latitude: 52.22},
    title: 'MOP2',
    description: 'Przykladowy mop2',
    id:2,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    taken: {
      car: 70,
      truck: 20,
      bus: 4
    },
    available: {
      car: 100,
      truck: 100,
      bus: 10
    }
  },
  {
    coords: {longitude: 21, latitude: 52.214},
    title: 'MOP3',
    description: 'Przykladowy mop3',
    id:3,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    taken: {
      car: 90,
      truck: 50,
      bus: 8
    },
    available: {
      car: 100,
      truck: 90,
      bus: 10
    }
  },
]

let settings = {
  set: false,
  main_vehicle: 'car',
  main_vehicle_id: -1,
  car_selected: false,
  truck_selected: false,
  bus_selected: false
}

let simple_legend = {
  35: {
    background:'green',
    text:'white'
  },
  50: {
    background:'yellow',
    text:'black'
  },
  75: {
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
  fetch('http://reach.mimuw.edu.pl:8008/').then(response => (response) ? response.json() : {}).then((mops_dict) => {
    console.log('resp', mops_dict)
      markers = [];
      for (var key in mops_dict) {
        markers.push(mops_dict[key]);
      }
      console.log('markers', markers);
      console.log('len', markers.length);
      markers.map((marker) => {
        usage_car = (marker.available.car > 0) ? Math.floor(marker.taken.car * 100 / marker.available.car) : 0;
        usage_truck = (marker.available.truck > 0) ? Math.floor(marker.taken.truck * 100 / marker.available.truck) : 0;
        usage_bus = (marker.available.bus > 0) ? Math.floor(marker.taken.bus * 100 / marker.available.bus) : 0;
        mops.push({
          ...marker,
          usage: {
            car: usage_car,
            truck: usage_truck,
            bus: usage_bus
          },
          color: {
            car: get_color(usage_car, simple_legend),
            truck: get_color(usage_truck, simple_legend),
            bus: get_color(usage_bus, simple_legend)
          }

        })
      });
  }).done();
}

let refresh = () => {
  console.log('refresh');
  downloadMops();
}


module.exports = {
  mops: mops,
  settings: settings,
  downloadMops: downloadMops,
  refresh: refresh,
  favouriteMOPs: favouriteMOPs,
  favouriteMOPsmapped: favouriteMOPsmapped
};
