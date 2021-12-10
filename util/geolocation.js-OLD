const axios = require('axios');

module.exports = {
  geolocate: address => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
      )
      .then(response => {
        if (response.data.status === 'OK') {
          console.log(response.data.results[0]);

          // City, state search
          if (
            response.data.results[0].geometry.location_type === 'APPROXIMATE'
          ) {
            return JSON.stringify({
              city: response.data.results[0].address_components[0].long_name,
              state: response.data.results[0].address_components[3].short_name,
              coordinates: response.data.results[0].geometry.location,
            });
          }

          // Full address search
          return JSON.stringify({
            city: response.data.results[0].address_components[2].long_name,
            state: response.data.results[0].address_components[4].short_name,
            coordinates: response.data.results[0].geometry.location,
          });
        }

        if (response.data.status === 'ZERO_RESULTS') {
          return JSON.stringify({ coordinates: {} });
        }

        // Return all other statuses
        if (response.data.error_message) {
          console.log(response.data.error_message);
          return new Error(response.data.error_message);
        } else {
          console.log(response.data);
          return new Error(response.data);
        }
      })
      .catch(error => {
        console.log(error);
        return new Error(error);
      });
  },
};
