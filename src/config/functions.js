import {
  AsyncStorage
} from 'react-native';

MOPS = require('../config/mops');
var _ = require('lodash');


uploadFavourites = async (favourites) => {
    await AsyncStorage.setItem('favouriteMOPs',
      JSON.stringify(favourites));
}

deleteFavourite = (id) => {
  console.log('delete', id);
  favs = MOPS.favouriteMOPs
  idx = favs.indexOf(id)
  favs.splice(idx, 1)
  console.log(favs)
  uploadFavourites(favs);
  var favourites_mapped = [];
  favs.map((fav, i) => {
     favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
   });
 MOPS.favouriteMOPs = favs;
 MOPS.favouriteMOPsmapped = favourites_mapped;
}



module.exports = {
  deleteFavourite: deleteFavourite,
  uploadFavourites: uploadFavourites,
};
