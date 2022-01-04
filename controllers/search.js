const axios = require('axios');
const { randomUUID } = require('crypto');
const geolocationUtil = require('../util/geolocation');
const googlePlacesUtil = require('../util/google-places');

exports.formSearch = (req, res, next) => {
  geolocationUtil
    .geolocate(req.body.searchLocation)
    .then(geoResults => {
      return googlePlacesUtil.nearbyPlacesSearch(geoResults.coordinates);
    })
    .then(googlePlaceResults => {
      const operationalPlaces = [];
      googlePlaceResults.results.forEach(place => {
        if (place.business_status === 'OPERATIONAL') {
          operationalPlaces.push({
            place_id: place.place_id,
            name: place.name
          });
        }
      });
      res.status(200).json({
        google_session_token: randomUUID(),
        places: operationalPlaces,
        next_page_token: googlePlaceResults.next_page_token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });

  // next_page_token request
  //`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`
};

exports.geoSearch = (req, res, next) => {
  googlePlacesUtil
    .nearbyPlacesSearch(req.body.coordinates)
    .then(googlePlaceResults => {
      const operationalPlaces = [];
      googlePlaceResults.results.forEach(place => {
        if (place.business_status === 'OPERATIONAL') {
          operationalPlaces.push({
            place_id: place.place_id,
            name: place.name
          });
        }
      });
      res.status(200).json({
        google_session_token: randomUUID(),
        places: operationalPlaces,
        next_page_token: googlePlaceResults.next_page_token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });
};

exports.placeDetailsSearch = (req, res, next) => {
  googlePlacesUtil
    .placeDetailsSearch(req.body.placeId)
    .then(placeDetails => {
      res.status(200).json({
        place_details: placeDetails
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });
};
