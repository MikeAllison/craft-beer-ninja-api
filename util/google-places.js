const axios = require('axios');

module.exports = {
  nearbyPlacesSearch: coordinates => {
    return new Promise((resolve, reject) => {
      const keyword = 'craft beer';
      const rankby = 'distance';

      axios
        .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => {
          if (response.data.status === 'OK') {
            // console.log('PLACES UTIL STATUS=OK');
            // console.log(response.data);
            resolve(response.data);
          } else if (response.data.status === 'ZERO_RESULTS') {
            console.log('PLACES UTIL STATUS=ZERO_RESULTS');
            resolve({ results: [], next_page_token: null });
          } else {
            // Return all other statuses
            if (response.data.error_message) {
              console.log('PLACES UTIL STATUS=ERROR_MESSAGE');
              console.log(response.data.error_message);
              reject(response.data.error_message);
            } else {
              console.log('PLACES UTIL STATUS=ERROR_CATCH_ALL');
              console.log(response.data);
              reject(response.data);
            }
          }
        })
        .catch(error => {
          console.log('PLACES UTIL STATUS=GOOGLE PLACE SEARCH .catch()');
          console.log(error);
          reject(error);
        });
    });
  }
};
