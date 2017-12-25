let markers = [
  {
    coords: {longitude: 21, latitude: 52.22825},
    title: 'MOP',
    description: 'Przykladowy mop',
    id:1,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    usage: 15
  },
  {
    coords: {longitude: 21, latitude: 52.22},
    title: 'MOP2',
    description: 'Przykladowy mop2',
    id:2,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    usage: 90
  },
  {
    coords: {longitude: 21, latitude: 52.214},
    title: 'MOP3',
    description: 'Przykladowy mop3',
    id:3,
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    usage: 45
  },
]

let simple_legend = {
  35: 'green',
  65: 'orange',
  100: 'red'
}

let get_color = (value, legend) => {
  for (let key in legend) {
    if (value < key)
      return legend[key];
  }
  return 'black';
}

let mops = [];

let download_mops = () => {
  markers.map((marker) => {
    mops.push({
      ...marker,
      color: get_color(marker.usage, simple_legend)
    })
  });
}

let refresh = () => {
  console.log('refresh');
  download_mops();
}


module.exports = {
  mops: mops,
  download_mops: download_mops,
  refresh: refresh
};
