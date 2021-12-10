const axios = require('axios');
const geolocationUtil = require('../util/geolocation');
const googlePlacesUtil = require('../util/google-places');

exports.requestPlaces = (req, res, next) => {
  if (req.body.coordinates) {
    // coordinates = req.body.coordinates.lat,req.body.coordinates.lng
  } else {
    geolocationUtil
      .geolocate(req.body.searchLocation)
      .then(geoResults => {
        return googlePlacesUtil.nearbyPlacesSearch(geoResults.coordinates);
      })
      .then(placesResults => {
        // console.log('/SEARCH RESULTS');
        // console.log(placesResults);
        res.status(200).json(placesResults);
      })
      .catch(error => {
        console.log('/SEARCH CALL TO GEOLOCATE UTIL .catch()');
        console.log(error);
      });
  }

  // then

  // next_page_token request
  //`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`
};
