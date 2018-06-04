import {AsyncStorage} from 'react-native';

let _ = require('lodash');

/* uploades array of favourites to AsyncStorage */
uploadFavourites = async (favourites) => {
  await AsyncStorage.setItem('mopsik_favouriteMOPs',
    JSON.stringify(favourites));
};

/* deletes mop with id=id from favourites (in AsyncStorage and global variables) */
deleteFavourite = (id) => {
  favs = MOPS.favouriteMOPs;
  if (favs.includes(id)){
    idx = favs.indexOf(id);
    favs.splice(idx, 1);
    uploadFavourites(favs);
    let favourites_mapped = [];
    favs.map((fav, i) => {
       favourites_mapped.push(_.find(MOPS.mops, { id: fav }));
     });
     MOPS.favouriteMOPs = favs;
     MOPS.favouriteMOPsMapped = favourites_mapped;
   }
};

/*
 * get favourites from AsyncStorage, update variables
 * favouriteMOPs is a list of ids
 * favouriteMOPsMapped is list of whole MOP objects (dicts with all parameters)
 */
downloadFavourites = () => {
  AsyncStorage.getItem('mopsik_favouriteMOPs').then((response) => {
    if (response) {
      favourites = JSON.parse(response);
    }
    else {
      favourites = [];
    }
    let favs = [];
    let favourites_mapped = [];
    favourites.map((fav, i) => {
      let x = _.find(MOPS.mops, {id: fav});
      if (x !== undefined) {
        favourites_mapped.push(x);
        favs.push(fav);
      }
    });
    MOPS.favouriteMOPsMapped = favourites_mapped;
    MOPS.favouriteMOPs = favs;
    uploadFavourites(favs);
  }).done();
};

module.exports = {
  deleteFavourite: deleteFavourite,
  uploadFavourites: uploadFavourites,
  downloadFavourites: downloadFavourites,
};
