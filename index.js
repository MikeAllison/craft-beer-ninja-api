const express = require('express');
const cors = require('cors');

const searchRoutes = require('./routes/search');

const app = express();

// HTTPS redirect
if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url);
  });
}

app.use(express.json());
app.use(cors({ origin: `${process.env.CORS_ORIGIN}` }));

app.use('/api/v1', searchRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
