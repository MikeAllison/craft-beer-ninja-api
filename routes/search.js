const express = require('express');

const searchController = require('../controllers/search');

const router = express.Router();

router.post('/form-search', searchController.formSearch);
router.post('/geo-search', searchController.geoSearch);

module.exports = router;
