const express = require('express');

const Place = require('./models/place');

const app = express();

app.use(express.json());

app.get('/api/v1/search', (req, res) => {
  const places = Place.all();

  res.status(200).json(places);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
