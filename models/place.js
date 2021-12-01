module.exports = class Place {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static findAll() {
    return [
      { id: '1', name: 'Solid State' },
      { id: '2', name: 'Sweet Avenue' },
      { id: '3', name: 'Astoria Bier & Cheese' },
    ];
  }
};
