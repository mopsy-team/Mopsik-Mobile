MOPS = require('mopsik_mobile/src/config/mops');

deg2Rad = (deg) => {
  return deg * Math.PI / 180;
};

/* calculates distance between two points in kilometers */
pythagorasEquirectangular = (lat1, lon1, lat2, lon2) => {
  lat1 = deg2Rad(lat1);
  lat2 = deg2Rad(lat2);
  lon1 = deg2Rad(lon1);
  lon2 = deg2Rad(lon2);
  const R = 6371;
  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = (lat2 - lat1);
  const d = Math.sqrt(x * x + y * y) * R;
  return d;
};

export const calculateDistance = (latitude, longitude, mop) => {
  return pythagorasEquirectangular(latitude, longitude, mop.coords.latitude, mop.coords.longitude).toFixed(1);
}

/* return two mops closest to point */
export const findNearestMop = (latitude, longitude) => {
  let mindif1 = 99999;
  let closest1 = 0;
  let mindif2 = 99999;
  let closest2 = 0;

  if (MOPS.mops.length < 2) {
    return null
  }

  for (index = 0; index < MOPS.mops.length; ++index) {
    let mop = MOPS.mops[index];
    const dif = pythagorasEquirectangular(latitude, longitude, mop.coords.latitude, mop.coords.longitude);
    if (dif < mindif2) {
      if (dif < mindif1) {
        closest2 = closest1;
        mindif2 = mindif1;
        closest1 = index;
        mindif1 = dif;
      }
      else {
        closest2 = index;
        mindif2 = dif;
      }
    }
  }
  return [{
      nearest: MOPS.mops[closest1],
      distance: mindif1.toFixed(1)
    },
    {
      nearest: MOPS.mops[closest2],
      distance: mindif2.toFixed(1)
    }]
};
