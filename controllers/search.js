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
      .then(googlePlaceResults => {
        // console.log('/SEARCH RESULTS');
        // console.log(placesResults);
        const parsedPlaceResults = [];
        googlePlaceResults.results.forEach(place => {
          parsedPlaceResults.push({ place_id: place.place_id, name: place.name });
        });
        res.status(200).json({ places: parsedPlaceResults, next_page_token: googlePlaceResults.next_page_token });
      })
      .catch(error => {
        console.log('/SEARCH CALL TO GEOLOCATE UTIL .catch()');
        console.log(error);
      });
  }
  // next_page_token request
  //`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`
};
