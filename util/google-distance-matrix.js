const axios = require('axios');

module.exports = {
  placeDistancesSearch: (origin, destinations) => {
    let placeIds = '';

    destinations.forEach(place => {
      placeIds += `place_id:${place.place_id}|`;
    });

    placeIds = placeIds.slice(0, -1);

    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.lat},${origin.lng}&destinations=${placeIds}&units=imperial&key=${process.env.GOOGLE_API_KEY}`
        )
        .then(response => {
          if (response.data.status === 'OK') {
            resolve(response.data.rows[0].elements);
          } else {
            reject(response.data.status);
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
};
