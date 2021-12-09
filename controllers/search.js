const axios = require('axios');

exports.requestCoordinates = (req, res, next) => {
  const address = req.body.address;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status === 'OK') {
        console.log(response.data.results[0]);

        // City, state search
        if (response.data.results[0].geometry.location_type === 'APPROXIMATE') {
          return res.status(200).json({
            city: response.data.results[0].address_components[0].long_name,
            state: response.data.results[0].address_components[3].short_name,
            coordinates: response.data.results[0].geometry.location,
          });
        }

        // Full address search
        return res.status(200).json({
          city: response.data.results[0].address_components[2].long_name,
          state: response.data.results[0].address_components[4].short_name,
          coordinates: response.data.results[0].geometry.location,
        });
      }

      if (response.data.status === 'ZERO_RESULTS') {
        return res.status(200).json({ message: 'ZERO RESULTS' });
      }

      // Return all other statuses
      if (response.data.error_message) {
        console.log(response.data.error_message);
        return res.status(500).json(response.data.error_message);
      } else {
        console.log(response.data);
        return res.status(500).json(response.data);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });
};

exports.requestPlaces = (req, res, next) => {
  const coords = `${req.body.lat}, ${req.body.lng}`;
  const keyword = 'craft_beer';
  const rankby = 'distance';

  // next_page_token request
  //`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`
    )
    .then(response => {
      if (response.data.status === 'OK') {
        return res.status(200).json({
          results: response.data.results,
          next_page_token: response.data.next_page_token,
        });
      }

      if (response.data.status === 'ZERO_RESULTS') {
        return res.status(200).json({ results: [], next_page_token: null });
      }

      // Return all other statuses
      if (response.data.error_message) {
        console.log(response.data.error_message);
        return res.status(500).json(response.data.error_message);
      } else {
        console.log(response.data);
        return res.status(500).json(response.data);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });
};
