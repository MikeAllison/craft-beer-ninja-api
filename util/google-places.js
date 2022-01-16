const axios = require('axios');

module.exports = {
  nearbyPlacesSearch: coordinates => {
    return new Promise((resolve, reject) => {
      const keyword = 'craft beer';
      const rankby = 'distance';

      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`
        )
        .then(response => {
          if (response.data.status === 'OK') {
            resolve(response.data);
          } else if (response.data.status === 'ZERO_RESULTS') {
            resolve({ results: [], next_page_token: null });
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              reject(response.data.error_message);
            } else {
              reject(response.data);
            }
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  placeDetailsSearch: placeId => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.GOOGLE_API_KEY}`
        )
        .then(response => {
          if (response.data.status === 'OK') {
            resolve(response.data.result);
          } else if (response.data.status === 'ZERO_RESULTS') {
            resolve({});
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              reject(response.data.error_message);
            } else {
              reject(response.data);
            }
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  morePlacesSearch: nextPageToken => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`
        )
        .then(response => {
          if (response.data.status === 'OK') {
            resolve(response.data);
          } else if (response.data.status === 'ZERO_RESULTS') {
            resolve({ results: [], next_page_token: null });
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              reject(response.data.error_message);
            } else {
              reject(response.data);
            }
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
};
