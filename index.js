const express = require('express');
const axios = require('axios');

const Place = require('./models/place');

const app = express();

app.use(express.json());

// Get lat/lnd
// Submit lat/lng
// Nearby search based on lat/lnd
// Sort results & return

app.get('/api/v1/places-search', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY',
    headers: {},
  };

  axios(config)
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
