const axios = require('axios');

const Search = require('../models/search');

exports.getPlaces = (req, res, next) => {
  Search.execute()
    .then((results) => {
      console.log(results);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
