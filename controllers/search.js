const axios = require('axios');

exports.requestPlaces = (req, res, next) => {
  const coords = `${req.body.lat}, ${req.body.lng}`;
  const keyword = 'craft_beer';
  const rankby = 'distance';

  // next_page_token request
  //`https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${process.env.GOOGLE_API_KEY}`

  axios
    .get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => {
      if (response.data.status === 'ZERO_RESULTS') {
        res.status(200).json({ results: [], next_page_token: null });
      } else if (response.data.status === 'OK') {
        res.status(200).json({
          results: response.data.results,
          next_page_token: response.data.next_page_token
        });
      } else {
        if (response.data.error_message) {
          res.status(500).json(response.data.error_message);
        } else {
          res.status(500).json(response.data);
        }
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });
};
