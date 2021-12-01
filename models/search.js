const axios = require('axios');

module.exports = class Search {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  static execute() {
    console.log('Executing search');
  }
};
