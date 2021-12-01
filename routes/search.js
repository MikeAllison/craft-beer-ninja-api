const express = require('express');

const searchContorller = require('../controllers/search');

const router = express.Router();

router.get('/api/v1/places', searchContorller.getPlaces);

module.exports = router;
