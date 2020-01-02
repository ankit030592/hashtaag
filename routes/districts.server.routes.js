const express = require('express');
const router = express.Router();
const District = require('../controllers/districts.server.controllers');

/*Get Districts*/
router.get('/', District.searchByDistrictName);


module.exports = router;
