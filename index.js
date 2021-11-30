const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.get('/api/v1/places', (req, res) => {
  const coords = `40.7404654,-73.9174162`;
  const keyword = 'craft_beer';
  const radius = 50000;
  const rankby = 'distance';

  var params = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coords}&keyword=${keyword}&rankby=${rankby}&key=${process.env.GOOGLE_API_KEY}`
  };

  axios(params)
    .then(response => {
      // TO-DO: Refactor
      if ((response.status = 'ZERO_RESULTS')) {
        throw new Error('The search returned 0 results');
      } else if ((response.results = 'OK')) {
        const results = response.data;
        res.status(200).json(results);
      } else {
        throw new Error(results.error_message);
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500);
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
