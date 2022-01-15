const axios = require('axios');

module.exports = {
  geolocate: address => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
        )
        .then(response => {
          if (response.data.status === 'OK') {
            resolve({
              formattedAddress: response.data.results[0].formatted_address,
              coordinates: response.data.results[0].geometry.location
            });
          } else if (response.data.status === 'ZERO_RESULTS') {
            reject(response.data.status);
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              reject(response.data.error_message);
            } else {
              reject(response.data.error_message);
            }
          }
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  reverseGeocode: coordinates => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${process.env.GOOGLE_API_KEY}`
        )
        .then(response => {
          if (response.data.status === 'OK') {
            resolve({
              formattedAddress: response.data.results[0].formatted_address
            });
          } else if (response.data.status === 'ZERO_RESULTS') {
            reject(response.data.status);
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              reject(response.data.error_message);
            } else {
              reject(response.data.error_message);
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
