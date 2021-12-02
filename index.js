const express = require('express');

const searchRoutes = require('./routes/search');

const app = express();

app.use(express.json());

app.use('/api/v1', searchRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
