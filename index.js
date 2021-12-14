const express = require('express');
const cors = require('cors');

const searchRoutes = require('./routes/search');

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080' }));

app.use('/api/v1', searchRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
