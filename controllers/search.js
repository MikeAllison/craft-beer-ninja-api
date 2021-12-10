const axios = require('axios');
const geolocationUtil = require('../util/geolocation');

exports.requestPlaces = (req, res, next) => {
  const keyword = 'craft_beer';
  const rankby = 'distance';

  // TO-DO: Need to return a promise from this utility method
  const geolocationData = geolocationUtil.geolocate(req.body.searchLocation);

  console.log(geolocationData);

  // next_page_token request
  //`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`

  // axios
  //   .get(
  //     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`
  //   )
  //   .then(response => {
  //     if (response.data.status === 'OK') {
  //       return res.status(200).json({
  //         results: response.data.results,
  //         next_page_token: response.data.next_page_token,
  //       });
  //     }

  //     if (response.data.status === 'ZERO_RESULTS') {
  //       return res.status(200).json({ results: [], next_page_token: null });
  //     }

  //     // Return all other statuses
  //     if (response.data.error_message) {
  //       console.log(response.data.error_message);
  //       return res.status(500).json(response.data.error_message);
  //     } else {
  //       console.log(response.data);
  //       return res.status(500).json(response.data);
  //     }
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500);
  //   });
};
