const express = require('express');
const router = express.Router();
const Town = require('../controllers/towns.server.controllers');

/*Get Towns*/
router.get('/', Town.searchByTownName);


module.exports = router;
