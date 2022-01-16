const express = require('express');
const cors = require('cors');

const searchRoutes = require('./routes/search');

const app = express();

app.use(express.json());
// Must set something as the CORS_ORIGIN below for App Engine to work with Express
app.use(cors({ origin: `${process.env.CORS_ORIGIN}` }));

app.use('/api/v1', searchRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
