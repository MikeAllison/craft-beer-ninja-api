module.exports = class Location {
  constructor(city, state, coords) {
    this.city = city;
    this.state = state;
    this.lat = coords.lat;
    this.long = coords.lng;
  }
};
