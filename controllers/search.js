const axios = require('axios');
const geolocationUtil = require('../util/geolocation');
const googlePlacesUtil = require('../util/google-places');
const googleDistanceMatrixUtil = require('../util/google-distance-matrix');

module.exports = {
  formSearch: (req, res, next) => {
    let searchLocation = {
      coordinates: null,
      formattedAddress: null
    };
    geolocationUtil
      .geolocate(req.body.searchLocation)
      .then(geoResults => {
        searchLocation = {
          coordinates: geoResults.coordinates,
          formattedAddress: geoResults.formattedAddress
        };
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
          searchLocation: searchLocation,
          places: operationalPlaces,
          nextPageToken: googlePlaceResults.next_page_token
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  geoSearch: (req, res, next) => {
    let searchLocation = {
      coordinates: null,
      formattedAddress: null
    };
    geolocationUtil
      .reverseGeocode(req.body.coordinates)
      .then(reverseGeoResults => {
        searchLocation = {
          coordinates: reverseGeoResults.coordinates,
          formattedAddress: reverseGeoResults.formattedAddress
        };
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
          searchLocation: searchLocation,
          places: operationalPlaces,
          nextPageToken: googlePlaceResults.next_page_token
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },

  morePlacesSearch: (req, res, next) => {
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
  },

  placeDetailsSearch: (req, res, next) => {
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
  },

  placeDistancesSearch: (req, res, next) => {
    const placeDistances = [];
    req.body.destinations.forEach(place => {
      placeDistances.push({
        placeId: place.place_id,
        distance: null
      });
    });
    googleDistanceMatrixUtil
      .placeDistancesSearch(req.body.origin, req.body.destinations)
      .then(destinations => {
        destinations.forEach((destination, index) => {
          placeDistances[index].distance = destination.distance.text;
        });
        res.status(200).json({
          place_distances: placeDistances
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  }
};
