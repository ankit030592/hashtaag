const express = require('express');
const router = express.Router();
const State = require('../controllers/states.server.controllers');

/*Get States*/
router.get('/', State.searchByStateName);


module.exports = router;
