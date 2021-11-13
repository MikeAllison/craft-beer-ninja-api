const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/search', (req, res) => {
  const places = [];

  places.push(
    { id: '1', name: 'Solid State' },
    { id: '2', name: 'Sweet Avenue' },
    { id: '3', name: 'Astoria Bier & Cheese' }
  );

  res.status(200).json(places);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
