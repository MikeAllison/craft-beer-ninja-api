const axios = require('axios');
const geolocationUtil = require('../util/geolocation');
const googlePlacesUtil = require('../util/google-places');

exports.formSearch = (req, res, next) => {
  let formattedAddress;

  geolocationUtil
    .geolocate(req.body.searchLocation)
    .then(geoResults => {
      formattedAddress = geoResults.formattedAddress;
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
        formattedAddress: formattedAddress,
        places: operationalPlaces,
        nextPageToken: googlePlaceResults.next_page_token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
};

exports.geoSearch = (req, res, next) => {
  let formattedAddress;

  geolocationUtil
    .reverseGeocode(req.body.coordinates)
    .then(reverseGeoResults => {
      formattedAddress = reverseGeoResults.formattedAddress;
      return googlePlacesUtil.nearbyPlacesSearch(req.body.coordinates);
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
        formattedAddress: formattedAddress,
        places: operationalPlaces,
        nextPageToken: googlePlaceResults.next_page_token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
};

exports.morePlacesSearch = (req, res, next) => {
  googlePlacesUtil
    .morePlacesSearch(req.body.nextPageToken)
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
        places: operationalPlaces,
        nextPageToken: googlePlaceResults.next_page_token
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
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
      res.status(500).send(error);
    });
};
